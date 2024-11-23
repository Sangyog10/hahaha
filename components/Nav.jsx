"use client";

import { useState } from "react";
import SignInModal from "./Modals/SignInModal";
import SignUpModal from "./Modals/SignUpModal";


const Nav = () => {
    const [isSignInModalOpen, setSignInModalOpen] = useState(false);
    const [isSignUpModalOpen, setSignUpModalOpen] = useState(false);
    const [loggedIn, isLoggedIn] = useState(false)

    const openSignInModal = () => {
        setSignInModalOpen(true);
    };

    const closeSignInModal = () => {
        setSignInModalOpen(false);
    };

    const openSignUpModal = () => {
        setSignUpModalOpen(true);
    };

    const closeSignUpModal = () => {
        setSignUpModalOpen(false);
    };

    const handleLogout = async () => {
    };

    return (
        <nav className="flex-between w-full padding-md relative border-b-[1px] border-gray-400">
            <div className="logo-text">
                Ed<span className="text-secondary">Tech</span>
            </div>
            {!loggedIn ? (
                <>
                    <ul className="flex-between gap-8 nav-menu">
                        <li>Topics</li>
                        <li>Series</li>
                        <li>Paths</li>
                        <li>Faqs</li>
                        <li>Blogs</li>
                    </ul>
                    <div className="flex-center gap-2">
                        <button className="btn btn-secondary" onClick={openSignInModal}>
                            Sign In
                        </button>
                        <button className="btn btn-primary" onClick={openSignUpModal}>
                            Get Started For Free
                        </button>
                    </div>
                </>
            ) : (
                <div className="flex-center gap-2">
                    <button className="btn btn-secondary" onClick={handleLogout}>
                        Log Out
                    </button>
                </div>
            )}

            {isSignInModalOpen && (
                <SignInModal state={isSignInModalOpen} onClose={closeSignInModal} />
            )}

            {isSignUpModalOpen && (
                <SignUpModal state={isSignUpModalOpen} onClose={closeSignUpModal} />
            )}
        </nav>
    );
};

export default Nav;
