import { Couleurs } from "./types";

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
			throw new Error(`the game needs 21 pieces and not ${coul.length}`);
		}
		let h = 0;
		let silo = 0;
		let contenu: Couleurs[] = [];
		for (let index = 0; index < coul.length; index++) {
			const element = coul[index] as Couleurs;
			if (
				element !== "R" &&
				element !== "B" &&
				element !== "G" &&
				element !== "X" &&
				element !== "Y"
			) {
				throw new Error(
					`attention ce caractère n'est pas admis (${element})`
				);
			}
			if (element === "X") {
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

		this.log.push("B1 DR");
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

		this.log.push("B2 DR");
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

		this.log.push("B1 GA");
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

		this.log.push("B2 GA");
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

		this.log.push(this.place_vide_silo + " UP");
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

		this.log.push(this.place_vide_silo + " DO");
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
	public getVide() {
		return `c ${this.place_vide_silo + 1} - h ${this.place_vide_h +1}`;
	}

	/**
	 * le log des différents mouvements effectués.
	 * @returns the log
	 */
	public getLog() {
		return this.log;
	}

	public resetLog() {
		this.log = [];
	}
}
