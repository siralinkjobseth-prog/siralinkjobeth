SiraLink API Flow Documentation

Overview

This document explains how data flows between the Frontend, Supabase Backend, Database, Storage, and Telegram Bot.

The system follows a client → service → database architecture.

---

System Components

1. Frontend Application
2. Supabase Services
3. PostgreSQL Database
4. Supabase Storage
5. Telegram Bot

---

User Registration Flow

User Opens Application

↓

Telegram Authentication

↓

User Information Received

↓

Check Existing User

↓

Create User Record (if not exists)

↓

Store Session

↓

Redirect To Dashboard

Database Table:

- users

Files Used:

- telegram-auth.js
- session.js
- users-service.js

---

User Login Flow

User Opens App

↓

Telegram Login

↓

Validate Telegram Data

↓

Load User Profile

↓

Create Session

↓

Open Home Page

Database Table:

- users

---

Profile Update Flow

User Opens Profile Page

↓

Edit Information

↓

Submit Form

↓

Validate Data

↓

Update Database

↓

Show Success Message

Database Table:

- users

Storage Bucket:

- profile-pictures

Files Used:

- profile.js
- personal-info.js

---

CV Upload Flow

User Selects CV

↓

Upload To Storage

↓

Receive Public URL

↓

Save URL To User Record

↓

Profile Updated

Storage Bucket:

- cvs

Database Table:

- users

Files Used:

- upload-cv.js
- storage-service.js

---

Certificate Upload Flow

User Selects Certificate

↓

Upload To Storage

↓

Generate URL

↓

Save Certificate Reference

↓

Success Message

Storage Bucket:

- certificates

Files Used:

- upload-certificate.js
- storage-service.js

---

Job Listing Flow

Admin Creates Job

↓

Validate Form

↓

Insert Job Record

↓

Store Company Logo

↓

Publish Job

Database Table:

- jobs

Storage Bucket:

- company-logos

Files Used:

- add-job.js
- jobs-service.js

---

Job Search Flow

User Opens Jobs Page

↓

Load Active Jobs

↓

Apply Filters

↓

Search Query

↓

Display Results

Database Table:

- jobs

Files Used:

- jobs.js
- search.js
- filters.js

---

Job Detail Flow

User Clicks Job

↓

Load Job Information

↓

Load Company Details

↓

Display Full Job

Database Table:

- jobs

Files Used:

- job-detail.js

---

Save Job Flow

User Clicks Save

↓

Check Existing Record

↓

Save Job

↓

Update UI

Database Table:

- saved_jobs

Files Used:

- save-job.js

---

Apply Job Flow

User Clicks Apply

↓

Validate Profile

↓

Create Application

↓

Generate Notification

↓

Success Message

Database Tables:

- applications
- notifications

Files Used:

- apply-job.js

---

Notification Flow

System Event Triggered

↓

Notification Created

↓

Save Notification

↓

Display In App

↓

Optional Telegram Alert

Database Table:

- notifications

Files Used:

- notifications-service.js

Edge Function:

- send-notification

---

Broadcast Flow

Admin Creates Broadcast

↓

Validate Content

↓

Store Broadcast

↓

Send To Users

↓

Record Analytics

Database Tables:

- broadcasts
- notifications

Files Used:

- broadcasts.js

Edge Function:

- broadcast-message

---

Analytics Flow

User Activity

↓

Collect Statistics

↓

Process Data

↓

Generate Reports

↓

Display Dashboard

Database Tables:

- users
- jobs
- applications

Files Used:

- analytics.js

Edge Function:

- daily-analytics
- generate-statistics

---

Telegram Notification Flow

New Job Published

↓

Notification Generated

↓

Telegram Service Triggered

↓

Send Message

↓

User Receives Alert

Bot Files:

- notifications.js
- telegram-api.js

---

Admin Login Flow

Admin Opens Login Page

↓

Enter Credentials

↓

Validate Account

↓

Create Session

↓

Open Dashboard

Database Table:

- admins

Files Used:

- admin-guard.js
- login.html

---

Storage Flow

User Uploads File

↓

Supabase Storage

↓

Generate Public URL

↓

Store URL In Database

↓

Display File

Storage Buckets:

- cvs
- certificates
- profile-pictures
- company-logos
- banners

---

Security Flow

User Request

↓

Authentication Check

↓

Authorization Check

↓

RLS Policy Validation

↓

Database Access

Security Components:

- Row Level Security
- User Guard
- Admin Guard
- Session Validation

---

Complete System Flow

User

↓

Frontend (HTML/CSS/JS)

↓

Supabase Client

↓

Database / Storage

↓

Notifications & Analytics

↓

Telegram Bot

↓

User

---

API Flow Summary

Frontend communicates directly with Supabase.

Supabase handles:

- Authentication
- Database Queries
- Storage Uploads
- Edge Functions
- Realtime Features

Telegram Bot extends the platform by delivering notifications and updates outside the web application.

This architecture keeps SiraLink fast, scalable, secure, and easy to maintain.
