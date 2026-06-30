# MediTrack — Hospital Management System

A full-stack hospital management system with role-based dashboards for Admins, Doctors, and Patients.

## Overview

MediTrack lets a hospital manage doctors, patients, departments, appointments, prescriptions, and medical records in one place.

- **Admin** — manages doctors, patients, and departments, and views hospital-wide statistics.
- **Doctor** — manages appointments, writes prescriptions (with PDF export), and maintains patient medical records.
- **Patient** — books appointments and views their own medical history and prescriptions.

## Tech Stack

**Backend:** Java, Spring Boot, Spring Security, JWT, Spring Data JPA, MySQL, iText (PDF generation)

**Frontend:** React, Vite, Tailwind CSS, React Router, Axios

## Features

- JWT-based authentication with role-based login (Admin / Doctor / Patient)
- Full CRUD for doctors, patients, and departments
- Appointment booking and status tracking
- Prescription management with downloadable PDF export
- Patient medical record history
- Role-specific dashboards with live statistics
- Responsive UI with a collapsible sidebar for mobile

## Project Structure

```
meditrack/
├── src/                      Spring Boot backend
│   └── main/java/com/yogesh/meditrack/
│       ├── controller/
│       ├── entity/
│       ├── service/
│       ├── serviceimpl/
│       ├── security/
│       └── config/
└── frontend/                 React frontend
    └── src/
        ├── components/
        ├── context/
        ├── pages/
        └── service/
```

## Getting Started

### Prerequisites

- Java 21+ and Maven
- Node.js 18+ and npm
- MySQL

### Backend Setup

1. Create a MySQL database for the project.
2. Copy `src/main/resources/application.properties.example` to `application.properties` and fill in your database credentials and JWT secret.
3. Run the backend:
   ```bash
   mvn spring-boot:run
   ```
   The API starts at `http://localhost:8080`.

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The app runs at `http://localhost:5173`.

### Default Roles

New accounts created through registration are assigned the `PATIENT` role by default. To create an `ADMIN` or `DOCTOR` account, update the user's role directly in the database:

```sql
UPDATE users
SET role_id = (SELECT id FROM roles WHERE name = 'ADMIN')
WHERE email = 'your-email@example.com';
```

## API Documentation

Once the backend is running, interactive API docs are available at:

```
http://localhost:8080/swagger-ui/index.html
```

## License

This project is open source and available for learning purposes.
