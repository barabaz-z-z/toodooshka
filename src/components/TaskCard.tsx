import React, { useState } from 'react';
import { Input } from './Input';

interface Props {
    text: string;
    onTextChanged?: Function;
}

export const TaskCard: React.FC<Props> = ({ text, onTextChanged }) => {
    const [isEditionMode, setIsEditionMode] = useState(false);

    const onEnterHandler = (text: string) => {
        if (onTextChanged) onTextChanged(text);
    }

    return <div>
        {isEditionMode && (<Input text={text} onEnter={onEnterHandler}></Input>)}
        {!isEditionMode && (<div>{text}</div>)}
        <button onClick={() => setIsEditionMode(!isEditionMode)}>Edit</button>
        <button>Remove</button>
    </div>

};
