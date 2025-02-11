import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Root() {
  return (
    <div className="font-montserrat">
      <header className="mx-auto w-11/12 py-4">
        <Navbar />
      </header>
      <main className="mx-auto min-h-[calc(100vh-324px)] w-11/12 2xl:container">
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default Root;
