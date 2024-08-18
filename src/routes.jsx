import { redirect } from "react-router-dom";
import App from './App.jsx'
import AuthPage from './components/AuthPage.jsx'
import LoginPage from './components/LoginPage.jsx';
import SignInPage from './components/SignInPage.jsx';
import PlaceTicketBusId from './components/PlaceTicketBusId.jsx';
import TicketList from './components/TicketList.jsx';
import Error from "./components/Error.jsx";
import TicketPage from "./components/TicketPage.jsx";
import QRBusIdReader from "./components/QRBusIdReader.jsx";
import QRTicketReader from "./components/QRTicketReader.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

const passengerRoutes = [
  {
    index: true,
    loader: async () => redirect('place-ticket')
  },
  {
    path: 'place-ticket',
    element: <ProtectedRoute element={<PlaceTicketBusId />} allowedRoles={['passenger']} />,
    children: [
      {
        path: ':busid',
        element: <ProtectedRoute element={<PlaceTicketBusId />} allowedRoles={['passenger']} />,
      },
    ]
  },
  {
    path: 'bus/scan',
    element: <ProtectedRoute element={<QRBusIdReader />} allowedRoles={['passenger']} />,
  },
  {
    path: 'tickets',
    element: <ProtectedRoute element={<TicketList />} allowedRoles={['passenger']} />,
  },
  {
    path: 'tickets/:ticketid',
    element: <ProtectedRoute element={<TicketPage />} allowedRoles={['passenger']} />,
  },
];

// Conductor Routes
const conductorRoutes = [
  {
    index: true,
    loader: async () => redirect('ticket/scan')
  },
  {
    path: 'ticket/scan',
    element: <ProtectedRoute element={<QRTicketReader />} allowedRoles={['conductor']} />,
  },
  {
    path: 'tickets/:ticketid',
    element: <ProtectedRoute element={<TicketPage />} allowedRoles={['conductor']} />,
  },
];

// Auth Routes
const authRoutes = [
  {
    path: "auth",
    element: <AuthPage />,
    children: [
        {
          index: true,
          loader: async () => redirect('login')
        },
        {
          path: 'login',
          element: <LoginPage />
        },
        {
          path: 'signin',
          element: <SignInPage />
        }
    ]
  },
];

// Combine Routes
export default [
  {
    path: "/",
    element: <ProtectedRoute element={<App />} allowedRoles={['conductor', 'passenger']} />,
    errorElement: <Error />,
    children: [
      {
        path: 'passenger',
        children: passengerRoutes
      },
      {
        path: 'conductor',
        children: conductorRoutes
      }
    ]
  },
  ...authRoutes,
];