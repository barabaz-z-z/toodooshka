export const nextTick = (action: Function) =>
    setTimeout(() => {
        action();
    }, 0);
