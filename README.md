# 🚀 AI Website Builder SaaS Platform

Welcome to your fully production-grade multi-model AI SaaS system built for:
- LLaMA 4 Scout
- LLaMA 3 70B
- LLaMA 3.1 8B (Free plan only)

This system includes:
- ✅ Dynamic pricing
- ✅ Free, Paid, Custom, Team, Enterprise Plans
- ✅ Token metering & enforcement
- ✅ Stripe & Razorpay payment integration
- ✅ Admin dashboard
- ✅ Groq API model routing
- ✅ Firebase Auth (user login/signup)
- ✅ Webhooks for secure payments

---

# ⚙️ MONOREPO STRUCTURE

/bolt-new-ai-saas-full-build
/backend --> Express server, token logic, payment APIs
/frontend --> User SaaS frontend (React)
/admin --> Admin dashboard (React)

yaml
Copy
Edit

---

# 🔐 ENVIRONMENT SETUP

## Backend `.env`

Located: `/backend/.env`

PORT=5000
MONGODB_URI=YOUR_MONGODB_URI

Groq AI
GROQ_API_URL=https://api.groq.com
GROQ_API_KEY=YOUR_GROQ_API_KEY

Stripe
STRIPE_SECRET_KEY=YOUR_STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET=YOUR_STRIPE_WEBHOOK_SECRET

Razorpay
RAZORPAY_KEY_ID=YOUR_RAZORPAY_KEY_ID
RAZORPAY_KEY_SECRET=YOUR_RAZORPAY_KEY_SECRET
RAZORPAY_WEBHOOK_SECRET=YOUR_RAZORPAY_WEBHOOK_SECRET

Frontend URL
FRONTEND_URL=http://localhost:3000

Admin Credentials
ADMIN_PASSWORD=Aldin@Orazael

yaml
Copy
Edit

---

## Frontend `.env` (`/frontend/.env` and `/admin/.env`)

REACT_APP_FIREBASE_API_KEY=YOUR_FIREBASE_API_KEY
REACT_APP_FIREBASE_AUTH_DOMAIN=YOUR_FIREBASE_AUTH_DOMAIN
REACT_APP_FIREBASE_PROJECT_ID=YOUR_FIREBASE_PROJECT_ID
REACT_APP_FIREBASE_STORAGE_BUCKET=YOUR_FIREBASE_STORAGE_BUCKET
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=YOUR_FIREBASE_MESSAGING_SENDER_ID
REACT_APP_FIREBASE_APP_ID=YOUR_FIREBASE_APP_ID

yaml
Copy
Edit

---

# 🧪 LOCAL DEVELOPMENT SETUP

## 1️⃣ Install Backend:

```bash
cd backend
npm install
npm run dev
Backend runs at http://localhost:5000

2️⃣ Install Frontend:
bash
Copy
Edit
cd frontend
npm install
npm start
Frontend runs at http://localhost:3000

3️⃣ Install Admin Dashboard:
bash
Copy
Edit
cd admin
npm install
npm start
Admin runs at http://localhost:3001 (or next available port)

🔧 DATABASE
MongoDB Atlas is recommended.

Create database + collection to store:

User subscriptions

Token usage logs

Admin settings (optional future upgrade)

🔐 SECURITY NOTES
Stripe/Razorpay webhook secrets mandatory for production.

Always run backend on HTTPS in production.

Secure admin routes.

☁️ CLOUD DEPLOYMENT OPTIONS
Vercel (Frontend & Admin)

Render / Railway (Backend server)

MongoDB Atlas (Database)

Firebase (Auth system + future storage expansion)

🔮 SCALABILITY OPTIONS (Future Growth)
Add full SaaS user dashboard with token usage graphs.

Add team billing & team seats.

Add email notifications via SendGrid/Mailgun.

Add invite-only beta control.

Add Stripe/Razorpay subscription plans.

Add Admin analytics dashboard.

Full token-based billing automation.

🔧 PRODUCTION README COMPLETED ✅
yaml
Copy
Edit

---
