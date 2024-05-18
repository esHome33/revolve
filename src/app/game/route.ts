import Revolve from "@/lib/revolve";
import { MagicId } from "@/lib/types";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	const sp = req.nextUrl.searchParams;
	const game = sp.get("game");
	const moves_abreviated = sp.get("moves");
	if (!game || !moves_abreviated) {
		redirect("/");
	}

	const moves_detail = Revolve.desabreviate(moves_abreviated);
	//const moves2 = Revolve.traiteMovesBrut(moves_detail);
	let contenu = MagicId + "\n" + game + "\n\n" + moves_detail;
	const headers = new Headers();
	headers.set("Content-Type", "text/plain");
	headers.set("Content-Length", `${contenu.length}`);
	headers.set("Content-disposition", "attachment; filename=jeu.txt");

	return new NextResponse(contenu, {
		status: 200,
		headers: headers,
	});
}
