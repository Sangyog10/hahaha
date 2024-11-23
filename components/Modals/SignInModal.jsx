"use client";
import { useState } from "react";
import { ICONS } from "@/app/assets/Assets";
import Image from "next/image";
import { redirect } from "next/navigation";
import { handleLogin } from "@/app/auth/Login";



const SignInModal = ({ state, onClose }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({ email: "", password: "" });
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setErrors((prevErrors) => ({
            ...prevErrors,
            email: emailRegex.test(value) ? "" : "Please enter a valid email address.",
        }));
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
        setErrors((prevErrors) => ({
            ...prevErrors,
            password: value.length >= 6 ? "" : "Password must be at least 6 characters long.",
        }));
    };

    const togglePasswordVisibility = () => {
        setIsPasswordVisible((prev) => !prev);
    };

    const handleSignIn = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const data = await handleLogin(email, password);
        console.log(data);
        if (data?.error) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                email: data.error,
            }));
        } else {
            redirect("/dashboard");
        }
        setIsLoading(false);
    };


    return (
        <>
            {state && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="modal-content animate-slide-up rounded-lg relative bg-white drop-shadow-2xl border-2 flex flex-col gap-10 md:w-[550px]  text-dark padding-lg z-60">
                        <div className="modal-header flex items-center justify-center">
                            <h2>Sign In</h2>
                            <button onClick={onClose} className="absolute top-2 right-4">
                                <Image
                                    src={ICONS.crossWhite}
                                    className="size-8 bg-danger rounded-md"
                                    alt="Close"
                                />
                            </button>
                        </div>

                        <form className="modal-body flex flex-col items-center gap-8 w-full" onSubmit={handleSignIn}>
                            <div className="w-full">
                                <input
                                    type="email"
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

                            <div className="flex flex-col gap-3 w-full">
                                <button className="btn btn-primary w-full py-5 h-[50px]" type="submit">Sign In</button>
                            </div>


                            {/* Links */}
                            <div className="flex w-full items-center justify-between">
                                <p className="text-secondary text-[12px]">Forgot Your Password?</p>
                                <p className="text-secondary text-[12px]">Sign Up</p>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default SignInModal;
