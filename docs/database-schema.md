SiraLink Database Schema

Overview

The SiraLink database is built on Supabase PostgreSQL.

The database stores users, jobs, applications, notifications, analytics, departments, and system settings.

---

users

Stores job seeker information.

Column| Type
id| uuid
telegram_id| bigint
full_name| text
email| text
phone| text
location| text
profile_picture| text
cv_url| text
education| text
experience| text
skills| text[]
profile_completion| integer
created_at| timestamptz

Primary Key:

- id

---

jobs

Stores all available job vacancies.

Column| Type
id| uuid
title| text
company_name| text
department_id| uuid
location_id| uuid
description| text
requirements| text
salary| text
employment_type| text
application_deadline| date
company_logo| text
status| text
created_at| timestamptz

Primary Key:

- id

Foreign Keys:

- department_id → departments.id
- location_id → locations.id

---

applications

Stores job applications submitted by users.

Column| Type
id| uuid
user_id| uuid
job_id| uuid
status| text
created_at| timestamptz

Primary Key:

- id

Foreign Keys:

- user_id → users.id
- job_id → jobs.id

Application Status:

- pending
- reviewed
- shortlisted
- rejected
- hired

---

saved_jobs

Stores jobs saved by users.

Column| Type
id| uuid
user_id| uuid
job_id| uuid
created_at| timestamptz

Primary Key:

- id

Foreign Keys:

- user_id → users.id
- job_id → jobs.id

---

notifications

Stores user notifications.

Column| Type
id| uuid
user_id| uuid
title| text
message| text
type| text
is_read| boolean
created_at| timestamptz

Primary Key:

- id

Foreign Key:

- user_id → users.id

Notification Types:

- job
- success
- warning
- system

---

broadcasts

Stores admin broadcast messages.

Column| Type
id| uuid
admin_id| uuid
title| text
message| text
sent_count| integer
created_at| timestamptz

Primary Key:

- id

Foreign Key:

- admin_id → admins.id

---

admins

Stores administrator accounts.

Column| Type
id| uuid
username| text
email| text
password_hash| text
role| text
created_at| timestamptz

Primary Key:

- id

Roles:

- super_admin
- admin
- moderator

---

departments

Stores company departments.

Column| Type
id| uuid
name| text
description| text
created_at| timestamptz

Primary Key:

- id

Examples:

- IT
- Finance
- HR
- Marketing
- Engineering

---

locations

Stores job locations.

Column| Type
id| uuid
city| text
region| text
country| text
created_at| timestamptz

Primary Key:

- id

---

settings

Stores platform settings.

Column| Type
id| uuid
site_name| text
support_email| text
telegram_bot_username| text
maintenance_mode| boolean
created_at| timestamptz

Primary Key:

- id

---

Relationships Diagram

users
↓
applications
↑
jobs

users
↓
saved_jobs
↑
jobs

users
↓
notifications

admins
↓
broadcasts

departments
↓
jobs

locations
↓
jobs

---

Storage Buckets

Supabase Storage Buckets:

- cvs
- certificates
- profile-pictures
- company-logos
- banners

Purpose:

- Resume storage
- Certificate storage
- User profile images
- Company logos
- Advertisement banners

---

Security

Row Level Security (RLS):

Enabled on:

- users
- jobs
- applications
- saved_jobs
- notifications

Policies:

- User can access own data
- Admin can access all records
- Public can view active jobs only

---

Database Summary

Total Core Tables:

1. users
2. jobs
3. applications
4. saved_jobs
5. notifications
6. broadcasts
7. admins
8. departments
9. locations
10. settings

Database Engine:

- PostgreSQL (Supabase)

Authentication:

- Telegram Login
- Session Management

Storage:

- Supabase Storage Buckets