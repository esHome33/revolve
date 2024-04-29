'use client'

import Inputs from "@/components/inputs";
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

  const B1_DR = () => {
    myRev.droite_1();
    const new_rev = myRev.to_string();
    setActionLog(myRev.getLog());
    setMyRev(new Revolve(new_rev));
  }
  const B1_GA = () => {
    myRev.gauche_1();
    const new_rev = myRev.to_string();
    setActionLog(myRev.getLog());
    setMyRev(new Revolve(new_rev));
  }
  const B2_DR = () => {
    myRev.droite_2();
    const new_rev = myRev.to_string();
    setActionLog(myRev.getLog());
    setMyRev(new Revolve(new_rev));
  }
  const B2_GA = () => {
    myRev.gauche_2();
    const new_rev = myRev.to_string();
    setActionLog(myRev.getLog());
    setMyRev(new Revolve(new_rev));
  }
  const MOVE_UP = () => {
    myRev.up();
    const new_rev = myRev.to_string();
    setActionLog(myRev.getLog());
    setMyRev(new Revolve(new_rev));
  }
  const MOVE_DOWN = () => {
    myRev.down();
    const new_rev = myRev.to_string();
    setActionLog(myRev.getLog());
    setMyRev(new Revolve(new_rev));
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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>vide en [{str}]</div>
      <RevolveGame game={myRev} />
      <Inputs actions={parama} />
      <div>
        <ul>
          {actionLog.map((action, index) => <li key={index}>{action}</li>)}
        </ul>
      </div>
    </main>
  );
}
