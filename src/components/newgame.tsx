'use client';

import { Button, ButtonGroup, Modal, TextField, Typography } from "@mui/material";
import { useState } from "react";

type Props = {
    open: boolean;
    abort: () => void;
    save_new_game: (game: string) => void;
    current_game: string | undefined;
}

const NewGame = (props: Props) => {

    const [newgame, setNewgame] = useState(props.current_game);

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
    
                <ButtonGroup className="mt-4">
                    <Button
                        className="bg-orange-600 text-white hover:bg-orange-800"
                        onClick={_e=>save()}>OK</Button>
                    <Button className="bg-orange-600 text-white hover:bg-orange-800"
                        onClick={() => props.abort()}>Cancel</Button>
                </ButtonGroup>

            </div>
        </Modal>

    )
}

export default NewGame