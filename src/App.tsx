import React from 'react';
import './app.css';
import { Input } from './components/input';
import { TaskCard } from './components/task-card';
import { Task } from './models/task';
import { Status } from './plugins/status';

type ComponentState = {
    tasks: Array<Task>;
};

class App extends React.Component<{}, ComponentState> {
    state = {
        tasks: new Array<Task>()
    };

    constructor(props: any) {
        super(props);

        const stringedTasks = localStorage.getItem('toodooshka.tasks') || '[]';
        const tasks = JSON.parse(stringedTasks);

        if (tasks && tasks.length) {
            this.state.tasks = [...tasks];
        }
    }

    setTasks(tasks: Array<Task>) {
        this.setState({ tasks });

        localStorage.setItem('toodooshka.tasks', JSON.stringify(tasks));
    }

    onTaskAddingHandler = (text: string) => {
        const { tasks } = this.state;
        const maxId = tasks.length
            ? tasks.map(t => t.id).reduce((id1, id2) => Math.max(id1, id2))
            : -1;
        this.setTasks([{ id: 1 + maxId, text, status: Status.todo }, ...tasks]);
    };
    onTaskChangedHandler = (task: Task) => {
        const { tasks } = this.state;
        this.setTasks([...tasks.map(t => (t.id === task.id ? task : t))]);
    };
    onTaskRemovingHandler = (id: number) => {
        const { tasks } = this.state;
        this.setTasks([...tasks.filter(t => t.id !== id)]);
    };

    render() {
        return (
            <div>
                <h1>Toodooshka</h1>

                <Input onEnter={this.onTaskAddingHandler}></Input>

                {this.state.tasks.map(t => {
                    return (
                        <div key={t.id}>
                            <TaskCard
                                task={t}
                                onChanged={this.onTaskChangedHandler}
                                onRemoving={this.onTaskRemovingHandler}
                            />
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default App;
