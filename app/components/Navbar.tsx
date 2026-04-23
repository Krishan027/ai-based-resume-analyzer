import React from "react";
import {Link}  from "react-router";
import ProfileMenu from "./ProfileMenu";

const Navbar: React.FC = () => {
    return(
        <nav className="navbar flex justify-between items-center w-full px-4 sm:px-8 py-4">
            <Link to="/">
            <p className="text-2xl sm:text-3xl font-bold text-gradient">Resume Analyzer</p>
            </Link>
            <div className="flex gap-3 sm:gap-4 items-center">
                <Link to="/upload" className="primary-button text-sm sm:text-base px-3 sm:px-6 w-fit !bg-violet-600 !text-white !font-bold !border-none !shadow-lg !shadow-violet-600/50 hover:!bg-violet-700 hover:!shadow-violet-600/70 hover:-translate-y-0.5 transition-all duration-300">
                Upload Resume
                </Link>
                <ProfileMenu />
            </div>
        </nav>
    )
}
export default Navbar;