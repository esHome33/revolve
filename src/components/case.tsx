import { Couleurs } from "@/lib/types"

type Props = {
    couleur: Couleurs
}

const CaseCouleur = (props: Props) => {
    switch (props.couleur) {
        case "R":
            return (
                <div className="w-10 h-10 bg-red-500 rounded"></div>
            )
        case "G":
            return (
                <div className="w-10 h-10 bg-green-500 rounded"></div>
            )
        case "B":
            return (
                <div className="w-10 h-10 bg-blue-500 rounded"></div>
            )
        case "Y":
            return (
                <div className="w-10 h-10 bg-yellow-500 rounded"></div>
            )
        case "X":
            return (
                <div className="w-10 h-10 bg-black border-white border rounded"></div>
            )
        default:
            return (
                <div className="w-10 h-10 bg-white border-green-500 border-2 rounded"></div>
            )
    }
}

export default CaseCouleur