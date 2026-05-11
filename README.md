# Turbo AI Notes App

Senior Full Stack Engineer technical challenge built with Django REST Framework and Next.js.

The application allows users to create, edit, organize, and filter notes with an autosave workflow and category-based organization.

---

# Demo Video

The full application walkthrough and technical explanation can be viewed here:

<a href="https://drive.google.com/file/d/1aTROoGS9e42YIrxqtZvYevk73PsqeoPn" target="_blank" rel="noopener noreferrer">
  Watch Demo Video
</a>

---

# Overview

This project is a minimal and polished notes-taking application focused on usability, clean architecture, and product-oriented frontend behavior.

The application includes:

- JWT authentication
- Autosave note editing
- Category-based organization
- Dynamic note filtering
- Relative date formatting
- Responsive UI
- Dockerized local development
- Backend and frontend testing

The main goal of the project was to build a clean and maintainable full stack application while keeping the user experience simple and responsive.

---

# Key Features

- User signup and login
- JWT authentication flow
- Automatic category creation per user
- Create notes instantly without manual save
- Autosave note updates
- Edit note title, content, and category
- Category-based filtering
- Relative date formatting:
  - Today
  - Yesterday
  - Month + day formatting
- Responsive notes dashboard
- Dockerized local setup
- Backend Django tests
- Frontend Vitest unit tests

---

# Tech Stack

## Backend

- Python
- Django
- Django REST Framework
- PostgreSQL
- Simple JWT

---

## Frontend

- Next.js
- React
- TypeScript
- Vitest
- ESLint

---

## Infrastructure

- Docker
- Docker Compose

---

# Architecture

## Backend

The backend follows a modular Django application structure.

- authentication = auth endpoints and JWT flow
- categories = user categories
- notes = notes CRUD operations

The API is intentionally simple and CRUD-focused to match the scope of the challenge.

---

## Frontend

The frontend follows a feature-oriented structure.

- features/auth
- features/categories
- features/notes
- lib/api
- lib/utils

The frontend includes:

- centralized API client
- autosave workflow
- defensive API normalization
- debounce-based persistence
- frontend-side filtering

---

# Product Decisions

The following decisions were intentionally made during implementation.

- Notes are created instantly when clicking "New Note".
- Notes are autosaved without a manual save button.
- Categories are automatically created for each user.
- Filtering is handled client-side for simplicity and responsiveness.
- The backend intentionally avoids unnecessary complexity.
- Delete functionality was intentionally omitted because it was not part of the challenge requirements.

---

# Project Structure

```txt
turbo-ai-notes-app/
├── AI_USAGE.md
├── README.md
├── docker-compose.yml
├── backend/
│   ├── Dockerfile
│   ├── apps/
│   │   ├── authentication/
│   │   │   ├── managers.py
│   │   │   ├── models.py
│   │   │   ├── selectors/
│   │   │   │   └── user_selectors.py
│   │   │   ├── serializers.py
│   │   │   ├── services/
│   │   │   │   └── auth_service.py
│   │   │   ├── tests/
│   │   │   │   ├── test_auth_serializers.py
│   │   │   │   └── test_auth_views.py
│   │   │   ├── urls.py
│   │   │   └── views.py
│   │   ├── categories/
│   │   │   ├── management/
│   │   │   │   └── commands/
│   │   │   │       └── seed_categories.py
│   │   │   ├── models.py
│   │   │   ├── serializers.py
│   │   │   ├── tests/
│   │   │   │   ├── test_category_views.py
│   │   │   │   └── test_seed_categories_command.py
│   │   │   ├── urls.py
│   │   │   └── views.py
│   │   └── notes/
│   │       ├── models.py
│   │       ├── selectors/
│   │       │   └── note_selectors.py
│   │       ├── serializers.py
│   │       ├── services/
│   │       │   └── note_service.py
│   │       ├── tests/
│   │       │   ├── test_note_serializers.py
│   │       │   └── test_note_views.py
│   │       ├── urls.py
│   │       └── views.py
│   ├── config/
│   │   ├── settings.py
│   │   ├── urls.py
│   │   ├── asgi.py
│   │   └── wsgi.py
│   ├── manage.py
│   └── requirements.txt
└── frontend/
    ├── src/
    │   ├── app/
    │   │   ├── login/
    │   │   ├── notes/
    │   │   │   ├── [noteId]/
    │   │   │   └── page.tsx
    │   │   ├── sign-up/
    │   │   ├── layout.tsx
    │   │   └── page.tsx
    │   ├── components/
    │   │   └── layout/
    │   │       ├── app-shell.tsx
    │   │       └── auth-layout.tsx
    │   ├── features/
    │   │   ├── auth/
    │   │   │   ├── api.ts
    │   │   │   ├── auth-form.tsx
    │   │   │   ├── session.test.ts
    │   │   │   └── session.ts
    │   │   ├── categories/
    │   │   │   ├── api.ts
    │   │   │   └── category-sidebar.tsx
    │   │   └── notes/
    │   │       ├── api.ts
    │   │       └── note-card.tsx
    │   ├── lib/
    │   │   ├── api/
    │   │   │   ├── client.test.ts
    │   │   │   └── client.ts
    │   │   ├── constants/
    │   │   │   ├── categories.ts
    │   │   │   └── routes.ts
    │   │   └── utils/
    │   │       ├── date.test.ts
    │   │       └── date.ts
    │   └── types/
    │       ├── auth.ts
    │       ├── category.ts
    │       └── note.ts
    ├── package.json
    ├── next.config.ts
    ├── tsconfig.json
    ├── vitest.config.ts
    └── vitest.setup.ts
```

---

# Running the Project

The project is fully containerized and the entire application can be started with a single command.

