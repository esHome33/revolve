'use client'
import Action from '@/lib/action';
import { FileContent, MagicId } from '@/lib/types';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { Button } from "@mui/material"
import { useRef } from 'react';

type Props = {
    loader: (content: FileContent) => void;
}

const Fileupload = (props: Props) => {


    const ref = useRef<HTMLInputElement>(null);

    const clickButton = (d: any) => {
        d.preventDefault();
        if (ref.current) {
            ref.current.click();
        }
    };

    const litFiles = async () => {
        if (ref.current) {
            if (ref.current.files) {
                const p = await ref.current.files[0].text();
                const morceaux = p.split("\n");
                let resu: FileContent = {
                    game: '',
                    moves: []
                };
                if (morceaux.length > 0) {
                    if (morceaux[0] === MagicId) {
                        // OK it is our file ... hope so !
                        for (let i = 1; i < morceaux.length; i++) {
                            const element = morceaux[i];
                            if (element.length > 0 && i === 1) {
                                resu.game = element;
                            } else if (element.length > 0 && i > 1) {
                                const new_action = new Action(element);
                                resu.moves.push(new_action);
                            }
                        }
                        //console.log(`il y a ${f} files dans l'input - ${JSON.stringify(resu)}`);
                        props.loader(resu);
                    }
                }
                ref.current.value = "";
            }
        }
    };

    return (
        <div className='w-10 flex flex-row justify-center align-middle h-10 -mt-1'>
            <input
                ref={ref}
                type="file"
                id="fileElem"
                accept="text/*"
                className="hidden"
                onChange={(e) => {
                    e.preventDefault();
                    litFiles();
                }}
                value={''}
            />
            <Button
                onClick={clickButton}
            >
                <UploadFileIcon
                    className=' text-green-400'
                />
            </Button>
        </div>
    )
}

export default Fileupload