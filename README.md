# Tied

## What Tied Is

Tied is a link-in-bio app. Users sign up, pick a username and get a public profile page at `/<username>` that lists all their links in one place. From the dashboard they manage their links, customize how the profile looks and see how visitors interact with it.

## Live Demo

- **App:** :- https://try-tied.vercel.app/


## Features

- **Accounts**: sign up with email and password or with Google
- **Links**: add, edit, reorder, hide and delete links
- **Appearance**: profile picture with cropping and zoom, name, bio, light, dark or custom color theme, and button shape, with a live preview
- **Public profile**: shareable page at `/<username>`. Old usernames keep redirecting after a rename
- **Analytics**: profile views, link clicks, click-through rate and traffic sources, with visitors deduplicated by a hashed IP
- **Settings**: change username and delete the account

## How It Works

1. **Sign up**: the user creates an account with Firebase Authentication and chooses a username.
2. **Profile created**: the frontend calls the backend, which verifies the Firebase token and creates a profile in MongoDB.
3. **Customize**: in the dashboard the user adds links and sets their picture, bio, theme and button style.
4. **Share**: the user shares their profile link, `/<username>`.
5. **Track**: each profile view and link click is recorded and shown on the Analytics page.

## Tech Stack

| Part     | Stack                                                                   |
| -------- | ----------------------------------------------------------------------- |
| Frontend | React 19, Vite, React Router, Tailwind CSS, Axios                       |
| Backend  | Node.js, Express 5, Mongoose                                            |
| Database | MongoDB                                                                 |
| Auth     | Firebase Authentication, verified on the backend with `firebase-admin`  |
| Hosting  | Vercel (frontend), Render (backend)                                     |

## Project Structure

```
Tied/
├── frontend/              React app
│   └── src/
│       ├── pages/         Landing, sign in/up, public profile, dashboard pages
│       ├── Dashboard/     Dashboard layout pieces (sidebar, help)
│       ├── components/    Shared UI (ProfileView, ImageCropper, ...)
│       ├── context/       AuthContext: Firebase user and Tied profile
│       ├── services/      Axios API client
│       └── utils/         Helpers such as image resizing
├── backend/               Express API
│   └── src/
│       ├── config/        MongoDB and Firebase Admin setup
│       ├── middleware/    Token verification and error handling
│       ├── models/        User, Link, Avatar, AnalyticsEvent
│       ├── routes/        /api/users, /api/links, /api/public, /api/analytics
│       └── utils/         Username rules, tracking, traffic source detection
└── render.yaml            Render deployment config for the backend
```

## Architecture Overview

```
┌──────────────────────┐   sign in / sign up    ┌─────────────────────────┐
│   React frontend     │ ─────────────────────▶ │ Firebase Authentication │
│   (Vercel)           │ ◀───── ID token ────── │                         │
└──────────┬───────────┘                        └────────────▲────────────┘
           │ REST requests                                   │
           │ Authorization: Bearer <ID token>                │ verify token
           ▼                                                 │
┌──────────────────────┐                                     │
│   Express API        │ ────────────────────────────────────┘
│   (Render)           │
└──────────┬───────────┘
           │ Mongoose
           ▼
┌──────────────────────┐
│   MongoDB            │  users · links · avatars · analytics events
└──────────────────────┘
```

- **Firebase Authentication** holds login credentials. Passwords never reach the Tied backend.
- **Express API** checks the Firebase ID token on protected routes (`/api/users/me`, `/api/links`, `/api/analytics`). Public routes (`/api/public`) serve profiles and record views and clicks.
- **MongoDB** stores the rest. Each `User` is linked to its Firebase account by `firebaseUid`. Links, profile pictures and analytics events live in their own collections and reference the user.
