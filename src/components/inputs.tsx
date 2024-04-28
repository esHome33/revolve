import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import RectangleTwoToneIcon from '@mui/icons-material/RectangleTwoTone';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';

type Props = {}

const Inputs = (props: Props) => {
  return (
    <div className="flex flex-row space-x-4">
      <div className="flex flex-col space-y-4 justify-center">
        <button className="bg-gray-500 w-20 h-10 rounded text-yellow-200">1 <ArrowLeftIcon /></button>
        <button className="bg-gray-500 w-20 h-10 rounded text-yellow-200">2 <ArrowLeftIcon /></button>
      </div>
      <div className="flex flex-col space-y-2">
        <button className="bg-gray-500 w-10 h-10 rounded text-yellow-200"><ArrowDropUpIcon /></button>
        <button className="bg-gray-500 w-10 h-10 rounded text-yellow-200"><RectangleTwoToneIcon /></button>
        <button className="bg-gray-500 w-10 h-10 rounded text-yellow-200"><ArrowDropDownIcon /></button>

      </div>
      <div className="flex flex-col space-y-4 justify-center"> 
        <button className="bg-gray-500 w-20 h-10 rounded text-yellow-200">1 <ArrowRightIcon /></button>
        <button className="bg-gray-500 w-20 h-10 rounded text-yellow-200">2 <ArrowRightIcon /></button>
      </div>
    </div>
  )
}

export default Inputs