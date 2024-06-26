'use client'

import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

type Props = {
  actions: {
    b1d: () => void;
    b2d: () => void;
    b1g: () => void;
    b2g: () => void;
    reset: () => void;
    up: () => void;
    do: () => void;
  };
}

const Inputs = (props: Props) => {
  return (
    <div className="flex flex-row space-x-4">
      <div className="flex flex-col space-y-4 justify-center">
        <button
          className="bg-gray-500 w-20 h-10 rounded text-yellow-200
                     focus:bg-yellow-100 focus:text-gray-700
                      hover:bg-yellow-100 hover:text-gray-700
          "
          onClick={props.actions.b1g}>1 <ArrowLeftIcon /></button>
        <button
          className="bg-gray-500 w-20 h-10 rounded text-yellow-200
                    focus:bg-yellow-100 focus:text-gray-700
                      hover:bg-yellow-100 hover:text-gray-700"
          onClick={props.actions.b2g}>2 <ArrowLeftIcon /></button>
      </div>
      <div className="flex flex-col space-y-2">
        <button
          className="bg-gray-500 w-10 h-10 rounded text-yellow-200
                               focus:bg-yellow-100 focus:text-gray-700
                      hover:bg-yellow-100 hover:text-gray-700"
          onClick={props.actions.up}
        ><ArrowDropUpIcon /></button>
        <button
          className="bg-gray-500 w-10 h-10 rounded text-yellow-200
           focus:bg-yellow-300 focus:text-gray-700
           hover:bg-yellow-300 hover:text-gray-700
           "
          onClick={props.actions.reset}
        ><RestartAltIcon /></button>
        <button
          className="bg-gray-500 w-10 h-10 rounded text-yellow-200
                               focus:bg-yellow-100 focus:text-gray-700
                      hover:bg-yellow-100 hover:text-gray-700"
          onClick={props.actions.do}
        ><ArrowDropDownIcon /></button>

      </div>
      <div className="flex flex-col space-y-4 justify-center">
        <button
          className="bg-gray-500 w-20 h-10 rounded text-yellow-200
                               focus:bg-yellow-100 focus:text-gray-700
                      hover:bg-yellow-100 hover:text-gray-700"
          onClick={props.actions.b1d}
        >1 <ArrowRightIcon /></button>
        <button
          className="bg-gray-500 w-20 h-10 rounded text-yellow-200
                               focus:bg-yellow-100 focus:text-gray-700
                      hover:bg-yellow-100 hover:text-gray-700"
          onClick={props.actions.b2d}
        >2 <ArrowRightIcon /></button>
      </div>
    </div>
  )
}

export default Inputs