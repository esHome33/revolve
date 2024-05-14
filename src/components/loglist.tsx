
type Props = {
    list: string[];
    copy_fct: () => void;
}


const Loglist = (props: Props) => {
    if (props.list.length == 0) {
        return (
            <div
                className="bg-slate-600 p-2 rounded border border-green-500 sm:mt-8 sm:w-40 text-center">
                no log
            </div>);
    } else {
        return (
            <div
                onClick={() => props.copy_fct()}
                className="bg-slate-600 p-2 rounded border border-green-500 sm:mt-8 sm:w-40 text-center"
            >
                <ul >
                    {props.list.map((action, index) => <li key={index}>{action}</li>)}
                </ul>
            </div>
        )
    }
}

export default Loglist