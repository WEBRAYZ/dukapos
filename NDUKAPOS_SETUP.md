# NDUKAPOS: Technical Setup & Architecture Guide

Welcome to **NDUKAPOS**, a high-performance, multi-tenant SaaS POS system localized for the Kenyan market with KRA eTIMS compliance.

## 1. System Architecture
- **Frontend:** Next.js 16 (App Router), Tailwind CSS 4, Lucide Icons, Recharts.
- **Backend:** Django 6.0, Django REST Framework, `django-tenants` (PostgreSQL schemas).
- **Database:** PostgreSQL (Schema-based multi-tenancy).
- **Real-time/Tasks:** Celery, Redis, Django Channels (WebSockets).
- **Compliance:** Built-in KRA eTIMS API Integration.

---

## 2. Backend Setup (Django)

### Prerequisites
- Python 3.10+
- PostgreSQL
- Redis Server (for Celery/Channels)

### Installation Steps
1. **Navigate to the backend directory:**
   ```bash
   cd back_end
   ```
2. **Create and activate a virtual environment:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # Linux/Mac
   # or venv\Scripts\activate # Windows
   ```
3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```
4. **Configure Environment Variables:**
   Create a `.env` file in `back_end/` using the provided template:
   ```env
   DJANGO_DEBUG=True
   DB_NAME=dukapos_db
   DB_USER=your_user
   DB_PASSWORD=your_password
   DB_HOST=localhost
   REDIS_URL=redis://localhost:6379/0
   ETIMS_BASE_URL=https://etims-api-test.kra.go.ke/v1
   ```
5. **Initialize Multi-Tenancy:**
   ```bash
   python manage.py migrate
   python manage.py setup_tenants  # Creates public and test schemas
   python manage.py createsuperuser # Create the SuperAdmin user
   ```
6. **Start Background Services:**
   ```bash
   # Terminal 1: Celery Worker
   celery -A config worker -l info
   # Terminal 2: Celery Beat (Automation)
   celery -A config beat -l info
   ```
7. **Start the API Server:**
   ```bash
   python manage.py runserver
   ```

---

## 3. Frontend Setup (Next.js)

### Prerequisites
- Node.js 20+
- NPM/Yarn/PNPM

### Installation Steps
1. **Navigate to the frontend directory:**
   ```bash
   cd front_end
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start the Development Server:**
   ```bash
   npm run dev
   ```
4. **Access the App:**
   - SuperAdmin: `localhost:3000/superadmin`
   - Tenant Shop: `test.localhost:3000` (Ensure `test.localhost` resolves to 127.0.0.1 in your `/etc/hosts`)

---

## 4. Key Platform Features

### SuperAdmin Workflow
- **Dashboard:** Real-time health monitoring of the entire platform.
- **Provisioning:** Create new shop schemas instantly from the "Tenants" tab.
- **Subscriptions:** Manage pricing tiers (Starter, Pro, Enterprise) and track M-Pesa payments.
- **Global Reports:** Aggregated sales data across all Kenyan branches.

### Shop Owner Workflow (POS)
- **Inventory:** Multi-branch stock tracking with low-stock alerts.
- **POS Interface:** Fast checkout with Barcode/USB scanner support and M-Pesa STK push.
- **eTIMS:** Automatically transmit every sale to KRA. (Configure PIN and Device ID in `Settings > Tax`).

---

## 5. Deployment Recommendation
- **Backend:** Heroku, Railway, or AWS (EC2/RDS). Must support PostgreSQL schemas.
- **Frontend:** Vercel or Netlify.
- **Worker:** Separate container/process for Celery Worker and Beat.

---

**Project status: PRODUCTION READY**
