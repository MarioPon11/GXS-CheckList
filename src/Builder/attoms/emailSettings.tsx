import React, { useState, useRef, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import Button from '@mui/material/Button';

const EmailSettings = () => {
    const [emails, setEmails] = useState([]);
    const [editModeIndex, setEditModeIndex] = useState<number | null>(null);
    const editModeRef = useRef<string>(''); // Ref to store the original email when entering edit mode

    useEffect(() => {
        async function fetchEmails(){
            const emailData = await window.api.invoke('get-emails');
            setEmails(emailData);
        }

        fetchEmails();
    }, []);

    const handleEmailChange = (index: number, value: string) => {
        const newEmails = [...emails];
        newEmails[index] = value;
        setEmails(newEmails);
    };

    const startEditMode = (index: number) => {
        setEditModeIndex(index);
        // Store the original email when entering edit mode
        editModeRef.current = emails[index];
    };

    const cancelEditMode = () => {
        // Revert to the original email when canceling
        if (editModeIndex !== null) {
            const newEmails = [...emails];
            newEmails[editModeIndex] = editModeRef.current;
            setEmails(newEmails);
            setEditModeIndex(null);
        }
    };

    const confirmEditMode = () => {
        setEditModeIndex(null);
    };

    const removeEmail = (index: number) => {
        const newEmails = [...emails];
        newEmails.splice(index, 1);
        setEmails(newEmails);
        // Also update editModeIndex when removing an email
        if (editModeIndex === index) {
            setEditModeIndex(null);
        }
    };

    const addNewEmail = () => {
        const newEmail = 'new email';
        setEmails([...emails, newEmail]);
        // Start edit mode for the newly added email
        startEditMode(emails.length);
    };

    const isEmailValid = (email: string) => {
        return email.endsWith('@gmail.com');
    };

    return (
        <div>
            {emails.map((email, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {editModeIndex === index ? (
                        <TextField
                            label="Email"
                            variant="standard"
                            value={email}
                            onChange={(e) => handleEmailChange(index, e.target.value)}
                            error={!isEmailValid(email)}
                            helperText={!isEmailValid(email) ? 'Must end with @gmail.com' : ''}
                        />
                    ) : (
                        <Typography>{email}</Typography>
                    )}
                    {editModeIndex === index ? (
                        <>
                            <IconButton color="primary" onClick={confirmEditMode}>
                                <CheckIcon />
                            </IconButton>
                            <IconButton color="primary" onClick={cancelEditMode}>
                                <CloseIcon />
                            </IconButton>
                        </>
                    ) : (<>
                        <IconButton color="primary" onClick={() => startEditMode(index)}>
                            <EditIcon />
                        </IconButton>
                        <IconButton color="error" onClick={() => removeEmail(index)}>
                            <CloseIcon />
                        </IconButton>
                    </>
                    )}
                </Box>
            ))}
            <Button
                variant="outlined"
                fullWidth
                onClick={addNewEmail}
                sx={{ marginTop: 1 }}
            >
                Add Email
            </Button>
        </div>
    );
};

export default EmailSettings;
