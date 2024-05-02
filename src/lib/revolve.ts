import Action from "./action";
import { Col1, Col2, Col3, Col4, ColVide, Couleurs } from "./types";

export default class Revolve {
	readonly colors: string;
	private cols: Couleurs[][] = [];
	private place_vide_silo: number = 0;
	private place_vide_h: number = 5;
	private log: string[] = [];

	constructor(couleurs: string) {
		this.colors = couleurs;
		this.initCouleurs(couleurs);
	}

	private initCouleurs = (coul: string) => {
		if (coul.length != 21) {
			throw new Error(
				`The game needs exactly 21 pieces and not ${coul.length}`
			);
		}
		let h = 0;
		let silo = 0;
		let contenu: Couleurs[] = [];
		for (let index = 0; index < coul.length; index++) {
			const element = coul[index] as Couleurs;
			if (
				element !== Col1 &&
				element !== Col2 &&
				element !== Col3 &&
				element !== Col4 &&
				element !== ColVide
			) {
				throw new Error(`This character (${element}) is not a valid color`);
			}
			if (element === ColVide) {
				// noter l'emplacement de la place vide
				this.place_vide_h = h;
				this.place_vide_silo = silo;
			}
			contenu.push(element);
			h++;
			if (h > 5 && silo === 0) {
				silo++;
				h = 0;
				this.cols.push(contenu);
				contenu = [];
			} else if (h > 4 && silo > 0) {
				silo++;
				h = 0;
				this.cols.push(contenu);
				contenu = [];
			}
		}
	};

	/**
	 * droite_1 tourne à droite l'anneau 1
	 */
	public droite_1() {
		const c1 = this.cols[3][1];
		const c2 = this.cols[3][2];

		this.cols[3][1] = this.cols[2][1];
		this.cols[3][2] = this.cols[2][2];

		this.cols[2][1] = this.cols[1][1];
		this.cols[2][2] = this.cols[1][2];

		this.cols[1][1] = this.cols[0][1];
		this.cols[1][2] = this.cols[0][2];

		this.cols[0][1] = c1;
		this.cols[0][2] = c2;

		if (this.isVideInBague1()) {
			this.tourneVide();
		}

		this.insereLog("B1 DR");
	}

	/**
	 * droite_2 tourne à droite l'anneau 2
	 */
	public droite_2() {
		const c1 = this.cols[3][3];
		const c2 = this.cols[3][4];

		this.cols[3][3] = this.cols[2][3];
		this.cols[3][4] = this.cols[2][4];

		this.cols[2][3] = this.cols[1][3];
		this.cols[2][4] = this.cols[1][4];

		this.cols[1][3] = this.cols[0][3];
		this.cols[1][4] = this.cols[0][4];

		this.cols[0][3] = c1;
		this.cols[0][4] = c2;

		if (this.isVideInBague2()) {
			this.tourneVide();
		}

		this.insereLog("B2 DR");
	}

	/**
	 * tourne à gauche la première bague
	 */
	public gauche_1() {
		const c1 = this.cols[0][1];
		const c2 = this.cols[0][2];

		this.cols[0][1] = this.cols[1][1];
		this.cols[0][2] = this.cols[1][2];

		this.cols[1][1] = this.cols[2][1];
		this.cols[1][2] = this.cols[2][2];

		this.cols[2][1] = this.cols[3][1];
		this.cols[2][2] = this.cols[3][2];

		this.cols[3][1] = c1;
		this.cols[3][2] = c2;

		if (this.isVideInBague1()) {
			this.tourneVide(false);
		}

		this.insereLog("B1 GA");
	}

	/**
	 * tourne à gauche la 2e bague
	 */
	public gauche_2() {
		const c1 = this.cols[0][3];
		const c2 = this.cols[0][4];

		this.cols[0][3] = this.cols[1][3];
		this.cols[0][4] = this.cols[1][4];

		this.cols[1][3] = this.cols[2][3];
		this.cols[1][4] = this.cols[2][4];

		this.cols[2][3] = this.cols[3][3];
		this.cols[2][4] = this.cols[3][4];

		this.cols[3][3] = c1;
		this.cols[3][4] = c2;

		if (this.isVideInBague2()) {
			this.tourneVide(false);
		}

		this.insereLog("B2 GA");
	}

