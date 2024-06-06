import Revolve from "@/lib/revolve";
import { MagicId } from "@/lib/types";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	const sp = req.nextUrl.searchParams;
	const game = sp.get("game");
	const moves_abreviated = sp.get("moves");
	const cps = sp.get("cps");
	if (!game || !moves_abreviated || !cps) {
		redirect("/");
	} else {
		const moves_detail = Revolve.desabreviate(moves_abreviated);
		let contenu = MagicId + "\n" + game + "\n\n" + moves_detail;
		const headers = new Headers();
		headers.set("Content-Type", "text/plain");
		headers.set("Content-Length", `${contenu.length}`);
		headers.set("Content-disposition", `attachment; filename=jeu ${game} ${cps}.txt`);

		return new NextResponse(contenu, {
			status: 200,
			headers: headers,
		});
	}
}
