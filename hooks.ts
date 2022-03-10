import * as React from "react";

type TransitionState = "entering" | "entered" | null;

type TransitionStateTuple = [
    state: TransitionState, 
    setState: (newState: TransitionState) => void
];

type TransitionControlTuple = [
    state: TransitionState,
    enter: () => void,
    reset: (() => void)
]

export function useTransitionState(duration = 1000): TransitionStateTuple {
    const [state, setState] = React.useState<TransitionState>(null);

    React.useEffect(() => {
        let timerId: number;

        if (state === "entering") {
            timerId = setTimeout(() => {
                setState("entered");
            }, duration);
        }

        return () => {
            if (timerId) clearTimeout(timerId);
        }
    });

    return [state, setState];
}

export function useTransitionControl(duration: number): TransitionControlTuple {
    const [state, setState] = useTransitionState(duration);

    const enter = () => {
        setState("entering");
    }
    const reset = () => {
        setState(null);
    }

    return [state, enter, reset];
}
