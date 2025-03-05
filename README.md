# Authenticator Frontend

A modern React application with authentication features, built with Vite, React Router, and Axios for seamless API integration.

## Features

- ⚛️ Modern React 18 with hooks
- 🎨 Beautiful, responsive UI design
- 🔐 User authentication with JWT tokens
- 📝 User registration and login forms
- 🛡️ Protected routes with authentication guards
- 🔄 Automatic token management
- 📱 Mobile-friendly responsive design
- ⚡ Fast development with Vite

## Tech Stack

- **React 18** - UI library
- **React Router** - Client-side routing
- **Vite** - Build tool and dev server
- **Axios** - HTTP client for API requests
- **Context API** - State management for authentication

## Installation

### Prerequisites

- Node.js 16 or higher
- npm or yarn

### Setup

1. Clone the repository:
```bash
git clone https://github.com/Super-Dev-0325/Authenticator.git
cd Authenticator
```

2. Install dependencies:
```bash
npm install
```

3. (Optional) Configure API URL in `.env`:
```env
VITE_API_URL=http://localhost:8000
```

## Running the Application

### Development Mode

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Production Build

Build for production:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Project Structure

```
frontend/
├── src/
│   ├── components/          # React components
│   │   ├── Login.jsx        # Login form component
│   │   ├── Register.jsx     # Registration form component
│   │   ├── Dashboard.jsx    # Protected dashboard component
│   │   ├── Auth.css         # Authentication form styles
│   │   └── Dashboard.css    # Dashboard styles
│   ├── context/             # React context providers
│   │   └── AuthContext.jsx  # Authentication context
│   ├── services/            # API services
│   │   └── api.js           # Axios API client
│   ├── App.jsx              # Main app component
│   ├── App.css              # App styles
│   ├── main.jsx             # Application entry point
│   └── index.css            # Global styles
├── index.html               # HTML template
├── vite.config.js           # Vite configuration
├── package.json             # Dependencies and scripts
└── README.md                # This file
```

## Features Overview

### Authentication Flow

1. **Registration**: Users can create a new account with email, username, and password
2. **Login**: Users authenticate with username and password to receive a JWT token
3. **Token Storage**: Tokens are stored in localStorage for persistence
4. **Protected Routes**: Dashboard and other protected routes require authentication
5. **Auto-logout**: Users are automatically logged out when tokens expire

### Components

#### Login Component
- Username and password input fields
- Form validation
- Error handling and display
- Link to registration page

#### Register Component
- Email, username, and password fields
- Password confirmation
- Password strength validation (minimum 6 characters)
- Automatic login after successful registration

#### Dashboard Component
- Displays current user information
- Protected route (requires authentication)
- Logout functionality

### Authentication Context

The `AuthContext` provides:
- `user` - Current user object
- `isAuthenticated` - Authentication status
- `loading` - Loading state
- `login(username, password)` - Login function
- `register(email, username, password)` - Registration function
- `logout()` - Logout function

## Configuration

### Environment Variables

Create a `.env` file in the frontend directory:

```env
VITE_API_URL=http://localhost:8000
```

### API Integration

The frontend communicates with the backend API through the `api.js` service file. The API base URL can be configured via the `VITE_API_URL` environment variable.

### CORS

Ensure the backend CORS settings include your frontend URL:
- Development: `http://localhost:3000`
- Production: Your production domain

## Routing

The application uses React Router with the following routes:

- `/` - Redirects to `/dashboard`
- `/login` - Login page (redirects to dashboard if authenticated)
- `/register` - Registration page (redirects to dashboard if authenticated)
- `/dashboard` - Protected dashboard page (requires authentication)

## Styling

The application uses CSS modules with a modern, gradient-based design:
- Gradient backgrounds
- Card-based layouts
- Smooth transitions and hover effects
- Responsive design for mobile devices

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Code Style

This project follows React best practices:
- Functional components with hooks
- Context API for state management
- Component-based architecture
- Separation of concerns (components, services, context)

## Security Considerations

⚠️ **Important Notes:**

1. **Token Storage**: Tokens are stored in localStorage. For enhanced security, consider using httpOnly cookies
2. **HTTPS**: Always use HTTPS in production
3. **Token Expiration**: Tokens expire after 30 minutes (configurable in backend)
4. **Input Validation**: Client-side validation is provided, but backend validation is essential
5. **XSS Protection**: Be cautious when rendering user input

## Troubleshooting

### Common Issues

**CORS Errors**
- Ensure backend CORS settings include your frontend URL
- Check that the backend server is running

**Authentication Not Working**
- Verify the API URL is correct in `.env`
- Check browser console for errors
- Ensure tokens are being stored in localStorage

**Build Errors**
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check Node.js version compatibility

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For issues and questions, please open an issue on the [GitHub repository](https://github.com/Super-Dev-0325/Authenticator/issues).

## Related Projects

- [Authenticator Backend](https://github.com/Super-Dev-0325/Authenticator-BE) - FastAPI backend for this authentication system

