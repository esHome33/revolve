'use client'

import { Couleurs } from "@/lib/types";
import CaseCouleur from "./case";
import { useState, useEffect } from "react";

type Props = {
    colors: string | undefined;
    color_edit: (s: number, h: number) => void;
}


const init = (str: string) => {
    var resu: Couleurs[] = ["X", "X", "X", "X", "X"];
    if (!str) {
        return resu;
    }
    resu = [];
    for (let index = 0; index < str.length; index++) {
        const element = str[index] as Couleurs;
        if (element === "R" || "G" || "B" || "Y" || "N")
            resu.push(element);
    }
    return resu;
}

const Colonne2 = (props: Props) => {

    const [onclient, setOnclient] = useState<boolean>(false);

    useEffect(() => {
        setOnclient(true);
    }, []);

    if (!onclient || props.colors === undefined) {
        return null;
    }

    const cols = init(props.colors);

    return (
        <div className="flex flex-col space-y-4">
            {cols.map((elt, index) => {
                if (index < 5) {
                    if (index === 0 || index === 2) {
                        return (
                            <div key={index} className="space-y-4">
                            <div>
                                <CaseCouleur
                                    couleur={elt}
                                    color_edit={props.color_edit}
                                    h={index}
                                    silo={1}
                                />
                            </div>
                            <hr className="-m-2" />
                        </div>)
                    } else {
                        return (<div key={index}>
                            <CaseCouleur
                                couleur={elt}
                                color_edit={props.color_edit}
                                h={index}
                                silo={1}
                            />
                        </div>)
                    }
                } else {
                    return null;
                }
            }
            )}
        </div>
    )
}

export default Colonne2