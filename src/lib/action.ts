/**
 * implémente une action loguée : exemple 1 UP ou B1 DR
 */
export default class Action {
	public lieu: string;
	public dir: string;

	public static lieux = ["B1", "B2", "01", "02", "03", "04"];

	public static dirs = [
		"UP", // haut
		"DO", // bas
		"GA", // gauche
		"DR", // droite
	];

	/**
	 * Abreviation of an action @see {@link action_inverse}
	 */
	private static action_abrege = [
		"0",
		"1",
		"2",
		"3",
		"4",
		"5",
		"6",
		"7",
		"8",
		"9",
		"A",
		"B",
	];

	/**
	 * all possible actions in this game @see {@link action_abrege}
	 */
	private static action_inverse = [
		"B1 GA",
		"B1 DR",
		"B2 GA",
		"B2 DR",
		"01 UP",
		"01 DO",
		"02 UP",
		"02 DO",
		"03 UP",
		"03 DO",
		"04 UP",
		"04 DO",
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
			Action.lieux.indexOf(decomp[0]) !== -1 &&
			Action.dirs.indexOf(decomp[1]) !== -1
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

	/**
	 * Abreviates the notation of an action
	 *
	 * @param action an action to abreviate
	 * @returns a string containing the abreviation
	 */
	public static abrege(action: string): string {
		const a_index = Action.action_inverse.indexOf(action);
		if (a_index === -1) {
			throw new Error(`Illegal argument (${action})`);
		} else {
			const a_abrege = Action.action_abrege[a_index];
			return a_abrege;
		}
	}

	/**
	 * finds the normal action corresponding to an abreviated one.
	 *
	 * @param action_abregee an abreviated action to retrieve in normal form
	 * @returns a string containing the normal form
	 */
	public static abrege_inverse(action_abregee: string): string {
		const idx = Action.action_abrege.indexOf(action_abregee);
		
		if (idx === -1) {
			throw new Error(
				`This abreviated action is illegal (${action_abregee})`
			);
		} else {
			return Action.action_inverse[idx];
		}
	}
}
