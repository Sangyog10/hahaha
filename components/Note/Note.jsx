import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ICONS } from "@/app/assets/Assets";
import MarkdownEditor from "@/components/Utilities/MarkdownEditor";

const Note = ({
    note = null, // Note data
    onClose, // Callback to close the modal or full-page view
    isEdit = false, // Determines if the note is in edit mode
    isModal = true, // Determines if the note is shown as a modal
}) => {
    const [isFullPage, setIsFullPage] = useState(!isModal); // Tracks modal or full-page view
    const [noteContent, setNoteContent] = useState(note || { title: "", content: "" }); // Tracks note data

    // Prevent background scrolling in modal mode
    useEffect(() => {
        if (isFullPage || !isModal) {
            document.body.style.overflow = "";
        } else {
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.body.style.overflow = ""; // Cleanup on unmount
        };
    }, [isFullPage, isModal]);

    const handleFullScreenClick = () => {
        setIsFullPage(true);
    };

    return (
        <>
            {!isFullPage ? (
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
                        {/* MarkdownEditor in Modal */}
                        <div className="p-4 h-full">
                            <MarkdownEditor
                                title={noteContent.title}
                                content={noteContent.content}
                                isEdit={isEdit}
                                onClose={onClose}
                            />
                        </div>
                    </div>
                </div>
            ) : (
                // Full-Page View
                <div className="w-full h-full bg-white">
                    <div className="flex items-center justify-between w-full border-b-[0.3px] border-gray-300 p-3">
                        <h1 className="text-dark">Full Page Note</h1>
                        <Image
                            src={ICONS.close}
                            alt="close"
                            className="w-5 h-5 cursor-pointer"
                            onClick={onClose}
                        />
                    </div>
                    {/* MarkdownEditor in Full-Page View */}
                    <div className="p-4">
                        <MarkdownEditor
                            title={noteContent.title}
                            content={noteContent.content}
                            isEdit={isEdit}
                            onClose={onClose}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default Note;
