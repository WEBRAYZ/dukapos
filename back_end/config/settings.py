import os
import dj_database_url
from datetime import timedelta
from pathlib import Path
# pyrefly: ignore [missing-import]
from dotenv import load_dotenv

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Load the .env file
load_dotenv(BASE_DIR / '.env')

# --- ENVIRONMENT VARIABLES & SECURITY ---
SECRET_KEY = os.getenv('DJANGO_SECRET_KEY', os.getenv('SECRET_KEY', 'django-insecure-fallback-key-for-local-dev-only'))
DEBUG = os.getenv('DJANGO_DEBUG', os.getenv('DEBUG', 'False')) == 'True'

# Crucial for multi-tenancy subdomains to resolve
ALLOWED_HOSTS = ['localhost', '127.0.0.1', '.localhost', '.railway.app']

# Add your production Vercel frontend URL here once generated
PRODUCTION_FRONTEND_URL = os.getenv('FRONTEND_URL')
if PRODUCTION_FRONTEND_URL:
    ALLOWED_HOSTS.append(PRODUCTION_FRONTEND_URL.replace('https://', '').replace('http://', ''))

# --- MULTI-TENANT APPLICATION REGISTRY ---
SHARED_APPS = [
    'daphne',
    'django_tenants',  # Mandatory top package for multi-tenancy tracking
    'tenants',
    'core',
    'notifications',
    'authentication',
    'channels',
    'monitoring',
    'subscriptions',
    'branches',
    'security',
    'superadmin_settings',
    'superadmin_dashboard',
    'global_reports',
    'users',

    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # Third-party globally shared applications
    'corsheaders',
    'rest_framework',
    'drf_spectacular',
    'django_filters',
]

TENANT_APPS = [
    'django.contrib.auth',
    'django.contrib.contenttypes',
    
    # Your local project applications
    'authentication',
    'products',
    'inventory',
    'pos',
    'purchases',
    'customers',
    'suppliers',
    'finance',
    'reports',
    'users',
    'notifications',
    'returns',
    'backups',
    'auditlogs',
    'shifts',
    'synchronization',
    'devices',
    'tax',
    'chat',
]

# Maintain order for apps like daphne
INSTALLED_APPS = []
for app in SHARED_APPS:
    if app not in INSTALLED_APPS:
        INSTALLED_APPS.append(app)
for app in TENANT_APPS:
    if app not in INSTALLED_APPS:
        INSTALLED_APPS.append(app)

ASGI_APPLICATION = 'config.asgi.application'

CHANNEL_LAYERS = {
    'default': {
        'BACKEND': 'channels_redis.core.RedisChannelLayer',
        'CONFIG': {
            "hosts": [(os.getenv('REDIS_HOST', '127.0.0.1'), 6379)],
        },
    },
}

# Custom User Model
AUTH_USER_MODEL = 'authentication.User'

AUTHENTICATION_BACKENDS = [
    'authentication.backends.EmailOrPhoneBackend',
    'django.contrib.auth.backends.ModelBackend',
]

# Tenant System Model Configuration
TENANT_MODEL = 'tenants.Tenant'
TENANT_DOMAIN_MODEL = 'tenants.Domain'

