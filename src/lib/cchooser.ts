import { Couleurs } from "./types";

export type CompteCouleurs = {
	X: number;
	R: number;
	G: number;
	B: number;
	Y: number;
};

export type CouleurQte = {
	color: string;
	nb: number;
};

export type SolucePondere = {
	motif: string;
	poids: number;
};

export default class CChooser {
	/**
	 * construit un nouveau color chooser : à partir d'une chaine de description de jeu,
	 * cette classe fournit les différents choix possibles pour l'ordre des couleurs R,G,B et Y.
	 * On regarde les couleurs par colonne (silo) et on tourne les bagues 1 et 2,
	 * pour faire ce choix
	 */
	constructor(desc: string) {
		const cols_without_space = desc.replaceAll(" ", "");
		this.initial_description = desc;
		this.colors = CChooser.initialise(cols_without_space);
	}

	public initial_description: string;
	public colors: Couleurs[][];

	private static initialise(desc: string): Couleurs[][] {
		const resu: Couleurs[][] = [];
		let silo = 0;
		let h = 0;
		for (let i = 0; i < 21; i++) {
			if (h == 0) {
				resu[silo] = [];
			}
			const lettr = desc[i].toUpperCase();
			const lettre = desc[i] as Couleurs;
			if (!lettre) {
				throw new Error(`${lettr} couleur inconnue`);
			}
			resu[silo].push(lettre);
			if (silo === 0 && h === 5) {
				silo = 1;
				h = 0;
			} else if (silo > 0 && h === 4) {
				silo++;
				h = 0;
			} else {
				h++;
			}
		}
		return resu;
	}

	public static ToString(colors: Couleurs[][]): string {
		let resu: string = "";
		for (let silo = 0; silo < 4; silo++) {
			const h_max = silo === 0 ? 6 : 5;
			for (let h = 0; h < h_max; h++) {
				resu += colors[silo][h];
			}
			resu += " ";
		}
		resu = resu.trim();
		return resu;
	}

	/**
	 * Réalise le mouvement vers le haut de la case vide
	 *
	 * @param colors les couleurs du jeu
	 * @returns un nouveau tableau de couleurs du jeu modifié
	 */
	public static up(colors: Couleurs[][]): Couleurs[][] {
		const resu: Couleurs[][] = [];
		for (let silo = 0; silo < 4; silo++) {
			const h_max = silo === 0 ? 6 : 5;
			resu[silo] = [];
			for (let h = 0; h < h_max; h++) {
				const coul = colors[silo][h];
				if (coul === "X") {
					const colonne = this.decale(colors, silo, h, true);
					// on recopie le décalage dans le resu.
					for (let index = 0; index < colonne.length; index++) {
						const element = colonne[index];
						resu[silo].push(element);
					}
					// et on arrête de traiter les h dans le silo courant
					// et on passe au silo suivant.
					continue;
				} else {
					// on recopie dans le resu tel quel
					resu[silo].push(coul);
				}
			}
		}
		return resu;
	}

	/**
	 * Réalise le mouvement vers le bas de la case vide
	 *
	 * @param colors les couleurs du jeu
	 * @returns un nouveau tableau de couleurs du jeu modifié
	 */
	public static down(colors: Couleurs[][]): Couleurs[][] {
		const resu: Couleurs[][] = [];
		for (let silo = 0; silo < 4; silo++) {
			const h_max = silo === 0 ? 6 : 5;
			resu[silo] = [];
			for (let h = 0; h < h_max; h++) {
				const coul = colors[silo][h];
				if (coul === "X") {
					const colonne = this.decale(colors, silo, h, false);
					// on recopie le décalage dans le resu.
					for (let index = 0; index < colonne.length; index++) {
						const element = colonne[index];
						resu[silo].push(element);
					}
					// et on arrête de traiter les h dans le silo courant
					// et on passe au silo suivant.
					continue;
				} else {
					// on recopie dans le resu tel quel
					resu[silo].push(coul);
				}
			}
		}
		return resu;
	}

