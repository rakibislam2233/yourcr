# Your CR - Class Representative Management System

**Your CR** is a comprehensive web application designed to facilitate communication and management between Class Representatives (CRs), students, and faculty members. Built with Next.js 16, this platform serves as a centralized hub for academic coordination and communication within educational institutions.

## 🚀 Features

### Authentication System
- **Student Login**: Secure authentication for students
- **CR Registration & Login**: Dedicated portal for Class Representatives
- **Forgot Password & Reset Password**: Self-service password recovery
- **Role-based Access Control**: Different interfaces for Students and CRs

### Class Representative (CR) Dashboard
- **Comprehensive Management Tools**: Full control over class administration
- **Dashboard Overview**: Summary of key metrics and recent activities
- **Institution Management**: View and manage institutional information
- **Subject Management**: Organize and maintain subject curriculum
- **Teacher Management**: Assign and coordinate with teachers
- **Class Schedule Management**: Create and update class routines
- **Student Management**: Handle student records and issues
- **Class Management**: Organize class sections and groups
- **Notice Management**: Publish and manage important announcements
- **Assessment Management**: Create, grade, and track student assessments
- **Issue Handling**: Address and resolve student concerns
- **Notification System**: Stay updated on important events
- **Profile Settings**: Customize personal account information

### Student Dashboard
- **Personalized Interface**: Tailored experience for individual students
- **Dashboard Home**: Centralized view of important activities
- **Institution Information**: Access to school/college details
- **Subject Viewing**: Browse enrolled subjects and materials
- **Teacher Information**: Contact and schedule details of assigned teachers
- **Class Schedule**: Access to personalized class routines
- **Assessment Tracking**: Monitor grades and performance
- **Notice Board**: View important announcements from CRs and faculty
- **Issue Submission**: Report problems or concerns to CRs
- **Profile Management**: Update personal information and preferences

### Information Management
- **Course Details**: Detailed information about various courses and subjects
- **Assessment Overviews**: Track progress and performance metrics
- **Statistics Dashboard**: Visual representation of class performance

### Public Pages
- **Homepage**: Engaging landing page with hero section and value proposition
- **About Us**: Company/organization information and mission
- **Contact Us**: Communication channels and support options
- **FAQ Section**: Frequently asked questions and answers
- **Privacy Policy & Terms & Conditions**: Legal documentation

## 🛠️ Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom configurations
- **UI Components**: Radix UI Primitives, Lucide React Icons
- **State Management**: React Hooks
- **Animations**: Framer Motion
- **Notifications**: Sonner Toast Library
- **Icons**: Lucide React
- **Typography**: Google Fonts (Inconsolata)

## 🏗️ Project Structure

```
src/
├── app/                      # Next.js App Router routes
│   ├── (mainlayout)/         # Main website pages (home, about, contact)
│   ├── auth/                 # Authentication routes
│   │   ├── cr-login/
│   │   ├── cr-register/
│   │   ├── student-login/
│   │   ├── forgot-password/
│   │   └── reset-password/
│   ├── dashboard/            # Protected dashboard routes
│   │   ├── cr/               # Class Representative dashboard
│   │   └── student/          # Student dashboard
│   ├── globals.css           # Global styles
│   └── layout.tsx            # Root layout
├── components/               # Reusable UI components
│   ├── common/               # Shared reusable components
│   ├── dashboard/            # Dashboard-specific components
│   ├── pages/                # Page-specific components
│   └── ui/                   # Base UI component library
├── lib/                      # Utility functions and libraries
└── assets/                   # Static assets (images, fonts, etc.)

```

## 📋 Pages & Routes

### Public Routes
- `/` - Homepage with hero section and company overview
- `/about-us` - Detailed information about the service
- `/contact-us` - Contact information and support channels
- `/faq` - Frequently asked questions
- `/privacy-policy` - Privacy policy document
- `/terms-and-conditions` - Terms and conditions

### Authentication Routes
- `/auth` - Authentication home page
- `/auth/student-login` - Student login portal
- `/auth/cr-register` - CR registration form
- `/auth/cr-login` - CR login portal
- `/auth/forgot-password` - Password recovery form
- `/auth/reset-password` - Password reset form

### Dashboard Routes

#### Class Representative (CR) Dashboard
- `/dashboard/cr` - CR Dashboard Home/Overview
- `/dashboard/cr/institution` - My Institution
- `/dashboard/cr/subjects` - Manage Subjects
- `/dashboard/cr/teachers` - Manage Teachers
- `/dashboard/cr/routine` - Manage Routine
- `/dashboard/cr/students` - Manage Students
- `/dashboard/cr/classes` - Manage Classes
- `/dashboard/cr/notices` - Manage Notices
- `/dashboard/cr/assessments` - Manage Assessments
- `/dashboard/cr/issues` - Student Issues
- `/dashboard/cr/notifications` - Notifications
- `/dashboard/cr/profile` - Profile Settings

#### Student Dashboard
- `/dashboard/student` - Student Dashboard Home
- `/dashboard/student/notices` - View Notices
- `/dashboard/student/routine` - View Routine
- `/dashboard/student/assessments` - View Assessments
- `/dashboard/student/classes` - View Classes
- `/dashboard/student/subjects` - View Subjects
- `/dashboard/student/teachers` - View Teachers
- `/dashboard/student/institution` - View Institute Information
- `/dashboard/student/issues` - Submit Issues
- `/dashboard/student/profile` - My Profile


## 🔧 Setup Instructions

1. **Clone the repository:**
```bash
git clone <repository-url>
cd your-cr
```

2. **Install dependencies:**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Run the development server:**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. **Open your browser:**
Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 🧪 Available Scripts

- `npm run dev` - Start the development server with Turbopack
- `npm run build` - Build the application for production with Turbopack
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code quality checks

## 🎨 UI Components

The application uses a comprehensive set of UI components:

- **Form Elements**: Labels, inputs, buttons, and validation components
- **Navigation**: Headers, sidebars, and menu systems
- **Data Display**: Cards, tables, statistics panels, and charts
- **Feedback**: Toast notifications, loading states, and error messages
- **Interactive Elements**: Modals, dropdowns, and accordions

## 🌐 Deployment

This application is built with Next.js and can be deployed on platforms like:
- Vercel (recommended)
- Netlify
- AWS
- Azure
- Any platform that supports Node.js applications

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🐞 Reporting Issues

If you encounter any issues or have suggestions for improvement, please create an issue in the repository with:
- A clear description of the problem
- Steps to reproduce the issue
- Expected behavior
- Actual behavior
- Browser and OS information if relevant

## 🙏 Acknowledgments

- Next.js team for the excellent framework
- The open-source community for various libraries and tools
- Icons from Lucide React
- UI components inspired by Radix UI