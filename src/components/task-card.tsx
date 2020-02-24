import React, { useState } from 'react';
import { Task } from '../models/task';
import { TaskStatusSwitch } from './task-status-switch';
import { TextField } from './text-field';
import {
    Icon,
    IconButton,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListItemSecondaryAction,
} from '@material-ui/core';

type Props = {
    task: Task;
    onRemoving?: Function;
    onChanged?: Function;
};

export const TaskCard: React.FC<Props> = ({ task, onChanged, onRemoving }) => {
    const [isEditionMode, setIsEditionMode] = useState(false);
    const [text, setText] = useState(task.text);

    const onEnterHandler = (newText: string) => {
        if (onChanged) {
            onChanged({ ...task, text: newText });

            setIsEditionMode(!isEditionMode);
        }
    };
    const onChangingHandler = (updatedText: string) => {
        setText(updatedText);
    };

    const save = () => {
        onEnterHandler(text);
    };

    const onTaskStatusToggledHandler = (status: string) => {
        if (onChanged) {
            onChanged({ ...task, status });
        }
    };

    return (
        <ListItem>
            <ListItemIcon>
                <TaskStatusSwitch
                    status={task.status}
                    onToggled={onTaskStatusToggledHandler}
                ></TaskStatusSwitch>
            </ListItemIcon>
            <ListItemText>
                {isEditionMode && (
                    <TextField
                        text={task.text}
                        onEnter={onEnterHandler}
                        onChanging={onChangingHandler}
                    />
                )}
                {!isEditionMode && (
                    <div>{text}</div>
                )}
            </ListItemText>
            <ListItemSecondaryAction>
                {
                    isEditionMode
                        ? (
                            <IconButton aria-label="save" onClick={save}>
                                <Icon>save</Icon>
                            </IconButton>
                        ) : (
                            <IconButton aria-label="edit" onClick={() => setIsEditionMode(!isEditionMode)}>
                                <Icon>edit</Icon>
                            </IconButton>
                        )
                }
                <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => {
                        if (onRemoving) onRemoving(task.id);
                    }}
                >
                    <Icon>delete</Icon>
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
};
