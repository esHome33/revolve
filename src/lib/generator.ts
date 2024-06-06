export default function random_game(): string {
	const prechauffe = 5 + Math.random() * 30;
	let rnd: number;
	for (let i = 0; i < prechauffe; i++) {
		rnd = Math.random() * 21;
	}

	let dispo: string[] = [
		"R",
		"Y",
		"R",
		"R",
		"Y",
		"R",
		"X",
		"R",
		"B",
		"G",
		"B",
		"G",
		"Y",
		"G",
		"B",
		"G",
		"Y",
		"G",
		"B",
		"B",
		"Y",
	];
	let generated: string[] = [];
	let taille: number = dispo.length;
	while (taille > 1) {
		taille = dispo.length;
		rnd = Math.random();
		rnd *= taille;
		const index = Number(rnd.toFixed(0));
		const car = dispo[index];
		if (car !== undefined) {
			generated.push(car);
			dispo.splice(index, 1);
		}
    }
    const dernier = dispo[0];
    if (dernier) {
        generated.push(dernier);
    }

	let resu: string = "";
	for (let j = 0; j < generated.length; j++) {
		const lettre = generated[j];
		if (j === 6) {
			resu += " " + lettre;
		} else if (j === 11) {
			resu += " " + lettre;
		} else if (j === 16) {
			resu += " " + lettre;
		} else {
			resu += lettre;
		}
	}
	return resu;
}
