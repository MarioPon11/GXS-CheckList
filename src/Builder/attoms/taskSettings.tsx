import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import { Paper } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import TextField from '@mui/material/TextField';

const BoxStyles = {
    overflowY: 'scroll',
    paddingRight: 1,
    '&::-webkit-scrollbar': {
        width: '10px',
    },
    '&::-webkit-scrollbar-thumb': {
        background: '#888',
        borderRadius: '5px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
        background: '#555',
    },
    '&::-webkit-scrollbar-track': {
        background: '#f1f1f1',
        borderRadius: '10px',
    },
}

const TaskSettings = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        async function fetchTasks() {
            const taskData = await window.api.invoke('get-data');
            if (!taskData) {
                return;
            }

            setTasks(taskData);
        }

        fetchTasks();
    }, [])

    const editableTaskIndex = useRef(null);
    const editedTask = useRef({ name: '', values: [] });

    const toggleEdit = (index: number) => {
        if (editableTaskIndex.current === null) {
            editableTaskIndex.current = index;
            editedTask.current = { ...tasks[index] };
        } else if (editableTaskIndex.current === index) {
            editableTaskIndex.current = null;
            editedTask.current = { ...tasks[index] };
        } else {
            editableTaskIndex.current = index;
            editedTask.current = { ...tasks[index] };
        }

        setTasks([...tasks]);
    }

    const addTask = () => {
        const newTask = {
            name: `Task ${tasks.length + 1}`,
            values: ['click edit to edit task'],
        };
        setTasks([...tasks, newTask]);
    };

    const deleteTask = (index: number) => {
        const updatedTasks = [...tasks];
        updatedTasks.splice(index, 1);
        setTasks(updatedTasks);
    };

    const saveTask = () => {
        // Save the edited task and reset editing state
        tasks[editableTaskIndex.current] = { ...editedTask.current };
        editableTaskIndex.current = null;
        setTasks([...tasks]);
    };

    const cancelEdit = (index: number) => {
        // Cancel editing for the specified task
        editableTaskIndex.current = null;
        setTasks([...tasks]);
    };


    return (
        <Box maxHeight={'395px'} sx={BoxStyles}>
            {
                tasks.map((task, index) => (
                    <Card key={index} sx={{ marginBottom: 2 }} variant="outlined">
                        <CardContent>
                            {editableTaskIndex.current === index ? (
                                <React.Fragment>
                                    <TextField
                                        label="Task Title"
                                        value={editedTask.current.name}
                                        onChange={(e) => {
                                            editedTask.current = { ...editedTask.current, name: e.target.value };
                                            setTasks([...tasks]);
                                        }}
                                        sx={{ marginBottom: 1 }}
                                        fullWidth
                                    />
                                    <TextField
                                        label="Task Values"
                                        multiline
                                        value={editedTask.current.values.join('\n')}
                                        onChange={(e) => {
                                            editedTask.current = {
                                                ...editedTask.current,
                                                values: e.target.value.split('\n'),
                                            };
                                            setTasks([...tasks]);
                                        }}
                                        fullWidth
                                    />
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                    <Typography variant="h6" sx={{ marginBottom: 1 }}>
                                        {task.name}
                                    </Typography>
                                    <Stack component={Paper} sx={{ padding: 2 }}>
                                        {task.values.map((value: string, idx: number) => (
                                            <Box key={idx}>- {value}</Box>
                                        ))}
                                    </Stack>
                                </React.Fragment>
                            )}
                        </CardContent>
                        <CardActions>
                            {editableTaskIndex.current === index ? (
                                <React.Fragment>
                                    <Button size="small" onClick={saveTask}>
                                        Save
                                    </Button>
                                    <Button size="small" onClick={() => cancelEdit(index)}>
                                        Cancel
                                    </Button>
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                    <Button size="small" onClick={() => toggleEdit(index)} startIcon={<EditIcon />}>
                                        Edit
                                    </Button>
                                    <Button size="small" color="error" onClick={() => deleteTask(index)} startIcon={<DeleteIcon />}>
                                        Delete
                                    </Button>
                                </React.Fragment>
                            )}
                        </CardActions>
                    </Card>
                ))
            }
            <Button variant="outlined" sx={{ marginTop: 2 }} fullWidth startIcon={<AddIcon />} onClick={addTask}>Add Task</Button>
        </Box>
    )
}

export default TaskSettings;