import React from "react";
import {Link}  from "react-router";


const Navbar: React.FC = () => {
    return(
        <nav className="navbar">
            <Link to="/">
            <p className="text-3xl font-bold text-gradient">Resume Analyzer</p>
            </Link>
            <Link to="/upload" className="primary-button w-fit !bg-violet-600 !text-white !font-bold !border-none !shadow-lg !shadow-violet-600/50 hover:!bg-violet-700 hover:!shadow-violet-600/70 hover:-translate-y-0.5 transition-all duration-300">
            Upload Resume
            </Link>
        </nav>
    )
}
export default Navbar;