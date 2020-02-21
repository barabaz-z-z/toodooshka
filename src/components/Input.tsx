import React, { KeyboardEvent } from 'react';

interface Props {
    text?: string;
    onEnter?: Function;
}

export const Input: React.FC<Props> = ({ text, onEnter }) => {
    const onKeyDownHandler = (e: KeyboardEvent<HTMLElement>) => {
        if (!e.ctrlKey && !e.shiftKey && e.key === 'Enter') {
            e.stopPropagation();
            e.preventDefault();

            if (onEnter) {
                onEnter((e.target as HTMLElement).textContent);
            }
        }
    };

    return <div contentEditable onKeyDown={onKeyDownHandler}>{text}</div>;
}
