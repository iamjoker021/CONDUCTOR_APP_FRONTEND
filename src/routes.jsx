import App from './App.jsx'
import AuthPage from './components/AuthPage/AuthPage.jsx'
import LoginPage from './components/LoginPage/LoginPage.jsx';
import SignInPage from './components/SignInPage/SignInPage.jsx';
import PlaceTicketBusId from './components/PlaceTicketBusId/PlaceTicketBusId.jsx';
import { redirect } from "react-router-dom";

export default [
    {
      path: "/",
      element: <App />,
      children: [
        {
          index: true,
          loader: async () => redirect('/place-ticket'),
        },
        {
          path: 'place-ticket',
          element: <PlaceTicketBusId />
        }
      ]
    },
    {
      path: "auth",
      element: <AuthPage />,
      children: [
        {
          index: true,
          element: <LoginPage />
        },
        {
          path: 'signin',
          element: <SignInPage />
        }
      ]
    },
]