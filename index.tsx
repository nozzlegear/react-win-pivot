import * as React from 'react';
import Classes from "classnames";
import { determineSlideInDirection } from './utils';

type Props<T extends string = string> = React.PropsWithChildren<{
    tabs: T[]
    selectedTab: T
    onChange: (newTab: T) => void
}>

export function PivotTabs<T extends string = string>(props: Props<T>): JSX.Element { 
    const contentContainer = React.useRef<HTMLDivElement | null>(null);
    const previousTabIndex = React.useRef<number | null>(null);
    const currentTabIndex = props.tabs.indexOf(props.selectedTab);

    React.useEffect(() => {
        if (props.selectedTab && contentContainer.current) {
            // Determine whether to slide in from left, right or below
            const slideInFrom = determineSlideInDirection({
                currentTabIndex, 
                previousTabIndex: previousTabIndex.current
            });

            contentContainer.current.classList.add("slide-in-from-" + slideInFrom);
        }

        return () => {
            // The selected tab is changing, save it as the last tab
            previousTabIndex.current = currentTabIndex;
        }
    }, [props.selectedTab, previousTabIndex, contentContainer]);

    const handleTabClick = (tab: T) => (e: React.FormEvent<any>) => {
        e.preventDefault();

        if (tab === props.selectedTab) return;

        props.onChange(tab);
    }

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
            <hr className="pivot-spacer"/>
            <div ref={contentContainer} key={`pivot-content`} className={"pivot-content"}>
                {props.children}
            </div>
        </div>
    );
}

export default PivotTabs;
