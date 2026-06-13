from .models import Notification

def notify_user(user, title, message, notification_type="INFO", category="SYSTEM"):
    """
    Utility function to send a notification to a specific user.
    """
    return Notification.objects.create(
        user=user,
        title=title,
        message=message,
        notification_type=notification_type,
        category=category
    )

def notify_all(title, message, notification_type="INFO", category="SYSTEM"):
    """
    Utility function to send a global/system-wide notification.
    """
    return Notification.objects.create(
        user=None,
        title=title,
        message=message,
        notification_type=notification_type,
        category=category
    )

def notify_admin(title, message, notification_type="WARNING", category="SYSTEM"):
    """
    Utility function to send a notification to all admin users.
    """
    from django.contrib.auth import get_user_model
    User = get_user_model()
    admins = User.objects.filter(is_superuser=True)
    notifications = []
    for admin in admins:
        notifications.append(
            Notification(
                user=admin,
                title=title,
                message=message,
                notification_type=notification_type,
                category=category
            )
        )
    return Notification.objects.bulk_create(notifications)
