import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ICONS } from '@/app/assets/Assets';

const Note = ({ note = null, onClose }) => {
    const [isModal, setIsModal] = useState(true); // State to toggle between modal and full-page view
    const [noteContent, setNoteContent] = useState(note || { title: '', content: '' }); // Initialize with note data

    // Prevent background scrolling when the modal is open
    useEffect(() => {
        if (isModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = ''; // Cleanup on unmount
        };
    }, [isModal]);

    const handleFullScreenClick = () => {
        setIsModal(false);
    };

    const handleChange = (field, value) => {
        setNoteContent((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <>
            {isModal ? (
                // Modal View
                <div className="fixed inset-0 z-[10000] bg-white bg-opacity-75 flex items-center justify-center">
                    <div className="relative bg-white border-[0.3px] border-gray-400 shadow-md rounded-2xl w-[80vw]  h-[90vh] overflow-hidden">
                        {/* Header */}
                        <div className="flex items-center justify-between w-full border-b-[0.3px] border-gray-300 p-3">
                            <Image
                                src={ICONS.fullScreen}
                                alt="full screen"
                                className="w-5 h-5 cursor-pointer"
                                onClick={handleFullScreenClick}
                            />
                            <Image
                                src={ICONS.close}
                                alt="close"
                                className="w-5 h-5 cursor-pointer"
                                onClick={onClose}
                            />
                        </div>
                        {/* Content */}
                        <div className="p-4 text-white flex flex-col h-full">
                            <input
                                type="text"
                                value={noteContent.title}
                                onChange={(e) => handleChange('title', e.target.value)}
                                placeholder="Note Title"
                                className="w-full bg-transparent border-b border-gray-400 text-white mb-4 text-lg focus:outline-none"
                            />
                            <textarea
                                value={noteContent.content}
                                onChange={(e) => handleChange('content', e.target.value)}
                                placeholder="Note Content"
                                className="w-full bg-transparent border-none text-white resize-none flex-grow focus:outline-none"
                            />
                        </div>
                    </div>
                </div>
            ) : (
                // Full Page View
                <div className="w-full h-full bg-black">
                    <div className="flex items-center justify-between w-full border-b-[0.3px] border-gray-300 p-3">
                        <h1 className="text-white">Full Page Note</h1>
                        <Image
                            src={ICONS.options}
                            alt="close"
                            className="w-5 h-5 cursor-pointer"
                            onClick={onClose}
                        />
                    </div>
                    <div className="p-4 text-white">
                        <h2 className="text-lg font-bold">{noteContent.title || 'Untitled Note'}</h2>
                        <p>{noteContent.content || 'No content yet...'}</p>
                    </div>
                </div>
            )}
        </>
    );
};

export default Note;
