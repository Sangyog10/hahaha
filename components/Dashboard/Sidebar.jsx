"use client"

import Link from 'next/link';
import Image from 'next/image'; // Ensure you have Image component from next/image.
import { ICONS } from '@/app/assets/Assets';


const Sidebar = () => {
    // Define menu items with their names, paths, and associated icons
    const menuItems = [
        { name: 'Overview', path: '/dashboard', icon: ICONS.overviewBlack },
        { name: 'Courses', path: '/courses', icon: ICONS.courseBlack },
        { name: 'ChatBot', path: '/chat', icon: ICONS.chatBot },
        // Add more items as needed
    ];

    // get the current active menu item from the URL
    const activeMenu = menuItems.find((item) => window.location.pathname.includes(item.path))?.name;

    return (
        <div className="side-bar padding-lg flex flex-col items-start justify-between">
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
            <button className="text-dark text-opacity-80 w-full text-[14px] flex gap-2 items-center justify-start"

            >
                <Image src={ICONS.logoutBlack} width={24} alt="logout" />
                <span>Logout</span>
            </button>
        </div>
    );
};

export default Sidebar;
