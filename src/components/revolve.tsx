import Colonne1 from "./colonne1"
import Colonne2 from "./colonne2"
import Colonne3 from "./colonne3"
import Colonne4 from "./colonne4"

type Props = {}

const RevolveGame = (props: Props) => {
    return (
        <div className="flex flex-row space-x-4">
            <Colonne1 colors="YYYYYX"/>
            <Colonne2 colors="BBBBB"/>
            <Colonne3 colors="RRRRR"/>
            <Colonne4 colors="GGGGG"/>
        </div>
    )
}

export default RevolveGame