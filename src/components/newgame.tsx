'use client';

import random_game from "@/lib/generator";
import { Button, ButtonGroup, Modal, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

type Props = {
    open: boolean;
    abort: () => void;
    save_new_game: (game: string) => void;
    current_game: string | undefined;
}

const NewGame = (props: Props) => {

    const generated_game = random_game();
    const [newgame, setNewgame] = useState(props.current_game);
    const [gengame, setGengame] = useState(generated_game);

    useEffect(() => {
        setGengame(generated_game);
    }, []);
    

    const save = () => {
        if (newgame !== props.current_game) {
            if (newgame) {
                props.save_new_game(newgame);
            }
            else
                props.abort();
        } else {
            props.abort();
        }
    }

    return (
        <Modal open={props.open}>
            <div className="flex flex-col items-center justify-center min-h-[50vh] ">
                <Typography>
                    Enter a new game
                </Typography>
                <Typography className="text-gray-400 text-xs bg-slate-800 mt-3 p-2 rounded border border-gray-500">
                    21 letters : R (red), G (green), B (blue), Y (yellow), X (empty space)
                </Typography>
                <TextField
                    label="new game"
                    size="medium"
                    variant="filled"
                    value={newgame}
                    className=" bg-green-100 w-2/3 rounded mt-5"
                    onChange={(e) => { e.preventDefault(); setNewgame(e.target.value) }}
                />
    
                <ButtonGroup className="mt-4">
                    <Button
                        className="bg-orange-600 text-white hover:bg-orange-800"
                        onClick={_e=>save()}>OK</Button>
                    <Button className="bg-orange-600 text-white hover:bg-orange-800"
                        onClick={() => props.abort()}>Cancel</Button>
                </ButtonGroup>

                <Typography
                    className="mt-6 bg-slate-300 text-black p-4 rounded-md"
                >
                    <span
                        className="text-xs text-blue-800 mr-2 font-mono"
                    >jeu aléatoire proposé :</span>
                    <span onClick={() => { navigator.clipboard.writeText(gengame);  toast.success('Copié !')}}>{gengame}</span>
                </Typography>

                <Toaster />
            </div>
        </Modal>

    )
}

export default NewGame