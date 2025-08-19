# 🏥 MedEase – Smart Hospital Management System

**MedEase** is a modern, full-stack hospital management system developed for the **CMP216: Web Applications and Cloud Services** module at **Newcastle College University Centre**. It provides hospital staff with a responsive and accessible platform for managing patients and hospital room assignments efficiently.

---

## 🎯 Project Purpose

This application showcases practical skills in:

- Full-stack JavaScript development using Node.js and Express.js  

- Cloud database integration with MongoDB Atlas  

- Dynamic frontend rendering using EJS templating  

- Accessibility enhancements including dark mode and keyboard navigation  

- Docker-based containerisation for development and deployment  

- Robust error handling and logging using industry best practices  

The system was built specifically to meet the **Pass, Merit, and Distinction** criteria outlined in the CMP216 module guide.

---

## 👨‍💻 Developer

**Arshad Aslam**  

Foundation Degree in Software Engineering  

Newcastle College University Centre  

Academic Year: 2024–2025

---

## 🧰 Technologies Used

- **Node.js** & **Express.js** – Backend logic and routing  

- **MongoDB Atlas** – Cloud-hosted NoSQL database  

- **EJS** – Embedded JavaScript for dynamic page rendering  

- **CSS3** – Custom styling with dark mode support  

- **Font Awesome** – UI icons for better user interaction  

- **Winston** – Optional logging for server-side errors  

- **Docker** – Containerisation for simplified deployment  

- **Dark Mode Toggle** – Accessibility feature using `localStorage`

---

## 🌐 Key Features

- 👤 **Patient Management**  

  Add, edit, view, and delete patient records with validation and flash messages.

- 🏨 **Room Management**  

  Manage room availability and occupancy with easy room registration.

- 🌙 **Dark Mode Toggle**  

  Site-wide toggle with saved preferences using `localStorage` for accessibility.

- 💥 **Error Handling**  

  Custom 404 and 500 pages, with optional server-side logging for diagnostics.

- 🎨 **Polished UI**  

  Responsive layout with vibrant colour schemes, animations, and intuitive navigation.

- 🔒 **Form Validation**  

  Built-in error handling and validation to prevent incomplete submissions.

- 🐳 **Docker Support**  

  Includes Dockerfile and environment support for container-based development.

- ✅ **Accessibility Enhancements**  

  Semantic HTML, keyboard navigation, and high-contrast design for usability.

---

## 🌙 Dark Mode Support

Dark mode is available across all pages and toggled using a switch.  

Preferences are remembered via `localStorage`, ensuring consistent appearance.  

This feature enhances accessibility and comfort in low-light conditions.

---

## 🐳 Docker Setup (Optional)

You can run MedEase inside a Docker container using one of two methods:

### 🔹 Option 1 – Docker Only

```bash

docker build -t medease .

docker run -p 3000:3000 --env-file .env medease
 