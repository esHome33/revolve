import Action from "./action";
import { RED, GREEN, BLUE, YELLOW, EMPTY, Couleurs } from "./types";

export default class Revolve {
	/**
	 * initial game
	 */
	readonly initial_game: string;
	private cols: Couleurs[][] = [];
	private place_vide_silo: number = 0;
	private place_vide_h: number = 5;
	private log: string[] = [];

	public prec_1: Couleurs[][] = [];
	public prec_2: Couleurs[][] = [];

	constructor(couleurs: string) {
		const cols_without_space = couleurs.replaceAll(" ", "");
		this.initial_game = couleurs;
		this.initCouleurs(cols_without_space);
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
				element !== RED &&
				element !== GREEN &&
				element !== BLUE &&
				element !== YELLOW &&
				element !== EMPTY
			) {
				throw new Error(
					`This character (${element}) is not a valid color`
				);
			}
			if (element === EMPTY) {
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
	 * when getting a file from backend, all the moves are on the same line
	 * This function separates all moves with a linefeed character.
	 *
	 * @param moves moves on one line (not separated)
	 * @returns moves separated with a \n character.
	 */
	static traiteMovesBrut(moves: string): string {
		let compteur = 0;
		let resu: string = "";
		for (let index = 0; index < moves.length; index++) {
			const element = moves[index];
			resu += element;
			if (compteur === 4) {
				resu += "\n";
				compteur = 0;
			} else {
				compteur++;
			}
		}
		return resu;
	}

	/**
	 * From a string containing abreviated moves produces all moves
	 * in detailed description and separated by libnefeeds and carriage returns.
	 * Theres no need to use {@link traiteMovesBrut}.
	 *
	 * @param moves_abreviated moves in abreviated form (1 char)
	 * @returns all the move in complete form and separated by libnefeeds and carriage returns
	 */
	static desabreviate(moves_abreviated: string) {
		let resu: string = "";
		for (let index = 0; index < moves_abreviated.length; index++) {
			const element = moves_abreviated[index];
			const move = Action.abrege_inverse(element);
			resu += move + "\n";
		}
		return resu;
	}

	/**
	 * droite_1 tourne à droite l'anneau 1
	 */
	public droite_1() {
		// met de coté les anciennes couleurs
		const ligne1 = [
			this.cols[0][1],
			this.cols[1][1],
			this.cols[2][1],
			this.cols[3][1],
		];
		const ligne2 = [
			this.cols[0][2],
			this.cols[1][2],
			this.cols[2][2],
			this.cols[3][2],
		];
		this.prec_1 = [];
		this.prec_1.push(ligne1);
		this.prec_1.push(ligne2);

		// effectue le mouvement de décalage vers la droite des lignes
		// 2 et 3 du jeu(la 1 reste fixe). Cela correspond aux indices 1 et 2
		// du tableau
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
		// met de coté les anciennes couleurs
		const ligne1 = [
			this.cols[0][3],
			this.cols[1][3],
			this.cols[2][3],
			this.cols[3][3],
		];
		const ligne2 = [
			this.cols[0][4],
			this.cols[1][4],
			this.cols[2][4],
			this.cols[3][4],
		];

		this.prec_2 = [];
		this.prec_2.push(ligne1);
		this.prec_2.push(ligne2);

		// effectue le décalage

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
		// met de coté les anciennes couleurs
		const ligne1 = [
			this.cols[0][1],
			this.cols[1][1],
			this.cols[2][1],
			this.cols[3][1],
		];
		const ligne2 = [
			this.cols[0][2],
			this.cols[1][2],
			this.cols[2][2],
			this.cols[3][2],
		];
		this.prec_1 = [];
		this.prec_1.push(ligne1);
		this.prec_1.push(ligne2);

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
		// met de coté les anciennes couleurs
		const ligne1 = [
			this.cols[0][3],
			this.cols[1][3],
			this.cols[2][3],
			this.cols[3][3],
		];
		const ligne2 = [
			this.cols[0][4],
			this.cols[1][4],
			this.cols[2][4],
			this.cols[3][4],
		];

		this.prec_2 = [];
		this.prec_2.push(ligne1);
		this.prec_2.push(ligne2);

		// effectue le décalage

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

		this.insereLog("0" + (this.place_vide_silo + 1) + " UP");
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
				const temp =
					this.cols[this.place_vide_silo][this.place_vide_h + 1];
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
				const temp =
					this.cols[this.place_vide_silo][this.place_vide_h + 1];
				this.cols[this.place_vide_silo][this.place_vide_h + 1] =
					this.cols[this.place_vide_silo][this.place_vide_h];
				this.cols[this.place_vide_silo][this.place_vide_h] = temp;
				this.place_vide_h = this.place_vide_h + 1;
			}
		}

