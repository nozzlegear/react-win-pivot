import * as React from "react";
import { createRoot } from "react-dom/client";
import { Pivot } from "../index";

type Tab = "First Tab" | "Second Tab" | "Third Tab";

const DEFAULT_TABS: Tab[] = ["First Tab", "Second Tab", "Third Tab"];

function TestPage(): React.JSX.Element {
    const [selectedTab, setSelectedTab] = React.useState(DEFAULT_TABS[0]);

    return (
        <Pivot animate={true} tabs={DEFAULT_TABS} selectedTab={selectedTab} onChange={setSelectedTab}>
            <div>
                <h1>{`This is the ${selectedTab}.`}</h1>
            </div>
        </Pivot>
    );
}

(() => {
    const root = createRoot(document.getElementById("contenthost")!);
    root.render(<TestPage />);
})();
