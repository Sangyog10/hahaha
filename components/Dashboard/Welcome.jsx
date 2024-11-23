"use client"
import { ICONS } from '@/app/assets/Assets'
import React from 'react'
import { useEffect, useState } from 'react'
import Image from 'next/image'

const Welcome = () => {
    const [greeting, setGreeting] = useState('')
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



    return (
        <div className='w-full p-4 flex flex-col gap-3'>
            <div className="flex flex-col">
                <h2 className="text-dark ">
                    {greeting},<span className='text-gradient font-jetbrains'>Prayush!</span>
                </h2>
                <span className=" text-dark text-lg">What would you like to learn today?</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="tag flex items-center gap-2 cursor-pointer">
                    <Image src={ICONS.starsFall} alt='star' className='size-6' />
                    <span>How can I learn Frontend?</span>
                </div>
            </div>
            <div className="search-container relative">
                <input type="text" className='w-100 border-[0.3px] border-gray-400 bg-transparent' placeholder='How can I...' />
                <Image src={ICONS.chevronRight} alt="go" className='size-8 absolute top-[50%] translate-y-[-50%] right-2 bg-transparent cursor-pointer' />
            </div>
        </div>
    )
}

export default Welcome
