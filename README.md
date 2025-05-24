# ePharm Frontend

A comprehensive web application for managing pharmacy operations, built with React, TypeScript, and Vite. This modern healthcare platform facilitates interactions between patients, doctors, pharmacies, and administrators.

## 🚀 Features

### Core Features
- Multi-user role management system
- Secure authentication and authorization
- Real-time notifications using Sonner
- Responsive and accessible UI components
- Form validation and error handling
- API integration with backend services
- Type-safe development environment

### Role-Specific Features

#### Admin Portal
- User management dashboard
- System configuration controls
- Analytics and reporting tools
- Access control management

#### Doctor Interface
- Patient management
- Prescription writing
- Appointment scheduling
- Medical history access

#### Patient Portal
- Appointment booking
- Prescription viewing
- Medicine order tracking
- Profile management

#### Pharmacy Dashboard
- Inventory management
- Order processing
- Prescription verification
- Stock analytics

## 📋 Prerequisites

### Required Software
- Node.js (v18.0.0 or higher)
- npm (v8.0.0 or higher) or bun
- Git

### Recommended Tools
- VS Code with recommended extensions:
  - ESLint
  - Prettier
  - TypeScript and JavaScript extensions
- Chrome DevTools for debugging

## 🛠️ Getting Started

### Installation

1. Clone the repository:
```
bash
git clone [your-repository-url]
cd ePharm_FrontEnd
```


2. Install dependencies:
```
bash
npm install
# or if using bun
bun install
```


3. Set up environment variables:
```
bash
cp .env.example .env
```

4. Configure your environment variables in .env:
```
env
VITE_API_URL=your_api_url_here
VITE_API_KEY=your_api_key_here
VITE_ENV=development
```

## 🏃‍♂️ Development

### Starting the Development Server
```
bash
npm run dev
# or
bun dev
```

The application will be available at http://localhost:5173

### Available Scripts
```
- npm run dev - Start development server
- npm run build - Create production build
- npm run preview - Preview production build
- npm run lint - Run ESLint
- npm run type-check - Run TypeScript type checking
```

## 🏛 Architecture

### Application Structure
The application follows a modular architecture with the following key concepts:

1. **Pages**: Route-based components representing different views
2. **Components**: Reusable UI elements
3. **Hooks**: Custom React hooks for shared logic
4. **Context**: Global state management
5. **API**: Backend communication layer
6. **Types**: TypeScript type definitions
7. **Lib**: Utility functions and helpers

### State Management
- React Context for global state
- Local component state using useState/useReducer
- Form state managed by Formik

### Routing Structure
```
/
├── /admin/*     # Admin routes
├── /doctor/*    # Doctor routes
├── /patient/*   # Patient routes
└── /pharmacy/*  # Pharmacy routes
```

## 💻 Technology Stack

### Core Technologies
- **React 18**: UI library
- **TypeScript**: Programming language
- **Vite**: Build tool and development server

### UI Components and Styling
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon components
- **PostCSS**: CSS processing

### Form Management
- **Formik**: Form state management
- **Zod**: Schema validation

### HTTP and API
- **Axios**: HTTP client
- Custom API hooks for data fetching

### Development Tools
- **ESLint**: Code linting
- **TypeScript**: Static type checking
- **Vite**: Hot module replacement

## 📁 Detailed Project Structure

```
epharm-frontend/
├── src/
│   ├── api/              # API integration layer
│   ├── components/       # Shared UI components
│   ├── context/          # React context definitions
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions
│   ├── pages/            # Route components
│   ├── types/            # TypeScript types
│   └── styles/           # Global styles
├── public/               # Static assets
├── tests/                # Unit & E2E tests
└── config/               # Configuration files
```


## ⚙️ Configuration

### Environment Variables
```
Create a .env file with the following:
env
VITE_API_URL=your_api_url_here
VITE_API_KEY=your_api_key_here
VITE_ENV=development
VITE_LOG_LEVEL=debug
```


### Build Configuration

The vite.config.ts file contains build settings:

- Development server configuration
- Build optimization settings
- Plugin configuration
- Environment variable handling

## 🔌 API Integration

### API Structure
- RESTful endpoints
- JWT authentication
- Request/Response interceptors


### Error Handling
- Global error boundary
- API error handling
- Form validation errors
- User feedback mechanisms

## 🎨 Styling Guide

### Design System
- Consistent color palette
- Typography scale
- Spacing system
- Component variants

### CSS Architecture
- Tailwind CSS utilities
- Custom component styles
- Responsive design patterns
- Theme customization

## 👥 Contributing

- Adea Tabaku
- Artina Qorrolli
- Aulona Livoreka
- Fatjeta Gashi
- Gerta Hodolli

### Coding Standards
- Follow TypeScript best practices
- Use ESLint rules
- Write meaningful commit messages
- Document new features


## ❓ Troubleshooting

### Common Issues
1. Installation problems
   - Clear node_modules and package-lock.json
   - Run npm cache clean --force
   - Reinstall dependencies

2. Build errors
   - Check TypeScript errors
   - Verify environment variables
   - Clear build cache

3. Runtime errors
   - Check browser console
   - Verify API connectivity
   - Check authentication status


### Security
- Report security vulnerabilities
- Data protection measures
- Privacy compliance


---

## 🔄 Version History

- v1.0.0 - Initial release
  - Multi-user role system
  - Basic functionality
  - Core features implementation
