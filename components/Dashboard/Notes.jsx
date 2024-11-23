"use client";

import { ICONS } from '@/app/assets/Assets';
import { LibraryBooks } from '@mui/icons-material';
import Image from 'next/image';
import React, { useState } from 'react';
import Note from '@/components/Note/Note'; // Import the Note component

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
];

const Notes = () => {
    const [isNoteOpen, setIsNoteOpen] = useState(false); // Controls modal visibility
    const [currentNote, setCurrentNote] = useState(null); // Tracks the currently opened note

    // Function to open a specific note or create a new one
    const openNote = (note = null) => {
        setCurrentNote(note); // Set the selected note or create a new one
        setIsNoteOpen(true);
    };

    // Function to close the modal
    const closeNote = () => {
        setIsNoteOpen(false);
        setCurrentNote(null);
    };

    return (
        <div className="w-full flex flex-col items-start gap-3">
            <div className="flex items-center w-100 justify-between">
                <span className="text-lg text-dark font-semibold">Your Notes</span>
            </div>
            <div className="flex items-between flex-col gap-3 w-full">
                {notes.map((note, index) => (
                    <div key={index} className="flex items-center gap-2 justify-between">
                        <div className="flex items-center gap-2">
                            <div className="bg-accent size-10 rounded-full shadow-md flex items-center justify-center">
                                <LibraryBooks className="size-8 text-white" />
                            </div>
                            <div className="flex flex-col gap-0">
                                <p className="text-dark font-medium font-poppins">{note.title}</p>
                                <span className="text-sm text-gray-600 font-light">{note.description}</span>
                            </div>
                        </div>
                        <button
                            className="btn btn-tertiary"
                            onClick={() => openNote(note)} // Pass the specific note to open
                        >
                            Open
                        </button>
                    </div>
                ))}
                <div className="text-secondary text-sm flex items-center gap-1 justify-end">
                    <span>View all notes</span>
                    <Image src={ICONS.arrowRight} className="size-4" alt="view all" />
                </div>
                <button
                    className="btn btn-primary mt-4"
                    onClick={() => openNote()} // Create a new note (no data passed)
                >
                    Create New Note
                </button>
            </div>

            {/* Render the Note modal conditionally */}
            {isNoteOpen && (
                <Note
                    note={currentNote} // Pass the selected note or null for a new note
                    onClose={closeNote} // Close function
                />
            )}
        </div>
    );
};

export default Notes;
