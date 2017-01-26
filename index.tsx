import * as React from 'react';
import * as Classes from "classnames";

export interface Tab {
    name: string;
    selected: boolean;
}

export interface IProps extends React.Props<any> {
    tabs: Tab[];
    title: string;
    onChange: (event: React.MouseEvent<HTMLButtonElement>, to: Tab) => void;
    actions?: JSX.Element | JSX.Element[];
}

export interface IState {
    slide_in_from: "Left" | "Right";
}

export class PivotTabs extends React.Component<IProps, IState>
{
    constructor(props: IProps) {
        super(props);
    }

    public state: IState = {
        slide_in_from: "Left"
    }

    public componentDidMount() {
        
    }

    private componentWillReceiveProps(nextProps: IProps, nextState: IState) {
        const lastIndex = this.props.tabs.findIndex(tab => !!tab.selected);
        const newIndex = nextProps.tabs.findIndex(tab => !!tab.selected);
        
        //If last tab comes after new tab, slide in from right. Else, default to slide in from left.
        nextState.slide_in_from = lastIndex < newIndex ? "Right" : "Left";
    }

    public render() {
        const tabs = this.props.tabs.map(tab =>
            <div key={`pivot-tab-${tab.name}`} className={Classes("pivot-tab", { active: !!tab.selected })}>
                <button onClick={e => this.props.onChange(e, tab)}>{tab.name}</button>
            </div>
        );

        return (
            <div className="pivot-tabs">
                <div className="pivot-header">
                    <h3 className="pivot-header-title">{this.props.title}</h3>
                    <div className="pivot-header-actions">
                        {this.props.actions}
                    </div>
                </div>
                <div className="pivot-tabs-container">
                    {tabs}
                </div>
                <div className={Classes("pivot-content", `slideIn${this.state.slide_in_from}`)}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}