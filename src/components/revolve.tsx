import Revolve from "@/lib/revolve"
import Colonne1 from "./colonne1"
import Colonne2 from "./colonne2"
import Colonne3 from "./colonne3"
import Colonne4 from "./colonne4"

type Props = {
    game: Revolve;
}

const RevolveGame = (props: Props) => {
    return (
        <div className="flex flex-row space-x-4">
            <Colonne1 colors={props.game.get_col1()}/>
            <Colonne2 colors={props.game.get_col2()} />
            <Colonne3 colors={props.game.get_col3()} />
            <Colonne4 colors={props.game.get_col4()} />
        </div>
    )
}

export default RevolveGame