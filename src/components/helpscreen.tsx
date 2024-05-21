'use client';

import { Modal, Typography } from '@mui/material'
import AddchartIcon from '@mui/icons-material/Addchart';
import UploadFileIcon from '@mui/icons-material/UploadFile';



type Props = {
    open: boolean;
    close: (e:any) => void;
}

const HelpScreen = (props: Props) => {

    return (
        <Modal open={props.open} className='bg-slate-700'>
            <div className="flex flex-col items-center justify-center min-h-[30vh] max-w-sm mx-auto">
                <Typography variant='h5' fontStyle={"italic"} className='mb-3'>
                    Help for Revolve Simulator
                </Typography>
                <Typography className='text-center mb-2'>
                    This app simulates a revolve game : 4 columns containing each 5 colored balls.
                    An empty space is placed in one of the 4 columns.
                    Row 1 and 6 cannot move. Row 6 contains only one place. Any other row contains 4 places.
                    The aim of the game is to make each column the same color.
                </Typography>
                <div className='h-1 my-2 w-full bg-lime-700' />
                <Typography className='text-center mb-2'>
                    Do this by rotating two rings (Ring1 = rows 2 & 3
                    Ring2 = rows 4 & 5) + move the empty space in the best place,
                    using UP and DOWN commands.
                </Typography>
                <div className='h-1 my-2 w-full bg-lime-700' />
                <Typography className='text-center mb-2'>
                    <AddchartIcon /> lets you insert a new game. Place colors where you want using
                    a string describing each column from top to bottom.
                </Typography>
                <div className='h-1 my-2 w-full bg-lime-700' />
                <Typography className='text-center mb-2'>
                    When clicking on a non-empty log : download a file containing your current game and the log.
                </Typography>

                <div className='h-1 my-2 w-full bg-lime-700' />
                
                <Typography className='text-center mb-2'>
                    <UploadFileIcon /> lets you insert a new game by uploading a file containing the game and
                    the log.
                </Typography>

                <button
                    onClick={e => props.close(e)}
                className='bg-lime-700 py-2 px-3 rounded hover:bg-lime-300 hover:text-lime-800'>OK</button>
            </div>
        </Modal>
    )
}

export default HelpScreen
