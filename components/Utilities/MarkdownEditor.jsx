import React, { useState } from 'react';
import MarkdownIt from 'markdown-it';
import doMarkdownIt from '@digitalocean/do-markdownit';
import 'tailwindcss/tailwind.css';
import { submitNote } from '../../app/auth/submitNote';
import {
    IconButton,
    TextareaAutosize,
    Card,
    CardContent,
    TextField,
    Divider,
    Tooltip,
    Button,
} from '@mui/material';
import {
    FormatBold,
    FormatItalic,
    FormatQuote,
    Code,
    List,
    Title,
    Save,
} from '@mui/icons-material';
import AlertToast from "./AlertToast";

const MarkdownEditor = ({ title: initialTitle, content: initialContent, isEdit, onClose }) => {
    const mdParser = MarkdownIt({ html: true }).use(doMarkdownIt, {});
    const [markdown, setMarkdown] = useState(initialContent || '# Welcome to Markdown Editor\n\nStart writing...');
    const [noteTitle, setNoteTitle] = useState(initialTitle || 'Markdown Editor');
    const [showToast, setShowToast] = useState(false);

    // Close the toast
    const closeToast = () => setShowToast(false);

    const insertMarkdown = (syntax) => {
        const textarea = document.getElementById('markdown-editor');
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const text = textarea.value;

        const before = text.substring(0, start);
        const after = text.substring(end, text.length);

        setMarkdown(`${before}${syntax}${after}`);
        textarea.focus();
        textarea.setSelectionRange(start + syntax.length, start + syntax.length);
    };

    const downloadContent = () => {
        console.log('Title:', noteTitle);
        console.log('Content:', markdown);

        const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${noteTitle}.md`;
        link.click();
    };

    const saveContent = async () => {
        if (!isEdit) return;

        try {
            console.log('Title:', noteTitle);
            console.log('Content:', markdown);

            const data = await submitNote(noteTitle, markdown);
            console.log('Response from API:', data);

            setShowToast(true);
        } catch (error) {
            console.error('Error saving note:', error);
        }
    };

    return (
        <div className="flex h-screen w-full">
            {showToast && (
                <AlertToast message="Note saved successfully!" type="success" onClose={closeToast} />
            )}

            {/* Editor Section */}
            <Card className="w-1/2 h-[80%] shadow-md">
                <CardContent className="h-full flex flex-col">
                    {/* Editable Title */}
                    {isEdit && (
                        <TextField
                            value={noteTitle}
                            onChange={(e) => setNoteTitle(e.target.value)}
                            placeholder="Enter the title here..."
                            variant="outlined"
                            fullWidth
                            margin="dense"
                            className="mb-4"
                        />
                    )}

                    <Divider className="mb-4" />

                    {/* Toolbar */}
                    <div className="flex gap-2 mb-4">
                        <Tooltip title="Header 1">
                            <IconButton onClick={() => insertMarkdown('# ')} color="secondary">
                                <Title />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Bold">
                            <IconButton onClick={() => insertMarkdown('**bold text**')} color="secondary">
                                <FormatBold />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Italic">
                            <IconButton onClick={() => insertMarkdown('*italic text*')} color="secondary">
                                <FormatItalic />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Blockquote">
                            <IconButton onClick={() => insertMarkdown('> ')} color="secondary">
                                <FormatQuote />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Code Block">
                            <IconButton onClick={() => insertMarkdown('```\nCode block\n```')} color="secondary">
                                <Code />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="List Item">
                            <IconButton onClick={() => insertMarkdown('- List item\n')} color="secondary">
                                <List />
                            </IconButton>
                        </Tooltip>
                    </div>

                    {/* Textarea */}
                    <TextareaAutosize
                        id="markdown-editor"
                        value={markdown}
                        onChange={(e) => setMarkdown(e.target.value)}
                        placeholder="Write your Markdown content here..."
                        className="w-full flex-grow p-4 rounded-md border focus:outline-none focus:ring-2 focus:ring-secondary"
                        minRows={15}
                    />

                    {isEdit && (
                        <Button
                            onClick={saveContent}
                            variant="contained"
                            color="secondary"
                            startIcon={<Save />}
                            className="mt-4 self-end"
                        >
                            Save
                        </Button>
                    )}
                </CardContent>
            </Card>

            {/* Preview Section */}
            <Card className="w-1/2 h-[90%] shadow-md">
                <CardContent className="h-full">
                    <TextField
                        value={noteTitle}
                        variant="outlined"
                        disabled
                        fullWidth
                        className="mb-4"
                    />

                    <Divider className="mb-4" />
                    <div
                        className="prose prose-lg max-w-none h-full overflow-auto"
                    >
                        <div
                            dangerouslySetInnerHTML={{ __html: mdParser.render(markdown) }}
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default MarkdownEditor;
