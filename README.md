# 💻 HackSpace – Real-Time Collaborative Code Editor

HackSpace is a **real-time collaborative coding platform** built to help developers, students, and teams code together efficiently. With support for live cursors, syntax highlighting, chat, and AI-powered assistance, it redefines remote programming collaboration.

Whether you're building side-by-side with your teammates, teaching a coding session, or pair programming, HackSpace makes it feel like you're in the same room.

---

## 🌟 Features

- 🔄 **Real-Time Code Collaboration**  
  Multiple users can write and edit code simultaneously with live cursor tracking.

- 🎨 **Monaco Editor Integration**  
  A powerful code editor with syntax highlighting, IntelliSense, and customization.

- 🤖 **AI Assistant (Google Gemini 1.5 Flash)**  
  Ask coding-related queries, get code suggestions, and debug with the help of AI.

- 🔐 **Authentication via Firebase**  
  Secure Google OAuth login for seamless access and session management.

- 🌐 **Realtime Backend with Firebase Realtime DB & Firestore**  
  Ensures smooth synchronization and minimal latency for collaborative coding.

- ⚡ **Blazing Fast Frontend with Next.js**  
  SSR & Static Generation optimize performance across devices.


---

## 🚀 Tech Stack

| Technology          | Purpose                                          |
|---------------------|--------------------------------------------------|
| **Next.js 15**       | Frontend framework with server-side rendering    |
| **Tailwind CSS**     | Utility-first CSS framework for responsive UI    |
| **Monaco Editor**    | Code editor (same used by VS Code)               |
| **Firebase Auth**    | Secure user authentication (Google login)        |
| **Firebase Realtime Database** | Real-time data sync between users       |
| **Firebase Firestore** | Persistent session data & file storage        |
| **Google Gemini 1.5 Flash** | AI-based code assistant integration        |

---

## 🔧 Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/codemate.git
   cd codemate
