import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
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
      <Header />
      <main className="padding">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default App;