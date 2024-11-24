"use client";

import { Toast } from "flowbite-react";
import { HiCheckCircle, HiXCircle, HiInformationCircle, HiFire } from "react-icons/hi";

export default function AlertToast({ type = "info", message, onClose }) {
    const iconStyles = {
        success: {
            icon: <HiCheckCircle className="h-5 w-5" />,
            bgClass: "bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200",
        },
        error: {
            icon: <HiXCircle className="h-5 w-5" />,
            bgClass: "bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200",
        },
        info: {
            icon: <HiInformationCircle className="h-5 w-5" />,
            bgClass: "bg-blue-100 text-blue-500 dark:bg-blue-800 dark:text-blue-200",
        },
        custom: {
            icon: <HiFire className="h-5 w-5" />,
            bgClass: "bg-cyan-100 text-cyan-500 dark:bg-cyan-800 dark:text-cyan-200",
        },
    };

    const { icon, bgClass } = iconStyles[type] || iconStyles.info;

    return (
        <div className="fixed bottom-4 right-4 z-50"> {/* Positioning Toast at bottom right */}
            <Toast>
                <div className="flex items-center">
                    <div className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${bgClass}`}>
                        {icon}
                    </div>
                    <div className="ml-4 text-sm font-normal">{message}</div>
                    <Toast.Toggle onClick={onClose} className="flex items-center justify-center" />
                </div>
            </Toast>
        </div>
    );
}
