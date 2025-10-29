import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";


export default function MainLayout() {
    return (
        <div className="flex flex-col min-h-screen">

            <Header />
            <main className="flex-1 w-full mx-auto pt-[88px] sm:pt-[154px]  ">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
