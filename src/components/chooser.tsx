import CChooser from '@/lib/cchooser';
import { Button, Dialog, DialogContent, List, ListItemButton, Typography } from '@mui/material';
import React from 'react'

type Props = {
    game: string;
    open: boolean;
    close: () => void;
    valide: (couleurs: string) => void;
}

/**
 * permet d'afficher les différentes possibilités d'ordre pour les couleurs
 * objectif de chaque colonne et d'enregistrer un ordre particulier
 */
const Chooser = ({ game, open, close, valide }: Props) => {

    if (!game) {
        return (<div className='text-center text-xs'>
            <Typography>
                no chooser
            </Typography>
        </div>);
    }


    const resus = CChooser.choix_couleurs(game);
    const liste_de_resultats: string[] = [];
    resus.forEach((elt) => {
        const forme = `${elt.motif} (${elt.poids})`;
        if (!liste_de_resultats.includes(forme)) {
            liste_de_resultats.push(forme);
        }
    });



    return (
        <Dialog className='w-11/12 rounded m-2 p-4' open={open}>
            <DialogContent
                className='bg-slate-600 text-white'
            >

                <Typography
                    className='text-sm'
                >
                    Les propositions de couleurs
                </Typography>
                <Typography
                    className='mb-2 text-sm'
                >
                    pour chaque colonne sont :
                </Typography>
                <List
                    className='px-2 rounded-lg'
                >
                    {liste_de_resultats.map((item, index) => {
                        if (item) {

                            if (item.includes("no color")) {
                                return null;
                            } else
                                return (
                                    <ListItemButton
                                        key={index}
                                        disableGutters
                                        className='px-2 bg-slate-900'
                                        onClick={()=>valide(item)}
                                    >
                                        {item}
                                    </ListItemButton>
                                )
                        } else {
                            return null;
                        }
                    })}
                </List>
                <Button
                    variant='outlined'
                    className='bg-orange-600
                    hover:bg-orange-300
                    hover:text-black
                     text-white px-2 rounded'
                    onClick={close}
                >Close</Button>
            </DialogContent>
        </Dialog>
    )
}

export default Chooser