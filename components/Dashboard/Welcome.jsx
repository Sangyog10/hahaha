"use client"
import { ICONS } from '@/app/assets/Assets'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'  // Import useRouter for Next.js navigation

const Welcome = () => {
    const [greeting, setGreeting] = useState('')
    const [messageToSend, setMessageToSend] = useState('') // Track the message to send to Chat
    const router = useRouter()  // Initialize router for navigation

    useEffect(() => {
        const date = new Date()
        const hours = date.getHours()
        if (hours >= 0 && hours < 12) {
            setGreeting('Good Morning')
        } else if (hours >= 12 && hours < 18) {
            setGreeting('Good Afternoon')
        } else {
            setGreeting('Good Evening')
        }
    }, [])

    const handleTagClick = (message) => {
        // Set the message when the tag is clicked
        setMessageToSend(message)
        navigateToChat(message)  // Navigate with the message
    }

    const handleSearchInput = (e) => {
        // Set the message when the search input changes
        setMessageToSend(e.target.value)
    }

    const navigateToChat = (message) => {
        // Use Next.js router.push to navigate and pass message as a query parameter
        router.push({
            pathname: '/chat',  // The path to your Chat page
            query: { message: message }  // Pass the message as query parameter
        })
    }

    return (
        <div className='w-full p-4 flex flex-col gap-3'>
            <div className="flex flex-col">
                <h2 className="text-dark ">
                    {greeting},<span className='text-gradient font-jetbrains'>Prayush!</span>
                </h2>
                <span className="text-dark text-lg">What would you like to learn today?</span>
            </div>

            {/* Tag to trigger message */}
            <div className="flex items-center gap-2">
                <div
                    className="tag flex items-center gap-2 cursor-pointer"
                    onClick={() => handleTagClick("How can I learn Frontend?")} // Send predefined message
                >
                    <Image src={ICONS.starsFall} alt='star' className='size-6' />
                    <span>How can I learn Frontend?</span>
                </div>
            </div>

            {/* Search box */}
            <div className="search-container relative">
                <input
                    type="text"
                    className='w-100 border-[0.3px] py-3 px-2 border-gray-400 bg-transparent'
                    placeholder='How can I...'
                    value={messageToSend} // Bind value to the message state
                    onChange={handleSearchInput} // Update the message as the user types
                />
                <Image
                    src={ICONS.chevronRight}
                    alt="go"
                    className='size-8 absolute top-[50%] translate-y-[-50%] right-2 bg-transparent cursor-pointer'
                    onClick={() => navigateToChat(messageToSend)} // Navigate with the input message
                />
            </div>
        </div>
    )
}

export default Welcome
