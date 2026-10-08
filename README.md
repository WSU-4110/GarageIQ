# GarageIQ — Project Overview & Team Responsibilities

## 1. Project Overview

**GarageIQ** is a web-based automotive build management platform designed for car enthusiasts to plan, track, maintain, and manage their vehicle builds in one place.

The platform addresses the problem of fragmented vehicle management. Currently, enthusiasts often rely on separate applications, spreadsheets, receipts, forums, and websites to track modifications, maintenance, and future upgrades.

GarageIQ combines these functions into a centralized platform.

### Main Features

1. **Vehicle Profiles** — Users can create profiles for their vehicles, including make, model, year, and build information.
2. **Modification Tracking** — Track installed modifications through organized build sheets.
3. **Maintenance Records** — Log maintenance activities such as oil changes, repairs, and part replacements.
4. **Future Build Planner** — Create wishlists for planned vehicle upgrades.
5. **Compatibility Recommendations** — Use predefined rules to recommend supporting modifications and identify maintenance impacts.
6. **Performance Shop Finder** — Discover automotive performance shops based on location and vehicle specialization.
7. **Document Storage** — Store receipts and supporting vehicle documentation, if time permits.

### Example Use Case

A user owns a Mercedes-Benz C350 and wants to plan future performance upgrades.

1. The user creates a vehicle profile for their C350.
2. They enter their existing modifications.
3. They add a planned modification to their wishlist.
4. GarageIQ checks predefined compatibility and supporting-modification rules.
5. The system displays relevant recommendations.
6. The user saves their future build plan.
7. The user can search for specialized automotive shops.

**Important:** GarageIQ uses rule-based recommendations, not AI-generated tuning advice.

---

## 2. Team Members & Responsibilities

### Yahya Alhawati — Team Lead / Backend Developer

**Primary Focus:** Backend development, application logic, and APIs.

**Technologies:** Python, FastAPI

**Responsibilities:**
- Lead and coordinate the development team.
- Develop backend API endpoints.
- Implement vehicle build-sheet functionality.
- Develop the future modification wishlist.
- Implement compatibility and supporting-modification rules.
- Connect backend services with the frontend and database.

**Example:**

When a user adds a modification to their vehicle, Yahya's backend processes the request, checks applicable compatibility rules, and communicates with the database.

### Faiyad Chowdhury — Frontend Developer

**Primary Focus:** User interface development.

**Technologies:** React, HTML, CSS

**Responsibilities:**
- Develop the website's frontend using React.
- Create vehicle profile pages.
- Build the maintenance logging interface.
- Develop interactive forms and dashboards.
- Connect frontend components to backend APIs.
- Ensure the application is responsive and user-friendly.

**Example:**

When a user clicks "Add Vehicle," Faiyad's frontend displays the form, collects the information, and submits it to the backend.

### Mohamed Hamidat — Backend / Integration Developer

**Primary Focus:** Shop discovery, recommendation integration, and testing.

**Technologies:** Python, FastAPI, location APIs, Pytest, GitHub Actions

**Responsibilities:**
- Develop the performance-shop finder.
- Integrate location-based shop discovery.
- Connect recommendation functionality with other application components.
- Help integrate backend services.
- Implement automated testing.
- Configure continuous integration using GitHub Actions.

**Example:**

When a user searches for a performance shop specializing in their vehicle brand, Mohamed's functionality helps retrieve relevant shops based on location and specialization.

### Ammar Deno — Database / Cloud Developer

**Primary Focus:** Database architecture, cloud infrastructure, and database integration.

**Technologies:** MySQL, Google Cloud Platform, GCP Cloud SQL

**Responsibilities:**
- Design the relational MySQL database schema.
- Configure and manage the GCP Cloud SQL database.
- Define relationships between database tables.
- Integrate the database with the FastAPI backend.
- Ensure vehicle, modification, and maintenance information can be stored and retrieved correctly.
- Collaborate with the backend and frontend developers to support application features.

**Main Database Entities:**
- Users
- Vehicles
- Modifications
- Maintenance records
- Future build plans / wishlists
- Compatibility rules
- Performance shops

**Example:**

