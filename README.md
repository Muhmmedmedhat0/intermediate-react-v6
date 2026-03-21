# Note Passer

A small Next.js App Router application for passing notes between users, powered by SQLite.

The app demonstrates:

- Server Components reading from a local SQLite database
- Server Actions for writing/updating data
- A client polling view that appends new rows incrementally
- Basic TypeScript modeling for notes and users

## Tech Stack

- Next.js 16.1.6 (App Router)
- React 19.2.3
- TypeScript 5
- SQLite via promised-sqlite3
- ESLint 9 + eslint-config-next
- Tailwind CSS v4 (imported in global stylesheet)

## Application Overview

This project currently assumes a fixed logged-in user with id 1 for several pages.

Main routes:

- / : simple navigation hub
- /my-notes : shows notes to user 1 and from user 1
- /write-note : form to insert a note (Server Action)
- /secret-teacher-feed : auto-refreshing feed view that polls every 5s
- /who-am-i : displays current user info and allows username update (Server Action)

## Data Model (SQLite)

Detected schema in notes.db:

```sql
CREATE TABLE users (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	name TEXT NOT NULL,
	password TEXT NOT NULL
);

CREATE TABLE notes (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	note TEXT NOT NULL,
	from_user INTEGER NOT NULL,
	to_user INTEGER NOT NULL,
	FOREIGN KEY (from_user) REFERENCES users(id),
	FOREIGN KEY (to_user) REFERENCES users(id)
);
```

Current local sample data snapshot during analysis:

- users: 7
- notes: 52

## Server Actions and Data Flow

- Write note action
  - Reads formData fields from_user, to_user, note
  - Inserts into notes table
  - Redirects to /

- Update username action
  - Reads formData fields username, id
  - Updates users.name for that id
  - Redirects to /

- Teacher feed polling
  - Initial fetch is server-side
  - Client component polls every 5 seconds
  - Incremental fetch uses since (last note id)

## Project Structure

```text
src/app/
	page.tsx
	layout.tsx
	globals.css
	my-notes/
		page.tsx
	write-note/
		page.tsx
		post-notes.ts
	secret-teacher-feed/
		page.tsx
		clint-page.tsx
		fetch-notes.tsx
	who-am-i/
		page.tsx
		clint-page.tsx
		who-am-i.tsx
		update-user-name.ts
	types/
		note.ts
		user.ts
```

## Run Locally

Prerequisites:

- Node.js 20+ (Node 22 is working in this repo)
- npm

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Open in browser:

- http://localhost:3000

Production build:

```bash
npm run build
npm run start
```

Lint:

```bash
npm run lint
```

## Notes About Local Database

- The app expects notes.db at the repository root.
- Queries assume users table and notes table already exist.
- Several pages currently hard-code user id 1 as the active user.

## Known Issues

Current lint findings:

- src/app/secret-teacher-feed/fetch-notes.tsx uses explicit any
- src/app/secret-teacher-feed/clint-page.tsx has an unused err variable in catch

Runtime caveat seen previously on Windows:

- Running multiple next dev processes in the same repo can trigger Turbopack cache/lock instability.
- If that happens, stop duplicate dev processes, remove .next, and restart a single dev server.

## Suggested Improvements

- Replace hard-coded user id 1 with real auth/session context
- Add DB bootstrap script and seed command for reproducible setup
- Add form validation and user-facing error states
- Add route-level loading and error boundaries
- Add integration tests for server actions and main routes
