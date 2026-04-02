import React from "react";
import {Link}  from "react-router";


const Navbar: React.FC = () => {
    return(
        <nav className="navbar">
            <Link to="/">
            <p className="text-3xl font-bold text-gradient">Resume Analyzer</p>
            </Link>
            <Link to="/upload" className="primary-button w-fit">
            Upload Resume
            </Link>
        </nav>
    )
}
export default Navbar;