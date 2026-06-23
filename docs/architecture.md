SiraLink System Architecture

Overview

SiraLink is a job matching platform that connects job seekers with employers through a modern web application, Telegram integration, and Supabase backend services.

The system consists of four major layers:

1. Frontend Application
2. Backend Services
3. Database Layer
4. Telegram Bot Layer

---

Frontend Layer

Technologies:

- HTML5
- CSS3
- JavaScript (Vanilla JS)

Main Features:

- User Authentication
- Job Listings
- Job Search
- Job Applications
- Saved Jobs
- User Profile
- Notifications
- Settings

Pages:

- Home
- Jobs
- Job Details
- Saved Jobs
- Notifications
- Profile
- Settings
- About
- Support

Admin Pages:

- Dashboard
- Jobs Management
- Users Management
- Analytics
- Notifications
- Broadcasts
- Departments
- Settings

---

Backend Layer

Backend services are powered by Supabase.

Services:

- Authentication
- Database
- Storage
- Edge Functions
- Realtime Updates

Main Responsibilities:

- User Management
- Job Management
- Application Tracking
- Notification Delivery
- Analytics Processing

---

Database Layer

Core Tables:

- users
- jobs
- applications
- saved_jobs
- notifications
- broadcasts
- admins
- departments
- locations
- settings

Relationships:

users → applications

jobs → applications

users → saved_jobs

users → notifications

admins → broadcasts

departments → jobs

---

Storage Layer

Storage Buckets:

- cvs
- certificates
- profile-pictures
- company-logos
- banners

Purpose:

- Resume Uploads
- Certificate Uploads
- User Images
- Company Branding Assets
- Marketing Banners

---

Telegram Integration

Telegram Bot Features:

- User Registration
- Job Notifications
- Broadcast Messages
- Quick Profile Access
- Job Alerts

Bot Components:

- Commands
- Handlers
- Services
- Webhook

---

Security

Authentication:

- Telegram Login
- Session Validation

Authorization:

- User Access Control
- Admin Access Control

Policies:

- Row Level Security (RLS)
- Supabase Policies

---

Analytics System

Tracks:

- Total Users
- Active Users
- Job Posts
- Applications
- Saved Jobs
- Notification Delivery

Reports:

- Daily Reports
- Weekly Reports
- Monthly Reports

---

Deployment

Frontend:

- GitHub Pages

Backend:

- Supabase Cloud

Bot:

- Telegram Bot API

Storage:

- Supabase Storage

---

Future Improvements

- AI Job Matching
- CV Scoring
- Interview Scheduler
- Employer Portal
- Mobile Application
- Multi-language Support

---

Architecture Summary

Frontend (HTML/CSS/JS)

↓

Supabase Services

↓

Database + Storage

↓

Telegram Bot

↓

Users & Administrators

SiraLink is designed to be scalable, secure, and easy to maintain while providing a fast job discovery experience for Ethiopian job seekers.