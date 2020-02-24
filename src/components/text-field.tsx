import React, { KeyboardEvent, ChangeEvent, useState } from 'react';
import { TextField as MaterialTextField } from '@material-ui/core';

type Props = {
    text?: string;
    onEnter?: Function;
    onChanging?: Function;
};

export const TextField: React.FC<Props> = ({ text, onEnter, onChanging }) => {
    const [value, setValue] = useState<string>(text || '');

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (!e.ctrlKey && !e.shiftKey && e.key === 'Enter') {
            e.stopPropagation();
            e.preventDefault();

            if (onEnter) {
                onEnter(value);

                setValue('');
            }
        }
    };
    const onInputHandler = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
        onChanging && onChanging(value);

        setValue(value);
    };

    return (
        <MaterialTextField
            fullWidth
            label="Task"
            variant="outlined"
            value={value}
            onKeyDown={onKeyDownHandler}
            onChange={onInputHandler}
        />
    );
};
