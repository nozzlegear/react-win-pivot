import * as React from 'react';
import * as Classes from "classnames";

export interface Tab {
    name: string;
    selected: boolean;
}

export interface IProps extends HeaderProps {
    tabs: Tab[];
    onChange: (to: Tab) => void;
}

export interface HeaderProps extends React.Props<any> {
    title: string;
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
        slide_in_from: undefined,
    }

    public componentDidMount() {

    }

    private componentWillReceiveProps(nextProps: IProps) {
        const lastIndex = this.props.tabs.findIndex(tab => !!tab.selected);
        const newIndex = nextProps.tabs.findIndex(tab => !!tab.selected);

        //If last tab comes after new tab, slide in from right. Else, default to slide in from left.
        this.setState({
            slide_in_from: lastIndex < newIndex ? "Right" : "Left"
        })
    }

    private handleTabClick(e: React.FormEvent<any>, tab: Tab) {
        e.preventDefault();

        if (tab.selected) {
            return;
        }

        this.props.onChange(tab);
    }

    public render() {
        const selected = this.props.tabs.find(t => t.selected);
        const tabs = this.props.tabs.map(tab =>
            <div key={`pivot-tab-${tab.name}`} className={Classes("pivot-tab", { active: !!tab.selected })}>
                <button onClick={e => this.handleTabClick(e, tab)}>{tab.name}</button>
            </div>
        );
        const animationCss = {
            animated: !!this.state.slide_in_from,
            slideInLeft: this.state.slide_in_from === "Left",
            slideInRight: this.state.slide_in_from === "Right",
        }

        return (
            <div className="pivot-tabs">
                <Header title={this.props.title} actions={this.props.actions} />
                <div className="pivot-tabs-container">
                    {tabs}
                </div>
                { /* Setting the key on the child will get React to always rerender the child with its classes, which will ensure our animation always fires. */}
                <div className={Classes("pivot-content", animationCss)} key={selected.name}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

/**
 * A Pivot component without the pivoting tabs. Use it to keep a clear theme across your apps, even on pages that don't use the Pivot.
 */
export function Header(props: HeaderProps) {
    return (
        <div className="pivot-tabs">
            <div className="pivot-header">
                <h3 className="pivot-header-title">{props.title}</h3>
                <div className="pivot-header-actions">
                    {props.actions}
                </div>
            </div>
        </div>
    )
}

export default PivotTabs;