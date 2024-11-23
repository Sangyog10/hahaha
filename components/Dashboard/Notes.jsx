"use client"

import { ICONS } from '@/app/assets/Assets'
import { LibraryBooks } from '@mui/icons-material'
import Image from 'next/image'
import React from 'react'

// mock notes array
const notes = [
    {
        title: 'Your notes on me',
        description: 'Take notes boy'
    },
    {
        title: 'Meeting notes',
        description: 'Discuss project details'
    },
    {
        title: 'Study plan',
        description: 'Prepare for the exam'
    }
]

const Notes = () => {
    return (
        <div className='w-full flex flex-col items-start gap-3'>
            <div className="flex items-center w-100 justify-between">
                <span className="text-lg text-dark font-semibold">Your Notes</span>
            </div>
            <div className="flex items-between flex-col gap-3 w-full">
                {notes.map((note, index) => (
                    <div key={index} className="flex items-center gap-2 justify-between">
                        <div className="flex items-center gap-2">
                            <div className="bg-accent size-10 rounded-full shadow-md flex items-center justify-center">
                                <LibraryBooks className='size-8 text-white' />
                            </div>
                            <div className="flex flex-col gap-0">
                                <p className='text-dark font-medium font-poppins'>{note.title}</p>
                                <span className='text-sm text-gray-600 font-light'>{note.description}</span>
                            </div>
                        </div>
                        <button className="btn btn-tertiary">
                            Open
                        </button>
                    </div>
                ))}
                <div className="text-secondary text-sm flex items-center gap-1 justify-end">
                    <span>View all notes</span>
                    <Image src={ICONS.arrowRight} className='size-4' alt='view all' />
                </div>
            </div>
        </div>
    )
}

export default Notes
