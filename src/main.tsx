import React from 'react';
import { TextField } from './components/text-field';
import { TaskCard } from './components/task-card';
import { Task } from './models/task';
import { Status } from './plugins/status';

import {
    Typography,
    AppBar,
    Toolbar,
    Container,
    List,
    ListItem,
    ListItemText
} from '@material-ui/core';

type ComponentState = {
    tasks: Array<Task>;
};

const localStorageTasksName = 'toodooshka.tasks';

class App extends React.Component<{}, ComponentState> {
    state = {
        tasks: new Array<Task>()
    };

    constructor(props: any) {
        super(props);

        const stringedTasks = localStorage.getItem(localStorageTasksName) || '[]';
        const tasks = JSON.parse(stringedTasks);

        if (tasks && tasks.length) {
            this.state.tasks = [...tasks];
        }
    }

    setTasks(tasks: Array<Task>) {
        this.setState({ tasks });

        localStorage.setItem(localStorageTasksName, JSON.stringify(tasks));
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
            <Container maxWidth="sm">
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="body1" color="inherit">
                            Toodooshka
                        </Typography>
                    </Toolbar>
                </AppBar>

                <List>
                    <ListItem>
                        <ListItemText>
                            <TextField onEnter={this.onTaskAddingHandler}></TextField>
                        </ListItemText>
                    </ListItem>

                    {this.state.tasks.map(t => (
                        <TaskCard
                            key={t.id}
                            task={t}
                            onChanged={this.onTaskChangedHandler}
                            onRemoving={this.onTaskRemovingHandler} />
                    ))}
                </List>
            </Container>
        );
    }
}

export default App;
