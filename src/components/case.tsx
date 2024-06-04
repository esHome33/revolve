'use client';

import { Couleurs } from "@/lib/types"
import { useEffect, useState } from "react";

type Props = {
    couleur: Couleurs;
    color_edit: (s: number, h: number) => void;
    silo: number;
    h: number;
}

const dim = "w-10 h-10 ";
const dim_petit = "w-8 h-8 ";

const CaseCouleur = ({ silo, h, couleur, color_edit }: Props) => {

    const [onclient, setOnclient] = useState<boolean>(false);

    useEffect(() => {
        setOnclient(true);
    }, []);

    if (!onclient) {
        return null;
    }


    const colorise = (col: Couleurs) => {
        switch (col) {
            case "B":
                return "bg-blue-500";
            case "G":
                return "bg-green-500";
            case "R":
                return "bg-red-500";
            case "Y":
                return "bg-yellow-500";
            case "X":
                return "border border-gray-600";
        }
    }

    const produitCase = (col: Couleurs, silo: number, h: number, grand: boolean) => {
        const couleur = colorise(col);
        const autres_attributs = "rounded-full animate-slideRight transition ease-eti2 duration-1700";
        if (grand) {
            return (<div
                className={`${dim} ${couleur} ${autres_attributs}`}
                onClick={() => color_edit(silo, h)}
            ></div>)
        } else {
            return (<div
                className={`${dim_petit} ${couleur} ${autres_attributs} mx-auto `}
                onClick={() => color_edit(silo, h)}
            ></div>)
        }
    }

    if (h === 0) {
        return produitCase(couleur, silo, h, false);
    } else {
        return produitCase(couleur, silo, h, true);
    }


}

export default CaseCouleur