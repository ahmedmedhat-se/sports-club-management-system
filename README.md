# Sports Club Management System

> Developed by **Ahmed Medhat - Lojain MOhammed**

---
## Project Overview
**Sports Club Management System** is a modern CRUD web app for managing club operations, including members, trainers, activities, schedules, facility reservations, and participation records. Built with Node.js, MySQL, and EJS, it features a clean dashboard for efficient administration. 

**Developed by:** Ahmed Medhat - Lojain MOhammed
**Project Type:** Node.js Web Application
**License:** Proprietary – All rights reserved

---
## Project Structure
### SPORTS-CLUB-MANAGEMENT-SYSTEM (Node.js)
```js
sports-club-management-system/
├── config/
│   └── db.js
│
├── controllers/
│   ├── memberController.js
│   ├── trainerController.js
│   ├── activityController.js
│   ├── facilityController.js
│   ├── scheduleController.js
│   ├── reservationController.js
│   ├── participationController.js
│   └── dashboardController.js
│
├── db/
│   └── schema.sql
│
├── models/
│   ├── Member.js
│   ├── Trainer.js
│   ├── Activity.js
│   ├── Facility.js
│   ├── Schedule.js
│   ├── Reservation.js
│   ├── Participation.js
│   └── Dashboard.js
│
├── public/
│   ├── css/
│   │   └── style.css
│   └── js/
│
├── routes/
│   ├── memberRoutes.js
│   ├── trainerRoutes.js
│   ├── activityRoutes.js
│   ├── facilityRoutes.js
│   ├── scheduleRoutes.js
│   ├── reservationRoutes.js
│   ├── participationRoutes.js
│   └── dashboardRoutes.js
│
├── views/
│   ├── partials/
│   │   ├── header.ejs
│   │   ├── sidebar.ejs
│   │   ├── navbar.ejs
│   │   ├── footer.ejs
│   │   └── alerts.ejs
│   ├── dashboard.ejs
│   ├── members.ejs
│   ├── trainers.ejs
│   ├── activities.ejs
│   ├── facilities.ejs
│   ├── schedules.ejs
│   ├── reservations.ejs
│   ├── participations.ejs
│   ├── 404.ejs
│   └── error.ejs
│
│── .env
│── .gitignore
│── app.js
│── package-lock.json
│── package.json
└── README.md
```

---
## Technologies Used
### Backend Technologies
| Technology                                                                                                                | Purpose                           | Version |
| ------------------------------------------------------------------------------------------------------------------------- | --------------------------------- | ------- |
| ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)                | JavaScript Runtime Environment    | 18.x+   |
| ![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)            | Web Application Framework         | 4.x     |
| ![Nodemon](https://img.shields.io/badge/Nodemon-76D04B?style=for-the-badge&logo=nodemon&logoColor=white)                  | Development Server Auto-Restart   | 3.x     |
| ![Dotenv](https://img.shields.io/badge/Dotenv-000000?style=for-the-badge&logo=dotenv&logoColor=white)                     | Environment Variables Loader      | 16.x    |
| ![MySQL2](https://img.shields.io/badge/MySQL2-005C84?style=for-the-badge&logo=mysql&logoColor=white)                      | MySQL Database Driver             | 3.x     |

### Database & Tools
| Technology                                                                                                                | Purpose                           | Version |
| ------------------------------------------------------------------------------------------------------------------------- | --------------------------------- | ------- |
| ![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)                        | Relational Database               | 8.x     |
| ![MySQL Workbench](https://img.shields.io/badge/MySQL_Workbench-4479A1?style=for-the-badge&logo=mysql&logoColor=white)    | Database Design & Management      | 8.x     |

---
## Installation
## Backend Dependencies
**Step 1. Setup Express.js Project:**
```bash
cd sports-club-management-system
npm i -y
```

**Step 2: Install all dependencies:**
```bash
npm install express mysql2 dotenv method-override

npm install --save-dev nodemon
```

---
## License
**PROPRIETARY LICENSE**
© 2026 Ahmed Medhat. All Rights Reserved.
This project is a personal, non-commercial work created solely for the purpose of demonstrating full-stack web development skills.

This software and associated documentation are proprietary and confidential. No part of this project may be reproduced, distributed, or transmitted in any form without prior written permission from the author.

---
## Author
* **Ahmed Medhat** – Junior Full Stack JavaScript Developer