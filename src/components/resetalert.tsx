'use client'

import { Button, ButtonGroup, Dialog, DialogContent, DialogTitle, Typography } from '@mui/material'
import React from 'react'

export type ResetAlertProps = {
    open: boolean;
    onClose: (choix: boolean) => void;
}

const ResetAlert = (props: ResetAlertProps) => {

    const { open, onClose } = props;


    return (
        <Dialog
            open={open}
        >
            <DialogTitle
                className='bg-slate-700 text-white'
            >Confirmer le reset</DialogTitle>
            <DialogContent
                className='bg-slate-700 text-white'
            >

                <Typography
                    variant='body2'
                    className='my-3 px-2'
                >
                    Vous allez perdre votre progression et remettre ce jeu au point initial.
                    Voulez-vous continuer ?
                </Typography>
                <ButtonGroup
                    className=' bg-orange-700 hover:bg-orange-900 mt-3'
                    variant='contained'
                >
                    <Button
                        key="OK"
                        onClick={() => onClose(true)}
                        className='bg-orange-700 hover:bg-orange-900'
                    >Oui</Button>
                    <Button
                        key="cancel"
                        onClick={() => onClose(false)}
                        autoFocus
                        className='bg-orange-700 hover:bg-orange-900'
                    >Annuler</Button>
                </ButtonGroup>
            </DialogContent>
        </Dialog>
    )
}

export default ResetAlert