	public up() {
		if (this.place_vide_h === 0) {
			if (this.place_vide_silo === 0) {
				// échange 0 et 5
				const temp = this.cols[this.place_vide_silo][0];
				this.cols[this.place_vide_silo][0] =
					this.cols[this.place_vide_silo][1];
				this.cols[this.place_vide_silo][1] =
					this.cols[this.place_vide_silo][2];
				this.cols[this.place_vide_silo][2] =
					this.cols[this.place_vide_silo][3];
				this.cols[this.place_vide_silo][3] =
					this.cols[this.place_vide_silo][4];
				this.cols[this.place_vide_silo][4] =
					this.cols[this.place_vide_silo][5];
				this.cols[this.place_vide_silo][5] = temp;
				this.place_vide_h = 5;
			} else {
				// échange 0 et 4
				const temp = this.cols[this.place_vide_silo][0];
				this.cols[this.place_vide_silo][0] =
					this.cols[this.place_vide_silo][1];
				this.cols[this.place_vide_silo][1] =
					this.cols[this.place_vide_silo][2];
				this.cols[this.place_vide_silo][2] =
					this.cols[this.place_vide_silo][3];
				this.cols[this.place_vide_silo][3] =
					this.cols[this.place_vide_silo][4];
				this.cols[this.place_vide_silo][4] = temp;
				this.place_vide_h = 4;
			}
		} else {
			// échange h-1 et h
			const temp = this.cols[this.place_vide_silo][this.place_vide_h - 1];
			this.cols[this.place_vide_silo][this.place_vide_h - 1] =
				this.cols[this.place_vide_silo][this.place_vide_h];
			this.cols[this.place_vide_silo][this.place_vide_h] = temp;
			this.place_vide_h = this.place_vide_h - 1;
		}

		this.insereLog(this.place_vide_silo + 1 + " UP");
	}

	public down() {
		if (this.place_vide_silo === 0) {
			if (this.place_vide_h === 5) {
				// échange 0 et 5
				const tmp = this.cols[this.place_vide_silo][0];
				this.cols[this.place_vide_silo][0] =
					this.cols[this.place_vide_silo][5];
				this.cols[this.place_vide_silo][5] =
					this.cols[this.place_vide_silo][4];
				this.cols[this.place_vide_silo][4] =
					this.cols[this.place_vide_silo][3];
				this.cols[this.place_vide_silo][3] =
					this.cols[this.place_vide_silo][2];
				this.cols[this.place_vide_silo][2] =
					this.cols[this.place_vide_silo][1];
				this.cols[this.place_vide_silo][1] = tmp;

				this.place_vide_h = 0;
			} else {
				// échange h et h+1
				const temp = this.cols[this.place_vide_silo][this.place_vide_h + 1];
				this.cols[this.place_vide_silo][this.place_vide_h + 1] =
					this.cols[this.place_vide_silo][this.place_vide_h];
				this.cols[this.place_vide_silo][this.place_vide_h] = temp;
				this.place_vide_h = this.place_vide_h + 1;
			}
		} else {
			if (this.place_vide_h === 4) {
				// échange 0 et 4
				const tmp = this.cols[this.place_vide_silo][0];
				this.cols[this.place_vide_silo][0] =
					this.cols[this.place_vide_silo][4];
				this.cols[this.place_vide_silo][4] =
					this.cols[this.place_vide_silo][3];
				this.cols[this.place_vide_silo][3] =
					this.cols[this.place_vide_silo][2];
				this.cols[this.place_vide_silo][2] =
					this.cols[this.place_vide_silo][1];
				this.cols[this.place_vide_silo][1] = tmp;
				this.place_vide_h = 0;
			} else {
				// échange h et h+1
				const temp = this.cols[this.place_vide_silo][this.place_vide_h + 1];
				this.cols[this.place_vide_silo][this.place_vide_h + 1] =
					this.cols[this.place_vide_silo][this.place_vide_h];
				this.cols[this.place_vide_silo][this.place_vide_h] = temp;
				this.place_vide_h = this.place_vide_h + 1;
			}
		}

		this.insereLog(this.place_vide_silo + 1 + " DO");
	}

	public isVideInBague1(): boolean {
		return this.place_vide_h === 1 || this.place_vide_h === 2;
	}

	public isVideInBague2(): boolean {
		return this.place_vide_h === 3 || this.place_vide_h === 4;
	}

	public tourneVide(droite: boolean = true) {
		if (droite) {
			const pos_courante = this.place_vide_silo;
			if (pos_courante === 3) {
				this.place_vide_silo = 0;
			} else {
				this.place_vide_silo = pos_courante + 1;
			}
		} else {
			const pos_courante = this.place_vide_silo;
			if (pos_courante === 0) {
				this.place_vide_silo = 3;
			} else {
				this.place_vide_silo = pos_courante - 1;
			}
		}
	}