	/**
	 * décalage vers le haut ou vers le bas de la place vide dans un silo donné
	 *
	 * @param col le tableau des couleurs
	 * @param silo le numéro de silo où se trouve la case vide
	 * @param h_vide la hauteur dans le silo où se trouve la case vide
	 * @param vers_haut si on veut décaler vers le haut ou vers le bas
	 */
	private static decale(
		col: Couleurs[][],
		silo: number,
		h_vide: number,
		vers_haut: boolean
	): Couleurs[] {
		const actu: Couleurs[] = [];
		const h_max = silo === 0 ? 6 : 5;
		const vide_en_haut = h_vide === 0;
		const vide_en_bas = h_vide === h_max;

		/// on recopie le silo en question dans notre variable
		for (let i = 0; i < h_max; i++) {
			actu.push(col[silo][i]);
		}

		/// suivant les cas on décale tout vers le haut, tout vers le bas,
		/// ou on permute juste deux cases.
		if (vide_en_bas && !vers_haut) {
			for (let i = 1; i < h_max; i++) {
				actu[i] = actu[i - 1];
			}
			actu[0] = "X";
		} else if (vide_en_haut && vers_haut) {
			for (let i = h_max; i > 0; i--) {
				actu[i - 1] = actu[i];
			}
			actu[h_max] = "X";
		} else {
			if (vide_en_bas) {
				// et on veut monter : permut entre h_max et h_max - 1
				actu[h_max] = actu[h_max - 1];
				actu[h_max - 1] = "X";
			} else if (vide_en_haut) {
				// et on veut descendre : permut entre 0 et 1
				actu[0] = actu[1];
				actu[1] = "X";
			} else {
				/// on permute deux cases dont la vide
				if (vers_haut) {
					actu[h_vide] = actu[h_vide - 1];
					actu[h_vide - 1] = "X";
				} else {
					actu[h_vide] = actu[h_vide + 1];
					actu[h_vide + 1] = "X";
				}
			}
		}

		/// on retourne la colonne
		return actu;
	}

	public static right_1(colors: Couleurs[][]): Couleurs[][] {
		const resu: Couleurs[][] = [];
		/// copie du tableau
		for (let silo = 0; silo < 4; silo++) {
			const h_max = silo === 0 ? 6 : 5;
			resu[silo] = [];
			for (let h = 0; h < h_max; h++) {
				resu[silo].push(colors[silo][h]);
			}
		}
		/// rotation vers la droite de la bague 1
		const c1 = resu[3][1];
		const c2 = resu[3][2];

		for (let silo = 3; silo > 0; silo--) {
			resu[silo][1] = resu[silo - 1][1];
			resu[silo][2] = resu[silo - 1][2];
		}
		resu[0][1] = c1;
		resu[0][2] = c2;

		return resu;
	}

	public static right_2(colors: Couleurs[][]): Couleurs[][] {
		const resu: Couleurs[][] = [];
		/// copie du tableau
		for (let silo = 0; silo < 4; silo++) {
			const h_max = silo === 0 ? 6 : 5;
			resu[silo] = [];
			for (let h = 0; h < h_max; h++) {
				resu[silo].push(colors[silo][h]);
			}
		}
		/// rotation vers la droite de la bague 2
		const c1 = resu[3][3];
		const c2 = resu[3][4];

		for (let silo = 3; silo > 0; silo--) {
			resu[silo][3] = resu[silo - 1][3];
			resu[silo][4] = resu[silo - 1][4];
		}
		resu[0][3] = c1;
		resu[0][4] = c2;

		return resu;
	}

