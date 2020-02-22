import React, { useState } from 'react';
import './app.css';
import { Input } from './components/input';
import { TaskCard } from './components/task-card';
import { Task } from './models/task';
import { Status } from './plugins/status';

const App: React.FC = () => {
    const [tasks, setTasks] = useState<Array<Task>>([]);

    const onTaskAddingHandler = (text: string) => {
        const maxId = tasks.length
            ? tasks.map(t => t.id).reduce((id1, id2) => Math.max(id1, id2))
            : -1;
        setTasks([{ id: 1 + maxId, text, status: Status.todo }, ...tasks]);
    };
    const onTaskChangedHandler = (task: Task) => {
        setTasks([...tasks.map(t => (t.id === task.id ? task : t))]);
    };
    const onTaskRemovingHandler = (id: number) => {
        setTasks([...tasks.filter(t => t.id !== id)]);
    };

    return (
        <div>
            <h1>Toodooshka</h1>

            <Input onEnter={onTaskAddingHandler}></Input>

            {tasks.map(t => {
                return (
                    <div key={t.id}>
                        <TaskCard
                            task={t}
                            onChanged={onTaskChangedHandler}
                            onRemoving={onTaskRemovingHandler}
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default App;