	/**
	 * Insère intelligemment une action dans le log.
	 * L'intelligence est de ne pas ajouter une action qui est l'inverse
	 * de l'action précédente (et de supprimer l'action précédente)
	 *
	 * @param action action à insérer dans le log
	 */
	public insereLog(action: string): void {
		if (this.log.length === 0) {
			this.log.push(action);
		} else {
			const act_suiv = new Action(action);
			const prec = this.log[this.log.length - 1];

			if (!act_suiv.isInverse(prec)) {
				this.log.push(action);
			} else {
				this.log.pop();
			}
		}
	}

	public to_string() {
		const c1 = this.get_col1();
		const c2 = this.get_col2();
		const c3 = this.get_col3();
		const c4 = this.get_col4();

		return c1 + c2 + c3 + c4;
	}

	public get_col1(): string {
		return (
			this.cols[0][0] +
			this.cols[0][1] +
			this.cols[0][2] +
			this.cols[0][3] +
			this.cols[0][4] +
			this.cols[0][5]
		);
	}
	public get_col2(): string {
		return (
			this.cols[1][0] +
			this.cols[1][1] +
			this.cols[1][2] +
			this.cols[1][3] +
			this.cols[1][4]
		);
	}
	public get_col3(): string {
		return (
			this.cols[2][0] +
			this.cols[2][1] +
			this.cols[2][2] +
			this.cols[2][3] +
			this.cols[2][4]
		);
	}
	public get_col4(): string {
		return (
			this.cols[3][0] +
			this.cols[3][1] +
			this.cols[3][2] +
			this.cols[3][3] +
			this.cols[3][4]
		);
	}

	/**
	 * Décrit le silo et la hauteur où se trouve la cellule vide
	 * @returns a string giving the place of empty cell
	 */
	public getVidePosition() {
		return `c ${this.place_vide_silo + 1} - h ${this.place_vide_h + 1}`;
	}

	/**
	 * le log des différents mouvements effectués.
	 * @returns the log
	 */
	public getLog() {
		return this.log;
	}

	/**
	 * fixe le log à la valeur fournie en paramètre
	 * @param current un nouveau log a mémoriser
	 */
	public setLog(current: string[]): void {
		this.log = current;
	}

	/**
	 * Reset le log
	 */
	public resetLog() {
		this.log = [];
	}

	public edit_color(silo: number, hauteur: number) {
		if (silo === 0) {
			if (hauteur >= 0 && hauteur < 6) {
				const couleur_a_changer = this.cols[silo][hauteur];
				const next_color = this.get_next_color(couleur_a_changer);
				this.cols[silo][hauteur] = next_color;
			} else {
				throw new Error(
					`Argument Exception : incorrect value of hauteur (${hauteur}) for silo = ${silo}`
				);
			}
		} else if (silo > 0) {
			if (hauteur >= 0 && hauteur < 5) {
				const couleur_a_changer = this.cols[silo][hauteur];
				const next_color = this.get_next_color(couleur_a_changer);
				this.cols[silo][hauteur] = next_color;
			} else {
				throw new Error(
					`Argument Exception : incorrect value of hauteur (${hauteur}) for silo = ${silo}`
				);
			}
		} else {
			throw new Error(
				`Argument Exception : incorrect value of silo (${silo}) `
			);
		}
	}

	private get_next_color(col: string): Couleurs {
		if (col === Col1) {
			return Col2;
		} else if (col === Col2) {
			return Col3;
		} else if (col === Col3) {
			return Col4;
		} else if (col === Col4) {
			return ColVide;
		} else if (col === ColVide) {
			return Col1;
		} else {
			throw new Error(
				`Argument Exception : ${col} n'est pas une couleur admise`
			);
		}
	}

	/**
	 * Check the validity of the colors array.
	 * There must be only 1 empty space, 21 colors (including empty color) 
	 * and exactly 5 items of each of the 4 colors.
	 * 
	 * @returns TRUE if theres only 1 empty space, 21 items and exactly 5 items of each of the 4 colors.
	 */
	public check_colors(): boolean {
		let empty_count = 0;
		let total_items_count = 0;
		let col1_count = 0;
		let col2_count = 0;
		let col3_count = 0;
		let col4_count = 0;
		for (let silo = 0; silo < 4; silo++) {
			const column = this.cols[silo];
			column.forEach(char => {
				if (char === Col1) {
					col1_count++;
					total_items_count++;
				} else if (char === Col2) {
					col2_count++;
					total_items_count++;
				} else if (char === Col3) {
					col3_count++;
					total_items_count++;
				} else if (char === Col4) {
					col4_count++;
					total_items_count++;
				} else if (char === ColVide) {
					empty_count++;
					total_items_count++;
				} else {
					return false;
				}
			});
		}
		if (
			total_items_count === 21 &&
			col1_count === 5 &&
			col2_count === 5 &&
			col3_count === 5 &&
			col4_count === 5 &&
			empty_count === 1
		)
			return true;
		else
			return false;
	}
}
