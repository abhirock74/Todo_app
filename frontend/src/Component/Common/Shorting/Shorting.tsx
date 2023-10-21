import {useContext, FC } from 'react';
import { MyContext } from '../../../Contaxt/Contaxt';
import {BsArrowDownUp} from 'react-icons/bs'
import {BsCalendar2Date} from 'react-icons/bs'

interface ShortingProps {}

const Shorting: FC<ShortingProps> = () => {
    const {openShort, setOpenShort}:any =useContext(MyContext)
    return (
        <>
        {openShort ?  <div className='text-sm font-normal text-gray-600 w-52 h-auto flex flex-col gap-1 relative rounded-md border bg-white'>
                        <div className='text-black p-2  font-semibold m-auto'>Sort by</div>
                        <hr />
                        <div className='flex items-center gap-4 cursor-pointer px-3 py-2 hover:bg-[#f3f2f1]'>
                            <span className='text-lg'><BsArrowDownUp/></span>
                            <span>Alphabetically</span>
                            <span className='ml-2'>   </span>
                        </div>
                        <div className='flex gap-4 cursor-pointer px-3 py-2 hover:bg-[#f3f2f1]'>
                            <span><BsCalendar2Date/></span>
                            <span>Creation date</span>
                        </div>
                    </div> 
                    : ''}
        </>
    );
}

export default Shorting;
