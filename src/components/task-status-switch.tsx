import React, { Component } from 'react';
import { interpret, Interpreter, AnyEventObject, State } from 'xstate';
import TaskStatusMachine from '../plugins/task-status-machine';
import { nextTick } from '../common/next-tick';

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
        const newState = this.service.send('TOGGLE');

        if (this.props.onToggled) {
            const { onToggled } = this.props;
            nextTick(() => onToggled(this.state.current.value));
        }
    };

    render() {
        return (
            <button onClick={this.toggle}>{this.state.current.value}</button>
        );
    }
}
