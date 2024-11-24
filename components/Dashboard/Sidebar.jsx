"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation'; // Use usePathname instead of useRouter
import { ICONS } from '@/app/assets/Assets';

const Sidebar = () => {
    const pathname = usePathname(); // Get the current path

    // Define menu items with their names, paths, and associated icons
    const menuItems = [
        { name: 'Overview', path: '/dashboard', icon: ICONS.overviewBlack },
        { name: 'Courses', path: '/courses', icon: ICONS.courseBlack },
        { name: 'ChatBot', path: '/chat', icon: ICONS.chatBot },
        { name: 'Notes', path: '/notes', icon: ICONS.assignmentOutline },
        // Add more items as needed
    ];

    // Determine the active menu item based on the current path
    const activeMenu = menuItems.find((item) => pathname?.includes(item.path))?.name;

    return (
        <div className="side-bar bg-white text-dark padding-lg flex flex-col items-start justify-between">
            <div className="flex flex-col gap-12 w-full">
                <div className="logo-text">Ed<span className='text-secondary'>Tech</span></div>
                <ul className="side-menus flex flex-col gap-5 w-full">
                    {menuItems.map((item) => (
                        <li
                            key={item.name}
                            className={activeMenu === item.name ? 'active' : ''}
                        >
                            <Link href={item.path} className="flex gap-3">
                                {/* Render icon dynamically */}
                                <Image
                                    src={item.icon} // Dynamically use the correct icon for each item
                                    alt={item.name}
                                    width={24} // Specify width and height for the image
                                    height={24}
                                />
                                <span>{item.name}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <button className="text-dark text-opacity-80 w-full text-[14px] flex gap-2 items-center justify-start">
                <Image src={ICONS.logoutBlack} width={24} height={24} alt="logout" />
                <span>Logout</span>
            </button>
        </div>
    );
};

export default Sidebar;
