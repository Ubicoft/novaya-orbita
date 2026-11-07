import { Outlet } from "react-router-dom";
import { WinterAtmosphere } from "../atmosphere/WinterAtmosphere";
import { Footer } from "./Footer";
import { Header } from "./Header";

export function PageShell() {
  return (
    <div className="page-shell">
      <WinterAtmosphere />
      <Header />
      <main id="main" className="page-shell__main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
