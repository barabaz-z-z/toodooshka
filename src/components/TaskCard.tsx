import React, { useState } from 'react';
import { Input } from './Input';
import { ITask } from '../models/ITask';

interface Props {
    task: ITask;
    onRemoving?: Function;
    onChanged?: Function;
}

export const TaskCard: React.FC<Props> = ({ task, onChanged, onRemoving }) => {
    const [isEditionMode, setIsEditionMode] = useState(false);
    const [text, setText] = useState(task.text);

    const onEnterHandler = (newText: string) => {
        if (onChanged) {
            onChanged({ id: task.id, text: newText });

            setIsEditionMode(!isEditionMode);
        }
    };
    const onChangingHandler = (updatedText: string) => {
        setText(updatedText);
    };

    const save = () => {
        onEnterHandler(text);
    }

    return <div>
        {isEditionMode && (
            <>
                <Input
                    text={task.text}
                    onEnter={onEnterHandler}
                    onChanging={onChangingHandler} />
                <button onClick={save}>
                    Save
                </button>
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
        <button onClick={() => { if (onRemoving) onRemoving(task.id); }}>Remove</button>
    </div>

};
