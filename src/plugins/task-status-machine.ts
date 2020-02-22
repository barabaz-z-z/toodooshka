import { Machine } from 'xstate';
import { Status } from './status';

export default (initialState: string = Status.todo) =>
    Machine({
        id: 'taskStatus',
        initial: initialState,
        states: {
            [Status.todo]: {
                on: {
                    TOGGLE: Status.doing
                }
            },
            [Status.doing]: {
                on: {
                    TOGGLE: Status.done
                }
            },
            [Status.done]: {
                on: {
                    TOGGLE: Status.failed
                }
            },
            [Status.failed]: {
                on: {
                    TOGGLE: Status.todo
                }
            }
        }
    });
