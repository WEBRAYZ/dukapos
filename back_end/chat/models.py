from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class ChatRoom(models.Model):
    """
    Represents a conversation between a user and an agent, 
    or a support ticket thread.
    """
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="chat_rooms")
    agent = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name="assigned_chats")
    created_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"Chat Room {self.id} - User: {self.user.username}"


class Message(models.Model):
    """
    Represents a single message inside a ChatRoom.
    """
    SENDER_CHOICES = (
        ('user', 'User'),
        ('agent', 'Agent'),
    )

    room = models.ForeignKey(ChatRoom, on_delete=models.CASCADE, related_name="messages")
    sender_type = models.CharField(max_length=10, choices=SENDER_CHOICES)
    sender = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    text = models.TextField()
    attachment = models.FileField(upload_to="chat_attachments/", null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    class Meta:
        ordering = ['timestamp']

    def __str__(self):
        return f"{self.sender_type.capitalize()} at {self.timestamp.strftime('%Y-%m-%d %H:%M')}"