A user adds their Mercedes-Benz C350 and records an oil change.

The backend sends the information to the database, where it is saved under the correct user and vehicle.

When the user opens their maintenance history, the stored information is retrieved and displayed.

---

## 3. How the Team's Work Connects

GarageIQ follows a traditional full-stack web application architecture.

```text
                  USER
                   |
                   v
           FRONTEND (REACT)
              Faiyad
                   |
                   v
          BACKEND (FASTAPI)
                Yahya
                   |
                   v
         DATABASE (MYSQL)
                Ammar
                   |
                   v
           GCP CLOUD SQL


      Mohamed — Integration & Testing
         |                  |
         v                  v
    Shop Finder       Recommendation
    / Location        Integration
         |
         v
     Testing / CI
```

### Example: Creating a Vehicle Profile

**Step 1 — Frontend (Faiyad)**

The user enters their vehicle details using a React form.

**Step 2 — Backend (Yahya)**

FastAPI receives the request and validates the vehicle information.

**Step 3 — Database (Ammar)**

The backend saves the vehicle information in MySQL.

**Step 4 — Integration & Testing (Mohamed)**

Integration and testing help ensure the functionality works correctly with the rest of the application.

---

## 4. Technology Stack

| Layer | Technology | Responsibility |
|---|---|---|
| Frontend | React, HTML, CSS | Faiyad |
| Backend | Python, FastAPI | Yahya |
| Database | MySQL | Ammar |
| Cloud Infrastructure | Google Cloud SQL / GCP | Ammar |
| Shop Discovery | Map / Location API | Mohamed |
| Testing | Pytest, Swagger | Mohamed / Team |
| Continuous Integration | GitHub Actions | Mohamed / Team |
| Version Control | GitHub | Everyone |

---

## 5. Development Timeline

### Sprint 1 — Core Platform / MVP

**Deadline:** October 22, 2026

**Features:**
- GCP MySQL database and core data model.
- User sign-in.
- Vehicle profile creation.
- Modification build sheets.
- Maintenance logging.

**Goal:** A user can sign in, add a vehicle, and save or view modifications and maintenance records.

### Sprint 2 — Build Planning & Recommendations

**Deadline:** November 19, 2026

**Features:**
- Future build wishlist.
- Modification compatibility rules.
- Supporting-modification recommendations.
- Maintenance recommendations based on modifications.

**Goal:** A user can plan an upgrade and receive relevant supporting-modification and maintenance recommendations.

### Sprint 3 — Shop Finder & Final Integration

**Deadline:** December 10, 2026

**Features:**
- Performance-shop finder.
- Location and specialization filtering.
- Receipt and document storage.
- System testing.
- Frontend improvements.
- Final integration.

**Goal:** Deliver a working, integrated GarageIQ web application.

**Optional Features:** Receipt uploads and additional shop-profile details can be removed if development falls behind.

---

## 6. Development Workflow

The team uses GitHub for project management and source control.

**Repository:** https://github.com/WSU-4110/Automotive-Build-Tracker

### Workflow

1. Create a GitHub issue with acceptance criteria.
2. Create a development branch linked to the issue.
3. Implement the feature.
4. Open a pull request.
5. Have another team member review and approve the change.
6. Merge the changes into the main branch.

### Initial Development Backlog

| Priority | Task | Assigned Members |
|---|---|---|
| 1 | Create a vehicle profile | Faiyad & Yahya |
| 2 | Add and view build-sheet items | Yahya |
| 3 | Add and view maintenance records | Faiyad & Ammar |

---

## 7. Project Summary

GarageIQ aims to simplify automotive build management by bringing vehicle records, modifications, maintenance history, future upgrades, compatibility recommendations, and performance-shop discovery into one web application.

Each team member owns a core development area:

- **Yahya:** Backend, APIs, compatibility rules, and team leadership.
- **Faiyad:** Frontend, vehicle profiles, and maintenance interface.
- **Mohamed:** Performance-shop finder, integrations, and testing.
- **Ammar:** MySQL database, GCP cloud infrastructure, and database integration.

The team's primary objective is to deliver a functional minimum viable product first, then expand it with planning, recommendation, and shop-discovery features over three development sprints.