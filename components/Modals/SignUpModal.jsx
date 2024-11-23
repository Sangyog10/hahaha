"use-client"

import { useState } from "react";
import { ICONS } from "@/app/assets/Assets";
import Image from "next/image";

const SignUpModal = ({ state, onClose }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({ name: "", email: "", password: "" });
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [role, setRole] = useState("student");


    const handleNameChange = (e) => {
        const value = e.target.value;
        setName(value);

        // Simple validation to check if name is not empty
        setErrors((prevErrors) => ({
            ...prevErrors,
            name: value ? "" : "Please enter your name."
        }));
    };


    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setErrors((prevErrors) => ({
            ...prevErrors,
            email: emailRegex.test(value) ? "" : "Please enter a valid email address."
        }));
    };

    const toggleRole = () => {
        setRole((prevRole) => prevRole === "student" ? "instructor" : "student");
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
    }

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);

        // Validate password length
        setErrors((prevErrors) => ({
            ...prevErrors,
            password: value.length >= 6 ? "" : "Password must be at least 6 characters long."
        }));
    };

    const togglePasswordVisibility = () => {
        setIsPasswordVisible((prev) => !prev);
    };

    return (
        <>
            {state && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="modal-content animate-slide-up rounded-lg bg-white drop-shadow-2xl border-2  relative flex flex-col gap-10 md:w-[550px]   padding-lg z-60">
                        {/* Modal Header */}
                        <div className="modal-header flex items-center justify-center">
                            <h2>Sign Up</h2>
                            <button onClick={onClose} className="absolute top-2 right-4">
                                <Image src={ICONS.crossWhite} className="size-8 bg-danger rounded-md" alt="Close" />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <form className="modal-body flex flex-col items-center gap-8 w-full" onSubmit={handleSignUp}>
                            {/* Name Input */}
                            <div className="w-full">
                                <input
                                    type="text"
                                    placeholder="Name"
                                    className="input-field w-full"
                                    value={name}
                                    onChange={handleNameChange}
                                />
                                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                            </div>

                            {/* Email Input */}
                            <div className="w-full">
                                <input
                                    type="text"
                                    placeholder="Email"
                                    className="input-field w-full"
                                    value={email}
                                    onChange={handleEmailChange}
                                />
                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                            </div>

                            {/* Password Input */}
                            <div className="w-full relative">
                                <input
                                    type={isPasswordVisible ? "text" : "password"}
                                    placeholder="Password"
                                    className="input-field w-full"
                                    value={password}
                                    onChange={handlePasswordChange}
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute top-[50%] translate-y-[-50%] right-2 text-gray-500"
                                >
                                    <Image
                                        src={isPasswordVisible ? ICONS.eyesClosed : ICONS.eyesOpened}
                                        className="w-5 h-5"
                                        alt="Toggle visibility"
                                    />
                                </button>
                                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                            </div>


                            {/* Sign Up and OAuth Buttons */}
                            <div className="flex flex-col gap-3 w-full">
                                <button className="btn btn-primary w-full h-[50px]" type="submit">Sign Up</button>
                            </div>

                            {/* Links */}
                            <div className="flex w-full items-center justify-between">
                                <p className="text-secondary text-[12px]">Already have an account? Sign In</p>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default SignUpModal;
