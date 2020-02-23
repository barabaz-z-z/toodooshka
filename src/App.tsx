import React from 'react';
import './app.css';
import { Input } from './components/input';
import { TaskCard } from './components/task-card';
import { Task } from './models/task';
import { Status } from './plugins/status';

import {
    withStyles,
    Theme,
    Typography,
    AppBar,
    Toolbar,
    Container,
    Grid,
    Paper,
    List,
    ListItem,
    Checkbox,
    ListItemIcon,
    ListItemText,
    IconButton,
    ListItemSecondaryAction
} from '@material-ui/core';
import { Styles } from '@material-ui/core/styles/withStyles';

type Props = {
    classes: Record<'paper', string>;
};

type ComponentState = {
    tasks: Array<Task>;
};

const useStyles: Styles<Theme, {}, 'paper'> = (theme: Theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }
});

class App extends React.Component<Props, ComponentState> {
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
        const { classes } = this.props;

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
                            <Input onEnter={this.onTaskAddingHandler}></Input>
                        </ListItemText>
                    </ListItem>

                    {this.state.tasks.map(t => (
                        <ListItem key={t.id}>
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    // checked={checked.indexOf(value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    // inputProps={{ 'aria-labelledby': labelId }}
                                />
                            </ListItemIcon>
                            <ListItemText
                                // id={t.id}
                                primary={`Line item ${t.text + 1}`}
                            />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="comments">
                                    {/* <CommentIcon /> */}
                                </IconButton>
                            </ListItemSecondaryAction>
                            {/* <TaskCard
                                task={t}
                                onChanged={this.onTaskChangedHandler}
                                onRemoving={this.onTaskRemovingHandler}
                            /> */}
                        </ListItem>
                    ))}
                </List>
            </Container>
        );
    }
}

export default withStyles(useStyles)(App);
