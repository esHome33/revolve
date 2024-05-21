'use client';

import { Col1, Col2, Col3, Col4, ColVide, Couleurs } from "@/lib/types"
import { useEffect, useState } from "react";

type Props = {
    couleur: Couleurs;
    color_edit: (s: number, h: number) => void;
    silo: number;
    h: number;
}

const dim = "w-10 h-10 ";
const dim0 = "w-8 h-8 ";

const CaseCouleur = (props: Props) => {

    const [onclient, setOnclient] = useState<boolean>(false);

    useEffect(() => {
        setOnclient(true);
    },[]);

    if (!onclient) {
        return null;
    }
    
    switch (props.couleur) {
        case Col1:
            if (props.h === 0) {
                return (
                    <div
                        className={`${dim0} bg-red-500 rounded mx-auto`}
                        onClick={() => props.color_edit(props.silo, props.h)}
                    ></div>
                )
            } else {
                return (
                    <div
                        className={`${dim} bg-red-500 rounded`}
                        onClick={() => props.color_edit(props.silo, props.h)}
                    ></div>
                )
            }
        case Col2:
            if (props.h === 0) {
                return (
                    <div
                        className={`${dim0} bg-green-500 rounded mx-auto`}
                        onClick={() => props.color_edit(props.silo, props.h)}
                    ></div>
                )
            } else {
                return (
                    <div
                        className={`${dim} bg-green-500 rounded`}
                        onClick={() => props.color_edit(props.silo, props.h)}
                    ></div>
                )
            }
        case Col3:
            if (props.h === 0) {
                return (
                    <div
                        className={`${dim0} bg-blue-500 rounded mx-auto`}
                        onClick={() => props.color_edit(props.silo, props.h)}
                    ></div>
                )
            } else {
                return (
                    <div
                        className={`${dim} bg-blue-500 rounded`}
                        onClick={() => props.color_edit(props.silo, props.h)}
                    ></div>
                )
            }
        case Col4:
            if (props.h === 0) {
                return (
                    <div
                        className={`${dim0} bg-yellow-500 rounded mx-auto`}
                        onClick={() => props.color_edit(props.silo, props.h)}
                    ></div>
                )
            } else {
                return (
                    <div
                        className={`${dim} bg-yellow-500 rounded`}
                        onClick={() => props.color_edit(props.silo, props.h)}
                    ></div>
                )
            }
        case ColVide:
            if (props.h === 0) {
                return (
                    <div
                        className={`${dim0} bg-black border-white border rounded mx-auto`}
                        onClick={() => props.color_edit(props.silo, props.h)}
                    ></div>
                )
            } else {
                return (
                    <div
                        className={`${dim} bg-black border-white border rounded`}
                        onClick={() => props.color_edit(props.silo, props.h)}
                    ></div>
                )
            }
        default:
            if (props.h === 0) {
                return (
                    <div
                        className={`${dim0} bg-white border-green-500 border-2 rounded mx-auto`}
                    ></div>
                )
            } else {
                return (
                    <div
                        className={`${dim} bg-white border-green-500 border-2 rounded`}
                    ></div>
                )
            }
    }
}

export default CaseCouleur