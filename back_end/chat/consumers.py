import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from .models import Message, ChatRoom

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_id = self.scope['url_route']['kwargs']['room_id']
        self.room_group_name = f'chat_{self.room_id}'

        # Join the room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        """Receives a message from the React client"""
        data = json.loads(text_data)
        text = data.get('text')
        sender_type = data.get('sender_type')  # 'user' or 'agent'
        user_id = data.get('user_id')

        # Save message asynchronous to DB
        saved_msg = await self.save_message(self.room_id, sender_type, user_id, text)

        # Broadcast message payload to everyone in the room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'id': saved_msg['id'],
                'text': saved_msg['text'],
                'sender_type': saved_msg['sender_type'],
                'time': saved_msg['time']
            }
        )

    async def chat_message(self, event):
        """Sends data payload down to the browser WebSocket client"""
        await self.send(text_data=json.dumps({
            'id': event['id'],
            'text': event['text'],
            'type': event['sender_type'],  # Maps back to frontend state format
            'time': event['time']
        }))

    @database_sync_to_async
    def save_message(self, room_id, sender_type, user_id, text):
        room = ChatRoom.objects.get(id=room_id)
        msg = Message.objects.create(room=room, sender_type=sender_type, sender_id=user_id, text=text)
        return {
            'id': msg.id,
            'text': msg.text,
            'sender_type': msg.sender_type,
            'time': msg.timestamp.strftime("%I:%M %p")
        }
