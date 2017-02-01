import * as React from "react";
import { render } from "react-dom";
import { PivotTabs, Tab } from "../";

export interface IState {
    selected: string,
}

export default class Test extends React.Component<any, IState> {
    constructor(props, context) {
        super(props, context);

        this.state = {
            selected: this.tabs[0]
        };
    }

    public state: IState;

    private tabs: string[] = [ "First Tab", "Second Tab", "Third Tab" ];

    private onChange(tab: Tab) {
        console.log("Test harness is updating the state to tab", tab.name);

        this.setState({selected: tab.name})
    }

    public render() {
        const selected = this.state.selected;
        const tabs: Tab[] = this.tabs.map(tab => ({
            name: tab,
            selected: selected === tab,
        } as Tab))

        return (
            <div>
                <PivotTabs title="React Win Pivot" tabs={tabs} onChange={tab => this.onChange(tab) }>
                    <div>
                        <h1>{`This is the ${selected}.`}</h1>
                    </div>
                </PivotTabs>
            </div>
        )
    }
}

(function () {
    render(<Test/>, document.getElementById("contenthost"));
}());