This is the only required command to run the full stack locally:

```bash
docker compose up --build -d
```

After running it, the following services will be available automatically:

- PostgreSQL database
- Django backend
- Next.js frontend

Everything else in this README is optional and only intended for development, debugging, testing, logs inspection, database access, or manual service interaction.

---

## Stop containers

```bash
docker compose down
```

---

## Stop containers and remove volumes

```bash
docker compose down -v
```

---

## View running containers

```bash
docker ps
```

---

## View all containers

```bash
docker ps -a
```

---

## View logs for all services

```bash
docker compose logs -f
```

---

# Access URLs

## Frontend app

```txt
http://localhost:3000
```

## Django Admin

```txt
http://localhost:8000/admin/
```

Django Admin requires a staff or superuser account.

Create one with:

```bash
docker exec -it turbo-notes-backend python manage.py createsuperuser
```

---

# Backend Commands

## Enter backend container

```bash
docker exec -it turbo-notes-backend bash
```

---

## Build backend container

```bash
docker compose build backend
docker compose up -d
```

---

## Restart backend

```bash
docker compose restart backend
```

---

## View backend logs

```bash
docker compose logs -f backend
```

---

## Run migrations

```bash
python manage.py migrate
```

---

## Run backend tests

```bash
docker exec -it turbo-notes-backend python manage.py test
```

---

## Run Django server manually

```bash
python manage.py runserver 0.0.0.0:8000
```

---

# Frontend Commands

## Enter frontend container

```bash
docker exec -it turbo-notes-frontend sh
```

---

## View frontend logs

```bash
docker compose logs -f frontend
```

---

## Run Next.js server manually

```bash
npm run dev -- --hostname 0.0.0.0
```

---

## Run frontend tests

```bash
docker exec -it turbo-notes-frontend npm run test
```

---

## Run frontend lint

```bash
docker exec -it turbo-notes-frontend npm run lint
```

---

## Run frontend build

```bash
docker exec -it turbo-notes-frontend npm run build
```

---

# Database Commands

## Enter PostgreSQL container

```bash
docker exec -it turbo-notes-db sh
```

---

## View database logs

```bash
docker compose logs -f db
```

---

## Connect to PostgreSQL

```bash
psql -U turbo_user -d turbo_notes
```

---

## Exit PostgreSQL

```bash
\q
```

---

## List tables

```bash
\dt
```

---

## Exit container

```bash
exit
```

---

# Database Queries

## Current database

```sql
SELECT current_database();
```

---

## Users

```sql
SELECT email, is_staff, is_superuser, is_active, created_at
FROM users;
```

---

## Categories

```sql
SELECT name, color
FROM categories
ORDER BY name;
```

---

## Total notes

```sql
SELECT COUNT(*) AS total_notes
FROM notes;
```

---

# API Endpoints

## Signup

```bash
curl -X POST http://localhost:8000/api/auth/signup/ \
-H "Content-Type: application/json" \
-d '{
  "email": "jwt@test.com",
  "password": "test123456"
}'
```

---

## Login

```bash
curl -X POST http://localhost:8000/api/auth/login/ \
-H "Content-Type: application/json" \
-d '{
  "email": "jwt@test.com",
  "password": "test123456"
}'
```

---

## Current User

```bash
curl -X GET http://localhost:8000/api/auth/me/ \
-H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

---

## Logout

Note: logout is handled client-side by removing JWT tokens locally.

```bash
curl -X POST http://localhost:8000/api/auth/logout/ \
-H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

---

## List Categories

```bash
curl -X GET http://localhost:8000/api/categories/ \
-H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

---

## List Notes

```bash
curl -X GET http://localhost:8000/api/notes/ \
-H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

---

## Create Note

```bash
curl -X POST http://localhost:8000/api/notes/create/ \
-H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
-H "Content-Type: application/json" \
-d '{
  "category_id": "CATEGORY_UUID"
}'
```

---

## Get Note Detail

```bash
curl -X GET http://localhost:8000/api/notes/NOTE_UUID/ \
-H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

---

## Update Note

```bash
curl -X PATCH http://localhost:8000/api/notes/NOTE_UUID/update/ \
-H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
-H "Content-Type: application/json" \
-d '{
  "title": "Updated title",
  "content": "Updated content"
}'
```

---

## Update Note Category

```bash
curl -X PATCH http://localhost:8000/api/notes/NOTE_UUID/update/ \
-H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
-H "Content-Type: application/json" \
-d '{
  "category_id": "CATEGORY_UUID"
}'
```

---

# Testing

## Backend

Backend tests include:

- authentication tests
- serializer tests
- notes API tests
- category API tests

Run backend tests:

```bash
docker exec -it turbo-notes-backend python manage.py test
```

---

## Frontend

Frontend unit tests were implemented using Vitest.

Covered areas include:

- relative date formatting
- API client behavior
- session management

Run frontend tests:

```bash
docker exec -it turbo-notes-frontend npm run test
```

---

# AI Usage

AI tools were used during development to accelerate iteration, improve implementation speed, and validate technical approaches.

All architectural decisions, validations, debugging, testing, and final implementation decisions remained under direct human control.

Additional details can be found in:

- [AI_USAGE.md](./AI_USAGE.md)

---

# Future Improvements

With additional time, the following improvements could be implemented:

- Delete notes
- Search functionality
- Pagination
- Optimistic UI updates
- Improved accessibility support
- Better mobile interactions
- E2E testing
- Refresh token rotation
- Token blacklisting for logout

---

# Final Notes

The project was intentionally designed to balance:

- clean architecture
- product-oriented UX
- simplicity
- maintainability
- realistic challenge scope

The focus was placed on delivering a polished and stable full stack application rather than introducing unnecessary architectural complexity.