	public static left_1(colors: Couleurs[][]): Couleurs[][] {
		const resu: Couleurs[][] = [];
		/// copie du tableau
		for (let silo = 0; silo < 4; silo++) {
			const h_max = silo === 0 ? 6 : 5;
			resu[silo] = [];
			for (let h = 0; h < h_max; h++) {
				resu[silo].push(colors[silo][h]);
			}
		}
		/// rotation vers la gauche de la bague 1
		const c1 = resu[0][1];
		const c2 = resu[0][2];

		for (let silo = 0; silo < 3; silo++) {
			resu[silo][1] = resu[silo + 1][1];
			resu[silo][2] = resu[silo + 1][2];
		}
		resu[3][1] = c1;
		resu[3][2] = c2;

		return resu;
	}

	public static left_2(colors: Couleurs[][]): Couleurs[][] {
		const resu: Couleurs[][] = [];
		/// copie du tableau
		for (let silo = 0; silo < 4; silo++) {
			const h_max = silo === 0 ? 6 : 5;
			resu[silo] = [];
			for (let h = 0; h < h_max; h++) {
				resu[silo].push(colors[silo][h]);
			}
		}
		/// rotation vers la gauche de la bague 2
		const c1 = resu[0][3];
		const c2 = resu[0][4];

		for (let silo = 0; silo < 3; silo++) {
			resu[silo][3] = resu[silo + 1][3];
			resu[silo][4] = resu[silo + 1][4];
		}
		resu[3][3] = c1;
		resu[3][4] = c2;

		return resu;
	}

	public static choix_couleurs(jeu: string): SolucePondere[] {
		let resu: SolucePondere[] = [];

		const coucou: Couleurs[][][] = [];
		const ch: CChooser = new CChooser(jeu);
		coucou.push(ch.colors);
		const ch_1 = CChooser.right_1(ch.colors);
		coucou.push(ch_1);
		const ch_11 = CChooser.right_1(ch_1);
		coucou.push(ch_11);
		const ch_12 = CChooser.right_1(ch_11);
		coucou.push(ch_12);
		const ch_4 = CChooser.right_2(ch.colors);
		coucou.push(ch_4);
		const ch_41 = CChooser.right_1(ch_4);
		coucou.push(ch_41);
		const ch_42 = CChooser.right_1(ch_41);
		coucou.push(ch_42);
		const ch_43 = CChooser.right_1(ch_42);
		coucou.push(ch_43);
		const ch_5 = CChooser.right_2(ch_4);
		coucou.push(ch_5);
		const ch_51 = CChooser.right_1(ch_5);
		coucou.push(ch_51);
		const ch_52 = CChooser.right_1(ch_51);
		coucou.push(ch_52);
		const ch_53 = CChooser.right_1(ch_52);
		coucou.push(ch_53);
		const ch_6 = CChooser.right_2(ch_5);
		coucou.push(ch_6);
		const ch_61 = CChooser.right_1(ch_6);
		coucou.push(ch_61);
		const ch_62 = CChooser.right_1(ch_61);
		coucou.push(ch_62);
		const ch_63 = CChooser.right_1(ch_62);
		coucou.push(ch_63);
		// on va chercher les couleurs de chaque tableau
		const liste_de_resultats: string[] = [];
		coucou.forEach((tab) => {
			const res = CChooser.cherche_best_color_scheme(tab);
			for (let i = 0; i < res.length; i++) {
				const element = res[i];
				if (element !== "no color scheme")
					liste_de_resultats.push(element);
			}
		});
		// on va traiter la liste brute en créant une liste de SolucePondere
		// en vérifiant que l'on rajoute le poids le plus élevé pour chaque
		// motif.
		// on va garder en mémoire le différents motifs stockés dans le résultat
		const motifs: string[] = [];
		liste_de_resultats.forEach((elt) => {
			const sp = CChooser.traite_element(elt);
			const mot = sp.motif;
			const pd = sp.poids;
			if (motifs.includes(mot)) {
				// on cherche le motif dans la liste resu
				const index_mot = resu.findIndex((elt) => {
					return elt.motif === mot;
				});
				// si le motif y est déjà on va vérifier le poids
				if (index_mot > -1) {
					const motif_stocke = resu[index_mot];
					if (motif_stocke.poids < pd) {
						// on met à jour le poids stocké
						resu[index_mot].poids = pd;
					}
				} else {
					// normalement, on ne devrait pas arriver ici car
					// resu contient le motif "mot", et il y a donc
					// forcément un index trouvé
				}
			} else {
				// on n'a pas encore ce motif dans resu : on stocke !
				motifs.push(mot);
				resu.push(sp);
			}
		});

		// on trie la liste de SolucePondere dans l'ordre des poids de chaque
		// ordre de couleurs
		resu = resu.sort((a, b) => {
			return b.poids - a.poids;
		});

		return resu;
	}

