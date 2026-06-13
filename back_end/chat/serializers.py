from rest_framework import serializers
from .models import ChatRoom, Message

class MessageSerializer(serializers.ModelSerializer):
    # Formats the time similarly to your front-end layout (e.g., "09:41 AM")
    time = serializers.SerializerMethodField()

    class Meta:
        model = Message
        fields = ['id', 'room', 'sender_type', 'text', 'attachment', 'time', 'is_read']

    def get_time(self, obj):
        return obj.timestamp.strftime("%I:%M %p")


class ChatRoomSerializer(serializers.ModelSerializer):
    messages = MessageSerializer(many=True, read_only=True)
    user_username = serializers.ReadOnlyField(source='user.username')
    agent_username = serializers.ReadOnlyField(source='agent.username')

    class Meta:
        model = ChatRoom
        fields = ['id', 'user', 'user_username', 'agent', 'agent_username', 'messages', 'is_active', 'created_at']