# --- MIDDLEWARE (Order is heavily dependent on execution priority) ---
MIDDLEWARE = [
    'django_tenants.middleware.main.TenantMainMiddleware',  # 1. Must be absolute first
    'corsheaders.middleware.CorsMiddleware',               # 2. Must be before CommonMiddleware
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',           # 3. Must be right after SecurityMiddleware
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'config.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'config.wsgi.application'

# --- DATABASE (PostgreSQL Engine for Multi-Tenancy) ---
DB_USER = os.getenv('DB_USER', 'dukapos_user')
DB_PASSWORD = os.getenv('DB_PASSWORD', 'Isa@ac366#')
DB_HOST = os.getenv('DB_HOST', 'localhost')
DB_PORT = os.getenv('DB_PORT', '5432')
DB_NAME = os.getenv('DB_NAME', 'dukapos_db')

DATABASES = {
    'default': dj_database_url.config(
        engine='django_tenants.postgresql_backend',
        conn_max_age=600
    )
}

if not DATABASES['default'].get('NAME'):
    DATABASES['default'] = {
        'ENGINE': 'django_tenants.postgresql_backend',
        'NAME': DB_NAME,
        'USER': DB_USER,
        'PASSWORD': DB_PASSWORD,
        'HOST': DB_HOST,
        'PORT': DB_PORT,
        'CONN_MAX_AGE': 600,
    }

DATABASE_ROUTERS = (
    'django_tenants.routers.TenantSyncRouter',
)

# --- SECURITY PASSWORD VALIDATION ---
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

# --- INTERNATIONALIZATION ---
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

LANGUAGES = [
    ('en', 'English'),
    ('sw', 'Kiswahili'),
    ('fr', 'French'),
    ('es', 'Spanish'),
    ('de', 'German'),
    ('ar', 'Arabic'),
    ('zh', 'Chinese'),
    ('hi', 'Hindi'),
    ('bn', 'Bengali'),
    ('pt', 'Portuguese'),
    ('ru', 'Russian'),
    ('ja', 'Japanese'),
    ('pa', 'Punjabi'),
    ('mr', 'Marathi'),
    ('te', 'Telugu'),
    ('tr', 'Turkish'),
    ('ta', 'Tamil'),
    ('vi', 'Vietnamese'),
    ('ko', 'Korean'),
    ('it', 'Italian'),
    ('gu', 'Gujarati'),
    ('fa', 'Persian'),
    ('bho', 'Bhojpuri'),
    ('nan', 'Min Nan Chinese'),
    ('jv', 'Javanese'),
    ('wuu', 'Wu Chinese'),
    ('kn', 'Kannada'),
    ('ps', 'Pashto'),
    ('yo', 'Yoruba'),
    ('mai', 'Maithili'),
    ('uz', 'Uzbek'),
    ('am', 'Amharic'),
    ('om', 'Oromo'),
    ('ro', 'Romanian'),
    ('el', 'Greek'),
    ('nl', 'Dutch'),
    ('th', 'Thai'),
    ('pl', 'Polish'),
    ('uk', 'Ukrainian'),
    ('ig', 'Igbo'),
    ('ha', 'Hausa'),
    ('so', 'Somali'),
    ('tl', 'Tagalog'),
    ('id', 'Indonesian'),
    ('ms', 'Malay'),
    ('he', 'Hebrew'),
    ('cs', 'Czech'),
    ('hu', 'Hungarian'),
    ('sv', 'Swedish'),
    ('no', 'Norwegian'),
    ('da', 'Danish'),
    ('fi', 'Finnish'),
    ('sk', 'Slovak'),
]

# --- CORS & REST FRAMEWORK API CONFIGURATIONS ---
CORS_ALLOW_ALL_ORIGINS = DEBUG

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]
if PRODUCTION_FRONTEND_URL:
    CORS_ALLOWED_ORIGINS.append(PRODUCTION_FRONTEND_URL)

CORS_ALLOWED_ORIGIN_REGEXES = [
    r"^http://.+\.localhost:3000$",
    r"^http://.+\.127\.0\.0\.1:3000$",
]

CSRF_TRUSTED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://*.localhost:3000",
]
if PRODUCTION_FRONTEND_URL:
    CSRF_TRUSTED_ORIGINS.append(PRODUCTION_FRONTEND_URL)

CORS_ALLOW_CREDENTIALS = True

# --- PRODUCTION SECURITY HARDENING ---
if not DEBUG:
    SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
    SECURE_SSL_REDIRECT = True
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True
    SECURE_HSTS_SECONDS = 31536000 # 1 year
    SECURE_HSTS_INCLUDE_SUBDOMAINS = True
    SECURE_HSTS_PRELOAD = True

# M-Pesa Configuration
MPESA_CONSUMER_KEY = os.getenv('MPESA_CONSUMER_KEY', '')
MPESA_CONSUMER_SECRET = os.getenv('MPESA_CONSUMER_SECRET', '')
MPESA_SHORTCODE = os.getenv('MPESA_SHORTCODE', '174379')
MPESA_PASSKEY = os.getenv('MPESA_PASSKEY', 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919')
MPESA_ENV = os.getenv('MPESA_ENV', 'sandbox')
MPESA_CALLBACK_URL = os.getenv('MPESA_CALLBACK_URL', 'https://your-domain.com/api/finance/mpesa/callback/')

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
    'DEFAULT_SCHEMA_CLASS': 'drf_spectacular.openapi.AutoSchema',
    'DEFAULT_FILTER_BACKENDS': ['django_filters.rest_framework.DjangoFilterBackend'],
}

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=60),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
    'AUTH_HEADER_TYPES': ('Bearer',),
}

# --- CELERY CONFIGURATION ---
CELERY_BROKER_URL = os.getenv('REDIS_URL', 'redis://localhost:6379/0')
CELERY_RESULT_BACKEND = 'django-db'
CELERY_CACHE_BACKEND = 'django-cache'
CELERY_ACCEPT_CONTENT = ['json']
CELERY_TASK_SERIALIZER = 'json'
CELERY_RESULT_SERIALIZER = 'json'
CELERY_TIMEZONE = TIME_ZONE

# Static & Media Storage
STATIC_URL = '/static/'
MEDIA_URL = '/media/'
STATIC_ROOT = BASE_DIR / 'staticfiles'
MEDIA_ROOT = BASE_DIR / 'media'

STORAGES = {
    "default": {
        "BACKEND": "django.core.files.storage.FileSystemStorage",
    },
    "staticfiles": {
        "BACKEND": "whitenoise.storage.CompressedManifestStaticFilesStorage",
    },
}