	private static traite_element(elt: string): SolucePondere {
		let resu: SolucePondere;
		const compo = elt.split("(");
		// cas où on n'a pas une couleur et un poids dans le texte elt fourni
		if (compo.length !== 2) {
			return {
				motif: "",
				poids: 0,
			};
		}
		//
		let motif = compo[0].replace(" ", "");
		// on veut que la couleur débute toujours par Red
		let c = motif[0];
		while (c !== "R") {
			motif = CChooser.rotate(motif);
			c = motif[0];
		}
		//
		resu = {
			motif: motif,
			poids: Number(compo[1].replace(")", "").replace(" ", "")),
		};
		return resu;
	}

	private static rotate(couleurs: string): string {
		let resu = "";
		for (let i = 0; i < 4; i++) {
			const m = (i + 1) % 4;
			resu += couleurs[m];
		}
		return resu;
	}

	public static cherche_best_color_scheme(jeu: Couleurs[][]): string[] {
		let compte1: CompteCouleurs = { B: 0, G: 0, R: 0, X: 0, Y: 0 };
		let compte2: CompteCouleurs = { B: 0, G: 0, R: 0, X: 0, Y: 0 };
		let compte3: CompteCouleurs = { B: 0, G: 0, R: 0, X: 0, Y: 0 };
		let compte4: CompteCouleurs = { B: 0, G: 0, R: 0, X: 0, Y: 0 };
		compte1 = CChooser.countColorsInSilo(jeu[0]);
		compte2 = CChooser.countColorsInSilo(jeu[1]);
		compte3 = CChooser.countColorsInSilo(jeu[2]);
		compte4 = CChooser.countColorsInSilo(jeu[3]);
		const max1: CouleurQte = CChooser.getMax(compte1);
		const max2: CouleurQte = CChooser.getMax(compte2);
		const max3: CouleurQte = CChooser.getMax(compte3);
		const max4: CouleurQte = CChooser.getMax(compte4);

		const max1b: CouleurQte = CChooser.getMax(compte1, 1);
		const max2b: CouleurQte = CChooser.getMax(compte2, 1);
		const max3b: CouleurQte = CChooser.getMax(compte3, 1);
		const max4b: CouleurQte = CChooser.getMax(compte4, 1);

		const chk1 = CChooser.checkIfAllDifferentColors(max1, max2, max3, max4);
		const chk2 = CChooser.checkIfAllDifferentColors(
			max1b,
			max2b,
			max3b,
			max4b
		);

		const txt1 = `${max1.color}${max2.color}${max3.color}${max4.color} (${
			max1.nb + max2.nb + max3.nb + max4.nb
		})`;
		const txt2 = `${max1b.color}${max2b.color}${max3b.color}${
			max4b.color
		} (${max1b.nb + max2b.nb + max3b.nb + max4b.nb})`;

		const resu: string[] = [];
		if (chk1 && chk2) {
			resu.push(txt1);
			resu.push(txt2);
		} else if (chk1) {
			resu.push(txt1);
		} else if (chk2) {
			resu.push(txt2);
		} else {
			resu.push("no color scheme");
		}
		return resu;
	}

	private static checkIfAllDifferentColors(
		c1: CouleurQte,
		c2: CouleurQte,
		c3: CouleurQte,
		c4: CouleurQte
	): boolean {
		const col1 = c1.color;
		const col2 = c2.color;
		const col3 = c3.color;
		const col4 = c4.color;

		const resu =
			col1 !== col2 &&
			col1 !== col3 &&
			col1 !== col4 &&
			col2 !== col3 &&
			col2 !== col4 &&
			col3 !== col4;
		return resu;
	}

