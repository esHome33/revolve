
type Props = {
    list: string[];
}

const Loglist = (props: Props) => {
    if (props.list.length == 0) {
        return (<div className="bg-slate-600 p-2 rounded border border-green-500 min-w-max">RIEN</div>);
    } else {
        return (
            <ul className="bg-slate-600 p-2 rounded border border-green-500 min-w-max">
                {props.list.map((action, index) => <li key={index}>{action}</li>)}
            </ul>
        )
    }
}

export default Loglist