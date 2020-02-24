import React, { Component } from 'react';
import { interpret, Interpreter, AnyEventObject, State } from 'xstate';
import TaskStatusMachine from '../plugins/task-status-machine';
import { nextTick } from '../common/next-tick';
import { IconButton, Icon } from '@material-ui/core';
import { Status } from '../plugins/status';

type Props = {
    status: string;
    onToggled?: Function;
};

type ComponentState = {
    current: State<any, AnyEventObject, any, any>;
};

export class TaskStatusSwitch extends Component<Props, ComponentState> {
    service: Interpreter<any, any, AnyEventObject, any>;

    constructor(props: Props) {
        super(props);

        const machine = TaskStatusMachine(this.props.status);

        this.state = {
            current: machine.initialState
        };

        this.service = interpret(machine).onTransition(current =>
            this.setState({ current })
        );
    }

    componentDidMount() {
        this.service.start();
    }

    componentWillUnmount() {
        this.service.stop();
    }

    toggle = () => {
        this.service.send('TOGGLE');

        if (this.props.onToggled) {
            const { onToggled } = this.props;
            nextTick(() => onToggled(this.state.current.value));
        }
    };

    render() {
        const { value: status } = this.state.current
        return (
            <IconButton onClick={this.toggle} edge="start">
                {status === Status.todo && <Icon>radio_button_unchecked</Icon>}
                {status === Status.doing && <Icon>history</Icon>}
                {status === Status.failed && <Icon>highlight_off</Icon>}
                {status === Status.done && <Icon>check_circle_outline</Icon>}
            </IconButton>
        );
    }
}
