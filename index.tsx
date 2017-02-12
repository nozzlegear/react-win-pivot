import * as React from 'react';
import * as Classes from "classnames";
import Transition, { Transition as ITransition } from "react-motion-ui-pack";

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

    /**
     * A flag which tells the render method whether this component has mounted yet, without setting off another render when the value changes.
     */
    private hasMounted = false;

    public componentDidMount() {
        this.hasMounted = true;
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
        const slideInLeft = this.state.slide_in_from === "Left";
        const appear: ITransition = {
            opacity: 0,
            translateX: this.hasMounted ? (slideInLeft ? -250 : 250) : 0,
            translateY: this.hasMounted ? 0 : 50,
        }

        return (
            <div className="pivot-tabs">
                <Header title={this.props.title} actions={this.props.actions} />
                <div className="pivot-tabs-container">
                    {tabs}
                </div>
                <hr className="pivot-spacer"/>
                { /* Setting the key on the child will get React to always rerender the child, which will ensure our animation always fires. */}
                <Transition 
                    key={selected.name}
                    appear={appear}
                    component={`div`}
                    runOnMount={true}
                    enter={{opacity: 1, translateX: 0, translateY: 0}}>
                    <div className={"pivot-content"}>
                        {this.props.children}
                    </div>
                </Transition>
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
            <hr className="pivot-spacer"/>  
        </div>
    )
}

export default PivotTabs;