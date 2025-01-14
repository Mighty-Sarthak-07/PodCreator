import React, { useState } from 'react';
import { ImCross } from "react-icons/im";
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const [Nav, setNav] = useState(false);

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Categories", path: "/categories" },
        { name: "All Podcasts", path: "/all-podcasts" },
    ];

    return (
        <nav className="px-4 md:px-8 lg:px-12 py-4 font-verdana">
            <div className="flex items-center justify-between relative">
                <div className="logo">
                    <Link to="/" className="flex items-center gap-3 text-2xl lg:text-3xl font-bold">
                        <img
                            src="https://www.ecfchurch.org/wp-content/uploads/2019/01/Podcast-icon.png"
                            className="w-10 h-10"
                            alt="PodCreator Logo"
                        />
                        <h1>PodCreator</h1>
                    </Link>
                </div>

                <div className="hidden lg:flex gap-8 items-center font-medium text-lg">
                    {navLinks.map((item, i) => (
                        <Link
                            key={i}
                            to={item.path}
                            className="hover:font-bold transition-all duration-300"
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                <div className="hidden lg:flex gap-4 items-center">
                    {!isLoggedIn ? (
                        <>
                            <Link
                                to="/login"
                                className="px-6 py-2 text-sm border border-gray-800 rounded-lg font-semibold transition hover:bg-gray-800 hover:text-white"
                            >
                                Login
                            </Link>
                            <Link
                                to="/signup"
                                className="px-6 py-2 text-sm bg-black text-white rounded-lg font-semibold transition hover:bg-gray-700"
                            >
                                Sign Up
                            </Link>
                        </>
                    ) : (
                        <Link
                            to="/profile"
                            className="px-6 py-2 text-sm bg-black text-white rounded-lg font-semibold transition hover:bg-gray-700"
                        >
                            Profile
                        </Link>
                    )}
                </div>

                <div className="lg:hidden">
                    <button
                        className="text-3xl focus:outline-none transition-transform duration-300"
                        onClick={() => setNav(!Nav)}
                    >
                        {Nav ? <ImCross /> : <PiDotsThreeOutlineFill />}
                    </button>
                </div>
            </div>

            <div
                className={`fixed top-0 left-0 w-full h-screen bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 z-40 transform ${Nav ? "translate-y-0" : "-translate-y-full"} transition-transform duration-500 ease-in-out`}
            >
                <div className="flex justify-end p-4">
                    <button
                        className="text-2xl text-white focus:outline-none"
                        onClick={() => setNav(false)}
                    >
                        <ImCross />
                    </button>
                </div>

                <div className="flex flex-col items-center gap-8 mt-16 text-white text-2xl font-semibold">
                    {navLinks.map((item, i) => (
                        <Link
                            key={i}
                            to={item.path}
                            className="hover:scale-110 my-2 hover:font-bold transition-transform duration-300 shadow-lg px-4 py-2 bg-white text-4xl text-purple-700 rounded-lg"
                            onClick={() => setNav(false)}
                        >
                            {item.name}
                        </Link>
                    ))}

                    {!isLoggedIn ? (
                        <>
                            <Link
                                to="/login"
                                className="px-8 py-3 my-2 text-4xl bg-white text-purple-700 rounded-lg font-semibold transition hover:scale-110 hover:bg-purple-700 hover:text-white"
                                onClick={() => setNav(false)}
                            >
                                Login
                            </Link>
                            <Link
                                to="/signup"
                                className="px-8 py-3 text-4xl my-2 bg-white text-purple-700 rounded-lg font-semibold transition hover:scale-110 hover:bg-purple-700 hover:text-white"
                                onClick={() => setNav(false)}
                            >
                                Sign Up
                            </Link>
                        </>
                    ) : (
                        <Link
                            to="/profile"
                            className="px-8 py-3 text-4xl my-2 bg-white text-purple-700 rounded-lg font-semibold transition hover:scale-110 hover:bg-purple-700 hover:text-white"
                            onClick={() => setNav(false)}
                        >
                            Profile
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
