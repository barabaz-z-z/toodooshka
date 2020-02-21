import React, { useState } from 'react';
import './App.css';
import { Input } from './components/Input';
import { TaskCard } from './components/TaskCard';

const App: React.FC = () => {
    const [tasks, setTasks] = useState<Array<string>>([]);

    return <div>
        <h1>Toodooshka</h1>

        <Input onEnter={(text: string) => {
            setTasks([...tasks, text]);
        }}></Input>

        {tasks.map(t => {
            return <div>
                <TaskCard text={t}></TaskCard>
            </div>;
        })}
    </div>;
};

export default App;
