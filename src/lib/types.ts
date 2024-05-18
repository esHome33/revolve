import Action from "./action";

export type Couleurs = "R" | "G" | "B" | "Y" | "X";

export const Col1 = "R";
export const Col2 = "G";
export const Col3 = "B";
export const Col4 = "Y";
export const ColVide = "X";

export type FileContent = {
    game: string;
    moves: Action[];
}

export const MagicId = 'ESV1';
