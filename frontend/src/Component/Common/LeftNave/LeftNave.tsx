import { useContext, type FC } from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';
import { IoReorderThreeOutline } from 'react-icons/io5'
import { BiSun } from 'react-icons/bi'
import { AiOutlineStar } from 'react-icons/ai'
import { BsCalendar4Event } from 'react-icons/bs'
import { IoInfiniteOutline } from 'react-icons/io5'
import { CiCircleCheck } from 'react-icons/ci'
import { GoHome } from 'react-icons/go'
import { MyContext } from '../../../Contaxt/Contaxt';
import { RiDeleteBin6Line } from 'react-icons/ri';

interface LeftNaveProps { }

const LeftNave: FC<LeftNaveProps> = () => {
    const { darkMode, setLeftNaveBar, setOpenEdit, handleThemesToggle, MyDay,task,Importaint ,planned}: any = useContext(MyContext)

    return (
        <>
            <div onClick={handleThemesToggle} className={`w-full h-full flex flex-col text-xl ${darkMode && 'bg-[#252423] text-white'} text-[#222222]`}>
                <div className='cursor-pointer flex items-center gap-5 pl-6 text-2xl mb-4 mt-7'>
                    <IoReorderThreeOutline onClick={() => setLeftNaveBar(false)} />
                </div>

                <NavLink to={'/myDay'}
                onClick={()=> setOpenEdit(false)}
                    className={` ${darkMode ? 'hover:bg-[#3b3a39] act' : 'hover:bg-gray-100 border-l-2'} `}>

                    <div className='  pl-6 flex justify-between  py-2.5 '>
                        <div className='flex items-center gap-5'>
                            <span><BiSun /></span>
                            <span className='text-base'>My Day</span></div>
                        <span className='pr-5 text-sm'>
                            {MyDay.length > 0 ? MyDay.length : ''}
                        </span>
                    </div>
                </NavLink>

                <NavLink to={'/Importaint'} 
                onClick={()=> setOpenEdit(false)}
                className={`border-l-2 ${darkMode ? 'hover:bg-[#3b3a39] act' : 'hover:bg-gray-100 '} `}>
                    <div className=' pl-6 flex justify-between  py-2.5'>
                        <div className='flex items-center gap-5'>
                            <span><AiOutlineStar /></span>
                            <span className='text-base'>Importaint</span></div>
                        <span className='pr-5 text-sm'>
                            {Importaint.length > 0 ? Importaint.length : ''}
                        </span>
                    </div>
                </NavLink>

                <NavLink to={'/planed'} 
                onClick={()=> setOpenEdit(false)}
                className={`border-l-2 ${darkMode ? 'hover:bg-[#3b3a39] act' : 'hover:bg-gray-100'} `}>
                    <div className='  pl-6 flex justify-between  py-2.5'>
                        <div className='flex items-center gap-5'>
                            <span><BsCalendar4Event className='text-sm' /></span>
                            <span className='text-base'>Planned</span></div>
                        <span className='pr-5 text-sm'>
                            {planned.length > 0 ? planned.length : ''}
                        </span></div>
                </NavLink>

                <NavLink to={'/'} 
                onClick={()=> setOpenEdit(false)}
                className={`border-l-2 ${darkMode ? 'hover:bg-[#3b3a39] act' : 'hover:bg-gray-100'} `}>
                    <div className=' flex justify-between gap-5 pl-6 text-xl  py-2.5'>
                        <div className='flex items-center gap-5'>
                            <span className='text-xl'><IoInfiniteOutline /></span>
                            <span className='text-base'>All</span></div>
                        <span className='pr-5 text-sm'>
                            {task.length > 0 ? task.length : ''}
                        </span>
                    </div>
                </NavLink>
                <NavLink to={'/completed'} 
                onClick={()=> setOpenEdit(false)}
                className={`border-l-2 ${darkMode ? 'hover:bg-[#3b3a39] act' : 'hover:bg-gray-100'} `}>
                    <div className=' flex justify-between gap-5 pl-6 text-xl  py-2.5'>
                        <div className='flex items-center gap-5'>
                            <span><CiCircleCheck /></span>
                            <span className='text-base'>Completed</span></div>
                    </div>
                </NavLink>

                <NavLink to={'/Tasks/:_id'} 
                onClick={()=> setOpenEdit(false)}
                className={`border-l-2 ${darkMode ? 'hover:bg-[#3b3a39] act' : 'hover:bg-gray-100'} `}>
                    <div className=' flex justify-between gap-5 pl-6 text-xl  py-2.5'>
                        <div className='flex items-center gap-5'>
                            <span><GoHome /></span>
                            <span className='text-base'>Tasks</span></div>
                        <span className='pr-5 text-sm'>
                            {task.length > 0 ? task.length : ''}
                        </span>
                    </div>
                </NavLink>
                <hr className='w-full mt-4 mb-3 flex items-center' />

                <NavLink to={'/recyclebin'} 
                onClick={()=> setOpenEdit(false)}
                className={`border-l-2 ${darkMode ? 'hover:bg-[#3b3a39] act' : 'hover:bg-gray-100'} `}>
                    <div className=' flex justify-between gap-5 pl-6 text-xl  py-2.5'>
                        <div className='flex items-center gap-5'>
                            <span><RiDeleteBin6Line /></span>
                            <span className='text-base'>Trash</span></div>
                        <span className='pr-5 text-sm'>

                        </span>
                    </div>
                </NavLink>
            </div>
        </>
    );
}

export default LeftNave;