		this.insereLog("0" + (this.place_vide_silo + 1) + " DO");
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
	 * Récupère les couleurs actuellement situées dans la
	 * bague 1 (silos 1, 2, 3 et 4, hauteurs 1 et 2).
	 *
	 * @returns les couleurs de la bague 1 (tableau de deux lignes
	 * contenant chacune 4 Couleurs des 4 colonnes)
	 */
	public get_bague1(): Couleurs[][] {
		const resu: Couleurs[][] = [];
		const ligne1 = [
			this.cols[0][1],
			this.cols[1][1],
			this.cols[2][1],
			this.cols[3][1],
		];
		const ligne2 = [
			this.cols[0][2],
			this.cols[1][2],
			this.cols[2][2],
			this.cols[3][2],
		];

		resu.push(ligne1);
		resu.push(ligne2);
		return resu;
	}

	/**
	 * Récupère les couleurs actuellement situées dans la
	 * bague 2 (silos 1, 2, 3 et 4, hauteurs 3 et 4).
	 *
	 * @returns les couleurs de la bague 2 (tableau de deux lignes
	 * contenant chacune 4 Couleurs des 4 colonnes)
	 */
	public get_bague2(): Couleurs[][] {
		const resu: Couleurs[][] = [];
		const ligne1 = [
			this.cols[0][3],
			this.cols[1][3],
			this.cols[2][3],
			this.cols[3][3],
		];
		const ligne2 = [
			this.cols[0][4],
			this.cols[1][4],
			this.cols[2][4],
			this.cols[3][4],
		];
		resu.push(ligne1);
		resu.push(ligne2);
		return resu;
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

			if (act_suiv.dir == "UP" || act_suiv.dir == "DO") {
				if (act_suiv.lieu === "01") {
					// vérifier si pas 5 up ou 5 do déjà dans le log !
					// ça annulerait le mouvement et faut vider les 5 derniers
					// éléments du log
					if (this.log.length > 4) {
						const check = this.verif_log5(act_suiv);
						if (check) {
							this.vide_log(5);
						} else {
							if (!act_suiv.isInverse(prec)) {
								this.log.push(action);
							} else {
								this.log.pop();
							}
						}
					} else {
						if (!act_suiv.isInverse(prec)) {
							this.log.push(action);
						} else {
							this.log.pop();
						}
					}
				} else {
					// vérifier si pas 4 up ou 4 do déjà dans le log !
					// ça annulerait le mouvement et faut vider les 4 derniers
					// éléments du log
					if (this.log.length > 3) {
						const check = this.verif_log4(act_suiv);
						if (check) {
							this.vide_log(4);
						} else {
							if (!act_suiv.isInverse(prec)) {
								this.log.push(action);
							} else {
								this.log.pop();
							}
						}
					} else {
						if (!act_suiv.isInverse(prec)) {
							this.log.push(action);
						} else {
							this.log.pop();
						}
					}
				}
			} else if (act_suiv.dir == "GA" || act_suiv.dir == "DR") {
				if (this.log.length > 2) {
					if (this.verif_log3(act_suiv)) {
						this.vide_log(3);
					} else {
						if (!act_suiv.isInverse(prec)) {
							this.log.push(action);
						} else {
							this.log.pop();
						}
					}
				} else {
					if (!act_suiv.isInverse(prec)) {
						this.log.push(action);
					} else {
						this.log.pop();
					}
				}
			} else {
				// ne devrait jamais arriver car il n'y a pas d'autres
				// mouvements que UP DO GA et DR !!
				if (!act_suiv.isInverse(prec)) {
					this.log.push(action);
				} else {
					this.log.pop();
				}
			}
		}
	}

	private verif_log5(action: Action): boolean {
		let resu: boolean = this.verif_log4(action);
		if (resu) {
			let i = this.log.length - 5;
			const a1 = this.log.at(i);
			if (a1) {
				if (a1 == action.toString()) {
					return true;
				} else return false;
			} else return false;
		} else {
			return false;
		}
	}

	private verif_log4(action: Action): boolean {
		let i = this.log.length - 1;
		const a1 = this.log.at(i--);
		if (a1) {
			if (a1 == action.toString()) {
				const a2 = this.log.at(i--);
				if (a2) {
					if (a1 != a2) {
						return false;
					} else {
						const a3 = this.log.at(i--);
						if (a3) {
							if (a2 != a3) {
								return false;
							} else {
								const a4 = this.log.at(i--);
								if (a4) {
									if (a4 == a3) {
										return true;
									} else return false;
								} else return false;
							}
						} else {
							return false;
						}
					}
				} else {
					return false;
				}
			} else {
				return false;
			}
		} else {
			return false;
		}
	}

	private verif_log3(action: Action): boolean {
		let i = this.log.length - 1;
		const a1 = this.log.at(i--);
		if (a1) {
			if (a1 == action.toString()) {
				const a2 = this.log.at(i--);
				if (a2) {
					if (a2 == a1) {
						const a3 = this.log.at(i);
						if (a3) {
							if (a3 == a2) {
								return true;
							} else return false;
						} else {
							return false;
						}
					} else {
						return false;
					}
				} else {
					return false;
				}
			} else {
				return false;
			}
		} else {
			return false;
		}
	}

	private vide_log(combien: number): void {
		for (let i = 0; i < combien; i++) {
			this.log.pop();
		}
	}

	public play_log(log: Action[]): void {
		for (let index = 0; index < log.length; index++) {
			const element = log[index];
			const el = element.toString() as
				| "01 UP"
				| "02 UP"
				| "03 UP"
				| "04 UP"
				| "01 DO"
				| "02 DO"
				| "03 DO"
				| "04 DO"
				| "B1 GA"
				| "B1 DR"
				| "B2 GA"
				| "B2 DR";
			switch (el) {
				case "01 DO":
				case "02 DO":
				case "03 DO":
				case "04 DO":
					this.down();
					break;
				case "01 UP":
				case "02 UP":
				case "03 UP":
				case "04 UP":
					this.up();
					break;
				case "B1 GA":
					this.gauche_1();
					break;
				case "B1 DR":
					this.droite_1();
					break;
				case "B2 GA":
					this.gauche_2();
					break;
				case "B2 DR":
					this.droite_2();
					break;
				default:
					break;
			}
		}
	}

	/**
	 * Get all the moves played in a single string. Moves are separated by '\n'.
	 *
	 * @returns all the moves logged in a single string.
	 */
	public getAllMoves(): string {
		let resu: string = "";

		for (let index = 0; index < this.log.length; index++) {
			const element = this.log[index];
			const elt_abrege = Action.abrege(element);
			const inv = Action.abrege_inverse(elt_abrege);
			if (inv !== element) {
				throw new Error(
					`INVERSION failed for ${element} and ${elt_abrege}`
				);
			}
			resu += elt_abrege;
		}
		return resu;
	}

	public getLogSize() {
		return this.log.length;
	}

	public to_string() {
		const c1 = this.get_col1();
		const c2 = this.get_col2();
		const c3 = this.get_col3();
		const c4 = this.get_col4();

		return c1 + " " + c2 + " " + c3 + " " + c4;
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
		if (col === RED) {
			return GREEN;
		} else if (col === GREEN) {
			return BLUE;
		} else if (col === BLUE) {
			return YELLOW;
		} else if (col === YELLOW) {
			return EMPTY;
		} else if (col === EMPTY) {
			return RED;
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
			column.forEach((char) => {
				if (char === RED) {
					col1_count++;
					total_items_count++;
				} else if (char === GREEN) {
					col2_count++;
					total_items_count++;
				} else if (char === BLUE) {
					col3_count++;
					total_items_count++;
				} else if (char === YELLOW) {
					col4_count++;
					total_items_count++;
				} else if (char === EMPTY) {
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
		else return false;
	}
}
