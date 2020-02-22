import React, { KeyboardEvent, useRef, FormEvent } from 'react';

type Props = {
    text?: string;
    onEnter?: Function;
    onChanging?: Function;
};

export const Input: React.FC<Props> = ({ text, onEnter, onChanging }) => {
    const inputRef = useRef<HTMLDivElement>(null);

    const onKeyDownHandler = (e: KeyboardEvent<HTMLElement>) => {
        if (!e.ctrlKey && !e.shiftKey && e.key === 'Enter') {
            e.stopPropagation();
            e.preventDefault();

            if (onEnter) {
                onEnter((e.target as HTMLElement).textContent);
                removeContent();
            }
        }
    };
    const onInputHandler = (e: FormEvent<HTMLElement>) => {
        onChanging && onChanging((e.target as HTMLElement).textContent);
    };

    const removeContent = () => {
        while (inputRef.current?.firstChild) {
            inputRef.current.removeChild(inputRef.current.firstChild);
        }
    };

    return (
        <div
            ref={inputRef}
            contentEditable
            suppressContentEditableWarning
            onKeyDown={onKeyDownHandler}
            onInput={onInputHandler}
        >
            {text}
        </div>
    );
};
