
#  Happndr — Discover and Share College Tech Events

**Happndr** is a web app that helps students discover upcoming hackathons, workshops, and tech talks from colleges across the country. Events are collected via user submissions and automatically scraped from college websites.

---

## 🧩 Tech Stack

| Layer     | Tech Used                      |
|-----------|--------------------------------|
| Frontend  | React + TailwindCSS + Clerk    |
| Backend   | Express + PostgreSQL + Prisma  |
| Auth      | Clerk (OAuth + email/password) |

---

## 🚀 Features

- 🗓️ **Live Events Feed** from user submissions and scrapers  
- ✍️ **Event Submission Form** for manual inputs  
- 🔍 **Advanced Filters** by date, type, location, and college  
- 🔐 **Clerk Auth** with OAuth and email/password  

## ⚙️ Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/shaikhaman01/happndr.git
cd happndr
```
### 2. Setup environment variables
Create .env file, Include:

```bash
DATABASE_URL=postgresql://...
CLERK_SECRET_KEY=...
CLERK_PUBLISHABLE_KEY=...
```
# From root
```
npm install
```
```
npm prisma migrate dev
npm run dev
```

