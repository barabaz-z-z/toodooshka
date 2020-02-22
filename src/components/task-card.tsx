import React, { useState } from 'react';
import { Task } from '../models/task';
import { TaskStatusSwitch } from './task-status-switch';
import { Input } from './input';

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
        <div>
            <TaskStatusSwitch
                status={task.status}
                onToggled={onTaskStatusToggledHandler}
            ></TaskStatusSwitch>
            {isEditionMode && (
                <>
                    <Input
                        text={task.text}
                        onEnter={onEnterHandler}
                        onChanging={onChangingHandler}
                    />
                    <button onClick={save}>Save</button>
                </>
            )}
            {!isEditionMode && (
                <>
                    <div>{text}</div>
                    <button onClick={() => setIsEditionMode(!isEditionMode)}>
                        Edit
                    </button>
                </>
            )}
            <button
                onClick={() => {
                    if (onRemoving) onRemoving(task.id);
                }}
            >
                Remove
            </button>
        </div>
    );
};
