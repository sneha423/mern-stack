import React from "react";
import Header from "./components/header/Header";
import Footer from "./components/header/footer/Footer";
import { Outlet } from "react-router";
function Layout(){
    return(
        <>
        <Header/>
        <Outlet/>
        <Footer/>
        </>
    )
}
export default Layout