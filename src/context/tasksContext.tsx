// TaskContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface TaskContextProps {
    children: ReactNode;
}

interface TaskData {
    name: string;
    values: string[];
}

interface TaskContextValue {
    tasks: TaskData[]; // Replace 'string[]' with the actual type of your tasks
    setTasks: React.Dispatch<React.SetStateAction<TaskData[]>>; // Replace 'string[]' accordingly
}

const TaskContext = createContext<TaskContextValue | undefined>(undefined);

const TaskProvider: React.FC<TaskContextProps> = ({ children }) => {
    const [tasks, setTasks] = useState<TaskData[]>([]); // Replace 'string[]' accordingly

    return (
        <TaskContext.Provider value={{ tasks, setTasks }}>
            {children}
        </TaskContext.Provider>
    );
};

const useTaskContext = (): TaskContextValue => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error('useTaskContext must be used within a TaskProvider');
    }
    return context;
};

export { TaskProvider, useTaskContext };
