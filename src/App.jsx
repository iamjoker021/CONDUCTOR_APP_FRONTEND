import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { useAuthContext } from "./hooks/useAuthContext";
import { useEffect } from "react";

function App() {

  const { user } = useAuthContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user){
      navigate('/auth');
    }
  }, []);

  return (
    <>
    {user &&
    <>
    <Header />
      <main className="padding">
        <Outlet />
      </main>
    <Footer />
    </>
    }
    {!user && <p>Loading...</p>} 
    </>
  )
}

export default App;