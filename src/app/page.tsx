'use client'

import Inputs from "@/components/inputs";
import Loglist from "@/components/loglist";
import RevolveGame from "@/components/revolve";
import Revolve from "@/lib/revolve";
import { useState } from "react";

export default function Home() {

  const [myRev, setMyRev] = useState(new Revolve("RGGGGXGBBBBBYYYYYRRRR"));
  const [actionLog, setActionLog] = useState<string[]>([]);
  //let myRev = new Revolve("RRRRRXGGGGGBBBBBYYYYY");
  //let myRev = new Revolve("RYYYYXGBBBBBYYYYYRRRR");
  //let myRev = new Revolve("RRRRRXGGGGGBBBBBYYYYY");


  const str = myRev.getVide();

  const cree_nouveau = () => {
    const new_rev_str = myRev.to_string();
    const old_log = myRev.getLog();
    const new_rev = new Revolve(new_rev_str);
    new_rev.setLog(old_log);
    setActionLog(old_log);
    setMyRev(new_rev);
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
        <div className="flex flex-col justify-between min-w-0.5 items-center space-y-2">
          <div className="text-xs pb-2">vide en [{str}]</div>
          <RevolveGame game={myRev} />
          <Inputs actions={parama} />
        </div>
        <div className="ml-8">
          <Loglist list={actionLog} />
        </div>
      </div>
    </main>
  );
}
