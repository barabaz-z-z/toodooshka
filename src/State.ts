import { Machine } from 'xstate';

export const TaskStatusMachine = Machine({
    id: 'taskStatus',
    initial: 'todo',
    states: {
        todo: {
            on: {
                TOGGLE: 'doing'
            }
        },
        doing: {
            on: {
                TOGGLE: 'done'
            }
        },
        done: {
            on: {
                TOGGLE: 'failed'
            }
        },
        failed: {
            on: {
                TOGGLE: 'todo'
            }
        }
    }
});
