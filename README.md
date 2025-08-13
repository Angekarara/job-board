# Job Board Application

A modern job board application built with React, featuring job listings, search functionality, and application management for the Rwandan job market.

## Demo

https://www.loom.com/share/c4e75b20193c498d8a051dabd2ef64f3?sid=d4619976-e340-4ab6-8a65-69b97b7e9db4

#### Responsiveness:
https://www.loom.com/share/f20586be9ef54225a37cdf3d00b92c42

### Deployed link: 
https://shakishajob.netlify.app/

## Features

- 🔍 Advanced job search and filtering
- 📱 Responsive design for mobile and desktop
- 🔐 User authentication
- 💼 Job application management
- 📄 Detailed job listings
- 🎯 Location-based job search
- 🔄 Real-time updates
- 🌐 Mock API integration

## Architecture

The application is built with the following architecture:

### Frontend

- **React** - UI library
- **Redux Toolkit** - State management
- **React Router** - Navigation
- **Tailwind CSS** - Styling

### Key Components

- `components/` - Reusable UI components
  - `auth/` - Authentication related components
  - `common/` - Shared components (Button, Input, etc.)
  - `jobs/` - Job-related components
  - `layout/` - Layout components
- `store/` - Redux store and slices
- `services/` - API service layer
- `utils/` - Utility functions and constants

### State Management

- Redux Toolkit for global state
- Local state with React hooks
- JSON Server for simulating backend

## Setup Instructions

1. **Clone the repository**

   ```bash
   git clone https://github.com/Angekarara/job-board.git
   cd job-board
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```


4. **Start the development server**

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173`
   

## Testing

Run the test suite:

```bash
npm run test
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests

## Deployment

The application is configured for easy deployment to Netlify(deployment setup currently in progress). The `_redirects` file handles client-side routing.

### Deployment Steps

1. Connect your GitHub repository to Netlify
2. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. Set environment variables in Netlify dashboard

## Contact

Ange Karara - [@AngeKarara](https://github.com/Angekarara)

Project Link: [https://github.com/Angekarara/job-board](https://github.com/Angekarara/job-board)
