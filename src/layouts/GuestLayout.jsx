import FooterGuest from "../components/guest/Footer";
import HeaderGuest from "../components/guest/Header";
import { Outlet } from "react-router-dom";


export default function GuestLayout() {
  return (
     <div id="app-container" className="bg-slate-300 min-h-screen flex">
          <div id="layout-wrapper" className="flex flex-row flex-1">
           
            <div id="main-content" className="flex-1 p-4">
              <HeaderGuest />
              <Outlet/>
              <FooterGuest/>
            </div>
          </div>
        </div>
  );
}
