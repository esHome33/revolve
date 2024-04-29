import { Couleurs } from "@/lib/types"

type Props = {
    couleur: Couleurs
}

const dim = "w-7 h-7 ";

const CaseCouleur = (props: Props) => {
    switch (props.couleur) {
        case "R":
            return (
                <div className={`${dim} bg-red-500 rounded`}></div>
            )
        case "G":
            return (
                <div className={`${dim} bg-green-500 rounded`}></div>
            )
        case "B":
            return (
                <div className={`${dim} bg-blue-500 rounded`}></div>
            )
        case "Y":
            return (
                <div className={`${dim} bg-yellow-500 rounded`}></div>
            )
        case "X":
            return (
                <div className={`${dim} bg-black border-white border rounded`}></div>
            )
        default:
            return (
                <div className={`${dim} bg-white border-green-500 border-2 rounded`}></div>
            )
    }
}

export default CaseCouleur