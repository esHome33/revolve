'use client'

import CheckComponent from "@/components/checkcomp";
import Inputs from "@/components/inputs";
import Loglist from "@/components/loglist";
import RevolveGame from "@/components/revolve";
import Revolve from "@/lib/revolve";
import { useState } from "react";

export default function Home() {

  const [myRev, setMyRev] = useState(new Revolve("XRGGYYRBRYBGBGGBRBYRY"));
  const [actionLog, setActionLog] = useState<string[]>([]);
  const [check, setCheck] = useState<boolean>(true);
  //let myRev = new Revolve("RRRRRXGGGGGBBBBBYYYYY");
  //let myRev = new Revolve("RYYYYXGBBBBBYYYYYRRRR");
  //let myRev = new Revolve("RGGGGXGBBBBBYYYYYRRRR");
  //let myRev = new Revolve("XRGGYYRBRYBGBGGBRBYRY");


  const str = myRev.getVidePosition();

  const cree_nouveau = () => {
    const new_rev_str = myRev.to_string();
    const old_log = myRev.getLog();
    const new_rev = new Revolve(new_rev_str);
    new_rev.setLog(old_log);
    setActionLog(old_log);
    setMyRev(new_rev);
  }

  const check_board = () => {
    const resu = myRev.check_colors();
    setCheck(()=>resu);
  }

  const B1_DR = () => {
    myRev.droite_1();
    cree_nouveau();
  }
  const B1_GA = () => {
    myRev.gauche_1();
    cree_nouveau();
  }
  const B2_DR = () => {
    myRev.droite_2();
    cree_nouveau();
  }
  const B2_GA = () => {
    myRev.gauche_2();
    cree_nouveau();
  }
  const MOVE_UP = () => {
    myRev.up();
    cree_nouveau();
  }
  const MOVE_DOWN = () => {
    myRev.down();
    cree_nouveau();
  }

  const reset = () => {
    setMyRev(new Revolve("RGGGGXGBBBBBYYYYYRRRR"));
    setActionLog([]);
    setCheck(true);
  }

  const color_editor = (silo: number, haut: number) => {
    myRev.edit_color(silo, haut);
    const game = myRev.to_string();
    setMyRev(new Revolve(game));
    check_board();
  }

  const parama = {
    b1d: B1_DR,
    b1g: B1_GA,
    b2d: B2_DR,
    b2g: B2_GA,
    reset: reset,
    up: MOVE_UP,
    do: MOVE_DOWN
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-evenly pt-4">
      <em>REVOLVE SIMULATOR by ESHome33</em>
      <div className="flex min-h-screen flex-col items-center justify-evenly sm:flex-row space-y-4 ">
        <div className="flex flex-col justify-between min-w-0.5 items-center space-y-2 mx-2">
          <div className="text-xs pb-2">vide en [{str}]</div>
          <RevolveGame
            game={myRev}
            color_edit={color_editor}
          />
          <Inputs actions={parama} />
          <CheckComponent value={check} />
        </div>
        <div className="min-w-0.5 mx-2">
          <Loglist list={actionLog} />
        </div>
      </div>
    </main>
  );
}
