
type Props = {
    value: boolean;
}

const taille = "w-20 h-10"

const CheckComponent = (props: Props) => {
    if (props.value) {
        return (
            <div
                className={`bg-green-500 mx-auto my-auto w-auto h-auto px-3 py-1 text-sm text-green-800
                 border-green-400 border-4 ${taille}`}
            >valid board</div>
        )
    } else {
        return (
            <div
                className={`bg-red-500 mx-auto my-auto w-auto h-auto px-3 py-1 text-sm
                border-red-400 border-4 ${taille}`}
            >Problem</div>
        )
    }
}

export default CheckComponent