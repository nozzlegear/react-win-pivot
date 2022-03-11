import * as React from 'react';
import Classes from "classnames";
import { determineSlideInDirection } from './utils';
import { useTransitionControl } from "./hooks";

type AnimatedProps = {
    animate: true
    animationDuration?: number
}

type UnanimatedProps = {
    animate: false
}

type Props<T extends string = string> = (AnimatedProps | UnanimatedProps) & React.PropsWithChildren<{
    tabs: T[]
    selectedTab: T
    onChange: (newTab: T) => void
}>

export function PivotTabs<T extends string = string>(props: Props<T>): JSX.Element { 
    const previousTabIndex = React.useRef<number | null>(null);
    const currentTabIndex = props.tabs.indexOf(props.selectedTab);
    const [transitionState, enter, reset] = useTransitionControl(props.animate && props.animationDuration || 200);

    // Determine whether to slide in from left, right or below
    const slideInFrom = React.useMemo(() => determineSlideInDirection({
            currentTabIndex, 
            previousTabIndex: previousTabIndex.current
    }), [currentTabIndex, previousTabIndex]);

    // Use an effect to reset the transition state and store the previous tab index whenever the selected tab changes
    React.useEffect(() => {
        // Save the current tab index as the previous tab index
        previousTabIndex.current = currentTabIndex;
    }, [currentTabIndex]);

    React.useEffect(() => {
        enter();

        return () => {
            reset();
        }
    }, [currentTabIndex]);

    const handleTabClick = (tab: T) => (e: React.FormEvent<any>) => {
        e.preventDefault();

        if (tab === props.selectedTab) return;

        props.onChange(tab);
    }

    // Build the list of classes for the content container, based on which direction to slide in from 
    const containerClasses = Classes("pivot-content", {
        "slide-in-animated": props.animate === true,
        "slide-in-from-below": slideInFrom === "below",
        "slide-in-from-right": slideInFrom === "right",
        "slide-in-from-left": slideInFrom === "left",
        "slide-in-entering": transitionState === "entering",
        "slide-in-entered": transitionState === "entered"
    });

    return (
        <div className="pivot-tabs">
            <div className="pivot-tabs-container">
                {props.tabs.map(tab => (
                    <div key={tab} className={Classes("pivot-tab", { active: props.selectedTab === tab })}>
                        <button onClick={handleTabClick(tab)}>
                            {tab}
                        </button>
                    </div>
                ))}
            </div>
            <div key={currentTabIndex} className={containerClasses}>
                {props.children}
            </div>
        </div>
    );
}

export default PivotTabs;
