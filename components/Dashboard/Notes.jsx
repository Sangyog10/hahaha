"use client";

import { ICONS } from "@/app/assets/Assets";
import { LibraryBooks, Add } from "@mui/icons-material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Note from "@/components/Note/Note"; // Import the Note component
import { getAllNotes } from "../../app/auth/note"; // Update with correct import for getAllNotes
import Link from "next/link"; // Import Link for navigation to "View All" page

const Notes = () => {
    const [notes, setNotes] = useState([]); // Notes fetched from the API
    const [isNoteOpen, setIsNoteOpen] = useState(false); // Controls modal visibility
    const [currentNote, setCurrentNote] = useState(null); // Tracks the currently opened note

    // Fetch notes when the component mounts
    useEffect(() => {
        const fetchNotes = async () => {
            const data = await getAllNotes();
            if (!data.error) {
                setNotes(data || []); // Update notes from the fetched data
            } else {
                console.error(data.error);
            }
        };
        fetchNotes();
    }, []);

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
            {/* Header */}
            <div className="flex items-center w-full justify-between">
                <span className="text-lg text-dark font-semibold">Your Notes</span>

                {/* View All Button */}
                <Link href="/notes" className="text-primary text-sm font-medium cursor-pointer">
                    View All
                </Link>

                {/* Add New Note Button */}
                <Add
                    className="text-primary cursor-pointer"
                    onClick={() => openNote()} // Create a new note (no data passed)
                />
            </div>

            {/* Notes List */}
            <div
                className="flex flex-col gap-3 w-full max-h-[200px] overflow-y-auto"
                style={{ scrollbarWidth: "thin", scrollbarColor: "#ccc #f9f9f9" }} // Customize scrollbar
            >
                {notes.slice(0, 3).map((note) => (
                    <div key={note._id} className="flex items-center gap-2 justify-between">
                        <div className="flex items-center gap-2">
                            <div className="bg-accent size-10 rounded-full shadow-md flex items-center justify-center">
                                <LibraryBooks className="size-8 text-white" />
                            </div>
                            <div className="flex flex-col gap-0">
                                <p className="text-dark font-medium font-poppins">{note.title}</p>
                                <span className="text-sm text-gray-600 font-light">
                                    {note.content.length > 30
                                        ? `${note.content.slice(0, 30)}...`
                                        : note.content}
                                </span>
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
            </div>

            {/* Create New Note Button at the bottom */}
            <div className="mt-4 flex justify-center w-full">
                <button
                    className="btn btn-primary flex items-center gap-2"
                    onClick={() => openNote()} // Create a new note (no data passed)
                >
                    <Add className="text-white" />
                    Create a New Note
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
