/**
 * implémente une action loguée : exemple 1 UP ou B1 DR
 */
export default class Action {
	public lieu: string;
	public dir: string;

	public lieux = ["B1", "B2", "1", "2", "3", "4"];

	public dirs = [
		"UP", // haut
		"DO", // bas
		"GA", // gauche
		"DR", // droite
	];

	/**
	 * crée une nouvelle action à partir de la chaine d'action fournie
	 * @param action une action valide càd un lieu, un espace, suivi d'une direction
	 */
	public constructor(action: string) {
		if (!action) {
			this.lieu = "";
			this.dir = "";
			return;
		}

		const decomp = action.split(" ");
		if (
			this.lieux.indexOf(decomp[0]) !== -1 &&
			this.dirs.indexOf(decomp[1]) !== -1
		) {
			this.dir = decomp[1];
			this.lieu = decomp[0];
		} else {
			throw new Error(`ERREUR action non reconnue : ${action}`);
		}
	}

	/**
	 * Calcule l'action inverse de this action
	 * @returns l'action inverse de this action
	 */
	public inverse(): string {
		if (this.dir === "UP") {
			return this.lieu + " DO";
		} else if (this.dir === "DO") {
			return this.lieu + " UP";
		} else if (this.dir === "GA") {
			return this.lieu + " DR";
		} else if (this.dir === "DR") {
			return this.lieu + " GA";
		} else {
			throw new Error(`ERREUR : Ne peut pas inverser cette action`);
		}
	}

	/**
	 * Détermine si les deux actions sont inverses l'une de l'autre.
	 * @param action une autre action
	 * @returns VRAI si this est l'inverse de l'action fournie en paramètre ; FAUX sinon
	 */
	public isInverse(action: string): boolean {
		const other = new Action(action);
		const other_inverse = other.inverse();
		const myAction = this.lieu + " " + this.dir;
		return myAction === other_inverse;
	}
}
