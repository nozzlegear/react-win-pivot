import * as React from "react";
import { render } from "react-dom";
import { PivotTabs } from "../index";

type Tab = "First Tab" | "Second Tab" | "Third Tab";

const DEFAULT_TABS: Tab[] = [
    "First Tab",
    "Second Tab",
    "Third Tab",
]

function TestPage(): JSX.Element {
    const [selectedTab, setSelectedTab] = React.useState(DEFAULT_TABS[0]);

    return (
        <div>
            <PivotTabs tabs={DEFAULT_TABS} selectedTab={selectedTab} onChange={setSelectedTab}>
                <div>
                    <h1>{`This is the ${selectedTab}.`}</h1>
                </div>
            </PivotTabs>
        </div>
    )
}

(function () {
    render(<TestPage />, document.getElementById("contenthost"));
}());
