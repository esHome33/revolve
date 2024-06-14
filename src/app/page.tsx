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
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import Link from "next/link";
import { useRouter } from "next/navigation";
import Fileupload from "@/components/fupload";
import { FileContent } from "@/lib/types";
import HelpScreen from "@/components/helpscreen";
import NewGame from "@/components/newgame";
import toast, { Toaster } from "react-hot-toast";
import ResetAlert from "@/components/resetalert";
import Chooser from "@/components/chooser";
import Afficheur from "@/components/afficheur";
import { Typography } from "@mui/material";

export default function Home() {

    // le jeu
    const jeu = useRef<Revolve | null>(null);

    // la liste des mouvements effectués
    const [actionLog, setActionLog] = useState<string[]>([]);

    // un carré rouge ou vert si la position est admissible ou pas
    const [check, setCheck] = useState<boolean>(true);

    // alerte en cas de demande de reset
    const [resetOpen, setResetOpen] = useState<boolean>(false);

    // chooser dialog
    const [chooserOpen, setChooserOpen] = useState<boolean>(false);

    // new game dialog
    const [open, setOpen] = useState<boolean>(false);

    /// dialogue d'aide
    const [helpOpen, setHelpOpen] = useState<boolean>(false);

    /// rafraichir l'affichage
    const [refresh, setRefresh] = useState<boolean>(false);

    /// nombre de coups joués
    const [count, setCount] = useState<number | undefined>(undefined);

    // les couleurs objectif
    const [objectif, setObjectif] = useState<string>("RGBY");

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
            //setNewgame(jeu_saved);
        }
        setRefresh(!refresh);
        setCount(jeu.current?.getLogSize())
        return new_jeu;
    };


    const toggleChooser = () => {
        setChooserOpen(!chooserOpen);
    }

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
            setActionLog(current_log);
            setRefresh(!refresh);
            setCount(jau.getLogSize());
        }
    };



    const check_board = () => {
        const jau = getJeu();
        if (jau) {
            const resu = jau.check_colors();
            setCheck(() => resu);
            setCount(jau.getLogSize());
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

    const go_back = () => {
        const jau = getJeu();
        if (jau) {
            jau.back_log();
            MAJ();
        }
    }

    const reset = () => {
        if (typeof window === "undefined") {
            return;
        }
        const saved = window.localStorage.getItem("revolve_board");
        if (!saved) {
            window.localStorage.setItem("revolve_board", "XRGGYY RBYRY GBGGB RBRYB");
            jeu.current = new Revolve("XRGGYY RBYRY GBGGB RBRYB");
            setActionLog([]);
            setCheck(true);
            return;
        }
        jeu.current = new Revolve(saved);
        setActionLog([]);
        setCheck(true);
        setCount(undefined);

        //setNewgame(saved);
        //setCoups("");
    }


    const handleResetDemand = () => {
        if (jeu.current) {
            if (jeu.current.getLogSize() > 0) {
                setResetOpen(true);
            } else {
                toast("jeu déjà initialisé !", {
                    duration: 2000,
                    icon: '🤷🏻',
                    style: { backgroundColor: '#334155', color: 'lightyellow' },
                })
            }
        }
    }

    const okForReset = (ok: boolean) => {
        if (ok) {
            reset();
            toast.success("jeu réinitialisé", {
                style: { backgroundColor: '#334155', color: 'lightyellow' },
                duration: 2000,
            });
        }
        setResetOpen(false);
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
            check_board();
            MAJ();
        }
    }

    const parama = {
        b1d: B1_DR,
        b1g: B1_GA,
        b2d: B2_DR,
        b2g: B2_GA,
        reset: handleResetDemand,
        up: MOVE_UP,
        do: MOVE_DOWN
    }


    const toggleOpen = () => {
        setOpen(() => !open);
    }

    const toggleHelp = (e: any) => {
        e.preventDefault();
        setHelpOpen(!helpOpen);
    }


    // const new_game = () => {
    //   const proposed_new_game = new Revolve(newgame);
    //   const resu = proposed_new_game.check_colors();
    //   if (resu) {
    //     setOpen(false);
    //     if (!window) {
    //       return;
    //     }
    //     window.localStorage.setItem("revolve_board", proposed_new_game.initial_game);
    //     jeu.current = (proposed_new_game);
    //     setActionLog([]);
    //     setCheck(true);
    //   }
    // }

    const affiche_log = () => {
        const jau = getJeu();
        if (jau) {
            let url = "/game?game=";
            const game = encodeURI(jau.initial_game);
            url += game + "&moves=";
            const moves = jau.getAllMoves();
            url += moves;
            url += "&cps=";
            url += count
            router.replace(url);
        }
    }


    const save_new_game = (newgame: string) => {
        setOpen(!open);
        const proposed_new_game = new Revolve(newgame);
        const resu = proposed_new_game.check_colors();
        if (resu) {
            window.localStorage.setItem("revolve_board", proposed_new_game.initial_game);
            jeu.current = (proposed_new_game);
            const lg = proposed_new_game.getLog();
            setActionLog(lg);
            setCheck(true);
            toast.success("New game !", {
                duration: 2000,
                style: { backgroundColor: '#334155', color: 'lightyellow' },
            });
        } else {
            toast.error("La chaine de jeu saisie n'est pas valide !", {
                duration: 3000,
                style: { backgroundColor: '#334155', color: 'lightyellow' },
            });
        }
    }

    const onUpload = (cont: FileContent) => {
        if (!window) {
            return;
        }
        // console.log('content', cont);
        // create a new game from a file
        const proposed_new_game = new Revolve(cont.game);
        const resu = proposed_new_game.check_colors();
        if (resu) {
            window.localStorage.setItem("revolve_board", proposed_new_game.initial_game);
            jeu.current = (proposed_new_game);
            // jouer les coups indiqués
            proposed_new_game.play_log(cont.moves);
            const lg = proposed_new_game.getLog();
            setActionLog(lg);
            setCheck(true);
            setCount(proposed_new_game.getLogSize());
        }
    }


    const valide_objectif = (couleurs: string) => {
        if (couleurs !== "") {
            const compo = couleurs.split('(');
            if (compo.length === 2) {
                const coul = compo[0].replace(" ", "");
                console.log(`validation de la couleur ${coul}`);
                setObjectif(()=>coul);
                setChooserOpen(false);
                setRefresh(!refresh);
            }
        }
    }

    const change_objectif = (new_objectif: string) => {
        setObjectif(new_objectif);
        setRefresh(!refresh);
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-evenly p-2">

            <div className="absolute top-2 left-2 flex flex-col justify-center align-middle space-y-3">
                <Toaster />
                <button className="p-1 shadow-md shadow-orange-600 bg-orange-900 rounded h-10"
                    onClick={toggleOpen}>
                    <AddchartIcon />
                </button>

                <div className="p-1 shadow-md shadow-green-400 bg-green-900 rounded h-10">
                    <Fileupload loader={onUpload} />
                </div>

                <button
                    className="p-1 shadow-md shadow-blue-400 bg-blue-900 rounded h-10 flex flex-row justify-center align-middle"
                    onClick={toggleHelp}
                >
                    <QuestionMarkIcon className="mt-1" />
                </button>

                <div className="px-1 py-3 shadow-md shadow-green-200 bg-gray-900 rounded h-10 text-xs text-center">
                    {count ? count : ""}
                </div>

                <button
                    className="px-1 py-3  bg-gray-700 hover:bg-gray-400 hover:text-black 
                    hover:shadow-md hover:shadow-white
                    rounded h-10 text-xs text-center"
                    onClick={go_back}
                >
                    BACK
                </button>

                <button
                    className="px-1 py-3  bg-gray-700 hover:bg-gray-400 hover:text-black 
                    hover:shadow-md hover:shadow-white
                    rounded h-10 text-xs text-center"
                    onClick={toggleChooser}
                >
                    coul
                </button>

            </div>

            <ResetAlert
                onClose={okForReset}
                open={resetOpen}
            />

            {
                (jeu.current) ?
                    <Chooser
                        game={jeu.current.initial_game}
                        open={chooserOpen}
                        close={toggleChooser}
                        valide={valide_objectif}
                    />
                    : null
            }

            <Typography className="py-2 hidden sm:block"
                aria-hidden fontStyle={"italic"}
                variant="body2"
            >
                <span className="mr-4">REVOLVE SIMULATOR by</span>
                <Link href={"https://github.com/esHome33/revolve"} className="text-blue-400">ESHome33</Link>
            </Typography>

            <Typography className="py-2 block sm:hidden absolute top-4 right-5"
                aria-hidden
                fontStyle={"normal"}
                variant="h5"
                style={{ writingMode: "vertical-rl" }}
            >
                REVOLVE Sim
            </Typography>

            <Afficheur
                colors={objectif}
                after_rotate={change_objectif}
            />

            <div className="flex min-h-screen flex-col justify-start sm:flex-row sm:justify-around mt-10">

                <div className="flex flex-col items-center mb-2">

                    <RevolveGame
                        game={getJeu()}
                        color_edit={color_editor}
                        prec_action={undefined}
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

            <NewGame
                abort={toggleOpen}
                open={open}
                save_new_game={save_new_game}
                current_game={jeu.current?.to_string()}
            />

            <HelpScreen
                open={helpOpen}
                close={toggleHelp}
            />

        </main>
    );
}
