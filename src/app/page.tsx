'use client'
export const dynamic = "force-dynamic";
export const dynamicParams = true // true | false,

import CheckComponent from "@/components/checkcomp";
import Inputs from "@/components/inputs";
import Loglist from "@/components/loglist";
import RevolveGame from "@/components/revolve";
import Revolve from "@/lib/revolve";
import { useRef, useState } from "react";
import AddchartIcon from '@mui/icons-material/Addchart';
import Modal from "@mui/material/Modal";
import { Button, ButtonGroup, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
//import PosvideAfficheur from "@/components/posvide";

export default function Home() {

  // le jeu
  const jeu = useRef<Revolve | null>(null);

  //const [myRev, setMyRev] = useState<Revolve>(new Revolve("XRGGYY RBYRY GBGGB RBRYB"));
  // la liste des mouvements effectués
  const [actionLog, setActionLog] = useState<string[]>([]);


  // un carré rouge ou vert si la position est admissible ou pas
  const [check, setCheck] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const [newgame, setNewgame] = useState<string>("XRGGYY RBYRY GBGGB RBRYB");
  const [coups, setCoups] = useState<string>("");
  const [refresh, setRefresh] = useState<boolean>(false);
  //let myRev = new Revolve("RRRRRXGGGGGBBBBBYYYYY");
  //let myRev = new Revolve("RYYYYXGBBBBBYYYYYRRRR");
  //let myRev = new Revolve("RGGGGXGBBBBBYYYYYRRRR");
  //let myRev = new Revolve("XRGGYYRBRYBGBGGBRBYRY");

  const router = useRouter();

  const getJeu = () => {
    if (typeof window === "undefined") {
      return undefined;
    }
    if (jeu.current !== null) {
      return jeu.current;
    }
    const jeu_saved = window.localStorage.getItem("revolve_board");
    let new_jeu;
    if (!jeu_saved) {
      new_jeu = new Revolve("XRGGYY RBYRY GBGGB RBRYB");
      window.localStorage.setItem("revolve_board", "XRGGYY RBYRY GBGGB RBRYB");
    } else {
      new_jeu = new Revolve(jeu_saved);
      jeu.current = new_jeu;
      setNewgame(jeu_saved);
    }
    setRefresh(!refresh);
    return new_jeu;
  };

  const [pos_vide, setPos_vide] = useState<string | undefined>(undefined);


  // const cree_nouveau = () => {
  //   const new_rev_str = myRev.to_string();
  //   const old_log = myRev.getLog();
  //   const new_rev = new Revolve(new_rev_str);
  //   new_rev.setLog(old_log);
  //   setActionLog(old_log);
  //   setMyRev(new_rev);
  // }

  const MAJ = () => {
    const jau = getJeu();
    if (jau) {
      const current_log = jau.getLog();
      const posvide = jau.getVidePosition();
      setActionLog(current_log);
      setPos_vide(posvide);
      setRefresh(!refresh);
    }
  };



  const check_board = () => {
    const jau = getJeu();
    if (jau) {
      const resu = jau.check_colors();
      setCheck(() => resu);
    }
  }


  const B1_DR = () => {
    const jau = getJeu();
    if (jau) {
      jau.droite_1();
      MAJ();
    }
  }
  const B1_GA = () => {
    const jau = getJeu();
    if (jau) {
      jau.gauche_1();
      MAJ();
    }
  }
  const B2_DR = () => {
    const jau = getJeu();
    if (jau) {
      jau.droite_2();
      MAJ();
    }
  }
  const B2_GA = () => {
    const jau = getJeu();
    if (jau) {
      jau.gauche_2();
      MAJ();
    }
  }
  const MOVE_UP = () => {
    const jau = getJeu();
    if (jau) {
      jau.up();
      MAJ();
    }
  }
  const MOVE_DOWN = () => {
    const jau = getJeu();
    if (jau) {
      jau.down();
      MAJ();
    }
  }

  const reset = () => {
    if (typeof window === "undefined") {
      console.log("RESET : windows undefined");
      return;
    }
    const saved = window.localStorage.getItem("revolve_board");
    if (!saved) {
      console.log("RESET : no board saved in local storage");

      window.localStorage.setItem("revolve_board", "XRGGYY RBYRY GBGGB RBRYB");
      jeu.current = new Revolve("XRGGYY RBYRY GBGGB RBRYB");
      setActionLog([]);
      setCheck(true);
      setNewgame("XRGGYY RBYRY GBGGB RBRYB");
      setCoups("");
      return;
    }

    console.log(`RESET : board saved in local storage ${saved}`);

    jeu.current = new Revolve(saved);
    setActionLog([]);
    setCheck(true);
    setNewgame(saved);
    setCoups("");
  }

  const color_editor = (silo: number, haut: number) => {
    if (typeof window === "undefined") {
      return;
    }
    const jau = getJeu();
    if (jau) {
      jau.edit_color(silo, haut);
      const game = jau.to_string();
      jeu.current = new Revolve(game);
      window.localStorage.setItem("revolve_board", game);
      setPos_vide(jau.getVidePosition());
      check_board();
      MAJ();
    }
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


  const toggleOpen = () => {
    setOpen(() => !open);
  }

  const new_game = () => {
    const proposed_new_game = new Revolve(newgame);
    const resu = proposed_new_game.check_colors();
    if (resu) {
      setOpen(false);
      if (!window) {
        return;
      }
      window.localStorage.setItem("revolve_board", proposed_new_game.colors);
      jeu.current = (proposed_new_game);
      setActionLog([]);
      setCheck(true);
    }
  }

  const affiche_log = () => {
    const jau = getJeu();
    if (jau) {
      let url = "/game?game=";
      const game = encodeURI(jau.colors);
      url += game + "&moves=";
      const moves = jau.getAllMoves();
      url += moves;
      router.replace(url);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-evenly p-2">

      <button className="absolute top-4 left-4 shadow-md shadow-orange-600 p-2 "
        onClick={toggleOpen}>
        <AddchartIcon />
      </button>

      <em className="py-2">
        <span className="mr-4">REVOLVE SIMULATOR by</span>
        <Link href={"https://github.com/esHome33/revolve"} className="text-blue-400">ESHome33</Link>
      </em>

      <div className="flex min-h-screen flex-col justify-start 
      sm:flex-row sm:justify-around">

        <div className="flex flex-col items-center mb-2">

          <RevolveGame
            game={getJeu()}
            color_edit={color_editor}
          />
          <Inputs actions={parama} />
          <div className="mt-4">
            <CheckComponent value={check} />
          </div>
        </div>

        <div className="sm:mx-2 sm:ml-10">
          <Loglist list={actionLog} copy_fct={affiche_log} />
        </div>

      </div>

      <Modal open={open}>
        <div className="flex flex-col items-center justify-center min-h-[50vh] ">
          <Typography>
            Enter a new game
          </Typography>
          <Typography className="text-gray-400 text-xs">
            21 letters : R (red), G (green), B (blue), Y (yellow), X (empty space)
          </Typography>
          <TextField
            label="new game"
            size="medium"
            variant="filled"
            value={newgame}
            className=" bg-green-100 w-2/3 rounded mt-4"
            onChange={(e) => { e.preventDefault(); setNewgame(e.target.value) }}
          />
          {
            coups.length > 0 ? <>
              <TextField
                value={coups}
                variant="filled"
                label='coups'
                className=" bg-orange-100 w-2/3 rounded mt-4"
              />
            </> : null
          }
          <ButtonGroup className="mt-4">
            <Button
              className="bg-orange-600 text-white hover:bg-orange-800"
              onClick={() => new_game()}>OK</Button>
            <Button className="bg-orange-600 text-white hover:bg-orange-800"
              onClick={() => setOpen(false)}>Cancel</Button>
          </ButtonGroup>

        </div>
      </Modal>

    </main>
  );
}
