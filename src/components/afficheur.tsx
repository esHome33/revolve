'use client';

import React from 'react';
import { Couleurs } from '@/lib/types';

type Props = {
    colors: string;
    after_rotate: (color:string) => void;
}

/**
* Affiche les 4 couleurs objectif pour chaque colonne du jeu.
**/
const Afficheur = (p: Props) => {
    let couleur_de_base = p.colors;
    
    const rotate = () => {
        let resu = "";
        for (let i = 0; i < 4; i++) {
            const m = (i + 1) % 4;
            resu += couleur_de_base[m];
        }
        p.after_rotate(resu);
    }

    const getC = (index: number) => {
        const c = couleur_de_base[index] as Couleurs;


        let resu = "w-3 h-4 rounded ";

        if (c == "B") {
            resu += "bg-blue-500 ";
        } else if (c === 'G') {
            resu += "bg-green-500 ";
        } else if (c === 'R') {
            resu += "bg-red-500 ";
        } else if (c === 'Y') {
            resu += "bg-yellow-500 ";
        } else {
            resu += "bg-black ";
        }

        if (index < 3) {
            resu += " mr-2";
        }
        return resu.trim();
    }


    return (
        <div
            className='flex flex-col justify-start align-bottom w-30 p-2 absolute top-0 left-20 border rounded mt-1'
            onClick={rotate}
        >
            <div
                className='text-xs font-mono italic mb-1 text-center'
            >
                objectif
            </div>
            <div
                className='flex flex-row justify-around'
            >
                <div
                    className={getC(0)}
                >
                </div>
                <div
                    className={getC(1)}
                >
                </div>
                <div
                    className={getC(2)}
                >
                </div>
                <div
                    className={getC(3)}
                >
                </div>
            </div>
        </div>

    )
}

export default Afficheur