	private static getMax: (
		compte: CompteCouleurs,
		ordre?: number
	) => CouleurQte = (compte, ordre) => {
		const cq1: CouleurQte = { color: "B", nb: compte["B"] };
		const cq2: CouleurQte = { color: "R", nb: compte["R"] };
		const cq3: CouleurQte = { color: "G", nb: compte["G"] };
		const cq4: CouleurQte = { color: "Y", nb: compte["Y"] };
		const cq5: CouleurQte = { color: "X", nb: compte["X"] };

		const liste: CouleurQte[] = [];
		liste.push(cq1, cq2, cq3, cq4, cq5);

		liste.sort((a, b) => {
			return b.nb - a.nb;
		});

		if (ordre === undefined) {
			return liste[0];
		} else {
			return liste[ordre];
		}
	};

	/**
	 * Compte les couleurs du tableau de jeu, ligne par ligne
	 *
	 * @param cols tableau de jeu
	 * @returns un compte de couleurs pour chaque ligne (il y en a 6 dans un jeu,
	 * avec une seule couleur dans la ligne 6)
	 */
	private countColorsInTab_Line_Line(cols: Couleurs[][]): CompteCouleurs[] {
		const cc: CompteCouleurs[] = []; /// compte par ligne
		let line_0: CompteCouleurs = { B: 0, G: 0, R: 0, X: 0, Y: 0 };
		let line_1: CompteCouleurs = { B: 0, G: 0, R: 0, X: 0, Y: 0 };
		let line_2: CompteCouleurs = { B: 0, G: 0, R: 0, X: 0, Y: 0 };
		let line_3: CompteCouleurs = { B: 0, G: 0, R: 0, X: 0, Y: 0 };
		let line_4: CompteCouleurs = { B: 0, G: 0, R: 0, X: 0, Y: 0 };
		let line_5: CompteCouleurs = { B: 0, G: 0, R: 0, X: 0, Y: 0 };

		for (let silo = 0; silo < 4; silo++) {
			line_0 = this.addColorToCount(line_0, cols[silo][0]);
			line_1 = this.addColorToCount(line_1, cols[silo][1]);
			line_2 = this.addColorToCount(line_2, cols[silo][2]);
			line_3 = this.addColorToCount(line_3, cols[silo][3]);
			line_4 = this.addColorToCount(line_4, cols[silo][4]);
			if (silo === 0) {
				line_5 = this.addColorToCount(line_5, cols[silo][5]);
			}
		}
		cc.push(line_0, line_1, line_2, line_3, line_4, line_5);
		return cc;
	}

	/**
	 * Compte les couleurs dans un silo
	 * @param silo les couleurs du silo
	 * @returns un compte par couleur
	 */
	private static countColorsInSilo(silo: Couleurs[]): CompteCouleurs {
		let resu: CompteCouleurs = {
			X: 0,
			B: 0,
			G: 0,
			R: 0,
			Y: 0,
		};

		for (let i = 0; i < silo.length; i++) {
			resu[silo[i]]++;
		}

		return resu;
	}

	private addColorToCount(
		compte: CompteCouleurs,
		color: Couleurs
	): CompteCouleurs {
		let resu: CompteCouleurs = {
			X: 0,
			B: 0,
			G: 0,
			R: 0,
			Y: 0,
		};

		resu["X"] = compte["X"] + (color === "X" ? 1 : 0);
		resu["B"] = compte["B"] + (color === "B" ? 1 : 0);
		resu["G"] = compte["G"] + (color === "G" ? 1 : 0);
		resu["R"] = compte["R"] + (color === "R" ? 1 : 0);
		resu["Y"] = compte["Y"] + (color === "Y" ? 1 : 0);

		return resu;
	}
}
