import Action from "./action";

export type Couleurs = "R" | "G" | "B" | "Y" | "X";

export const RED = "R";
export const GREEN = "G";
export const BLUE = "B";
export const YELLOW = "Y";
export const EMPTY = "X";

export type FileContent = {
	game: string;
	moves: Action[];
};

export const MagicId = "ESV1";
