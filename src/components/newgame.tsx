'use client';

import random_game from "@/lib/generator";
import { Button, ButtonGroup, Modal, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

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
        const ngg = random_game();
        setGengame(ngg);
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

    const clic_random_game = (e: any) => {
        e.preventDefault();
        navigator.clipboard.writeText(gengame);
        setNewgame(gengame);
        const ngg = random_game();
        setGengame(ngg);
        //toast.success('Copié !');
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
                        onClick={_e => save()}>OK</Button>
                    <Button className="bg-orange-600 text-white hover:bg-orange-800"
                        onClick={() => props.abort()}>Cancel</Button>
                </ButtonGroup>

                <Typography
                    className="mt-6 bg-slate-300 text-black py-1 px-3 rounded"
                >
                    <div className="flex flex-col sm:flex-row ">
                        <span
                            className="text-xs text-blue-800 mr-2 font-mono italic sm:my-auto"
                        >jeu aléatoire proposé :</span>
                        <span onClick={clic_random_game}>
                            {gengame}
                        </span>
                    </div>
                </Typography>

            </div>
        </Modal>

    )
}

export default NewGame