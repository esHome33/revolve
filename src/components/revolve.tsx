'use client';

import Revolve from "@/lib/revolve"
import Colonne1 from "./colonne1"
import Colonne2 from "./colonne2"
import Colonne3 from "./colonne3"
import Colonne4 from "./colonne4"
import { useState, useEffect } from "react";
import Action from "@/lib/action";

type Props = {
    game: Revolve | undefined;
    color_edit: (s: number, h: number) => void;
    prec_action?: Action;
}

const RevolveGame = (props: Props) => {
    const [onclient, setOnclient] = useState<boolean>(false);

    const precedentAction = props.prec_action;

    if (precedentAction) {
        if (precedentAction.dir === "GA") {
            
        } else if (precedentAction.dir === "DR") {
            
        }
    }

    useEffect(() => {
        setOnclient(true);
    }, []);

    if (!onclient || props.game === undefined) {
        return null;
    }


    return (
        <div className="flex flex-row space-x-4">
            <Colonne1
                colors={props.game.get_col1()}
                color_edit={props.color_edit}
            />
            <Colonne2
                colors={props.game.get_col2()}
                color_edit={props.color_edit}
            />
            <Colonne3
                colors={props.game.get_col3()}
                color_edit={props.color_edit}
            />
            <Colonne4
                colors={props.game.get_col4()}
                color_edit={props.color_edit}
            />
        </div>
    )
}

export default RevolveGame