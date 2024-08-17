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

export default [
    {
      path: "/",
      element: <App />,
      // errorElement: <Error />,
      children: [
        {
          index: true,
          loader: async () => redirect('/place-ticket'),
        },
        {
          path: 'place-ticket',
          element: <PlaceTicketBusId />,
          children: [
            {
              path: 'bus/:busid',
              element: <PlaceTicketBusId />
            }
          ]
        },
        {
          path: 'bus/scan',
          element: <QRBusIdReader />
        },
        {
          path: 'tickets',
          element: <TicketList />
        },
        {
          path: 'tickets/:ticketid',
          element: <TicketPage />
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