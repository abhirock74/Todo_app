import { useContext, type FC, useState } from 'react';
import { BiBell, BiSun } from 'react-icons/bi';
import { BsFillShareFill } from 'react-icons/bs';
import { HiOutlineMoon } from 'react-icons/hi2';
import { FiLogOut, FiSearch } from 'react-icons/fi';
import avatar from '../../Assets/avatar.png'
import { MyContext } from '../../Contaxt/Contaxt';
import { useNavigate } from 'react-router-dom';


interface LogOutProps { }

const LogOut: FC<LogOutProps> = () => {
    const { setDarkMode, darkMode, setOpenEdit, profileToggle, setProfileToggle,setViewProfileToggle}: any = useContext(MyContext);
    const nevigate = useNavigate()
let userDetail = JSON.parse(localStorage.getItem('user') ?? '[]');

    

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setProfileToggle(false)
        setOpenEdit(false)
        setViewProfileToggle(false)
        nevigate('/signin')
    }

    const HandleProfile=()=>{
        setViewProfileToggle(true)
        setProfileToggle(false)
    }
    return (
        <>
        
            <div className={`${profileToggle ? 'translate-x-0' : 'translate-x-full'} transition-all duration-300  shadow-md  fixed right-0 max-[550px]:right-0 top-14 rounded w-72 max-[550px]:w-full h-auto flex flex-col gap-5 p-5 max-[550px]:p-10 font-semibold text-gray-800 z-40 ${darkMode ? 'bg-[#23202f] text-white' : 'bg-white shadow-gray-200'}`}>

                <div onClick={HandleProfile} className='flex items-center gap-5 cursor-pointer'>
                    <div className='w-8 h-8 rounded-[50%] bg-slate-100 border-[2px] p-[2px] border-blue-500 cursor-pointer'>
                    <img className='w-full h-full rounded-full' src={userDetail.img_url == '' ? avatar : `${process.env.REACT_APP_BACKEND_URL}/${userDetail.img_url}`} alt="img" />
                    </div>
                    <p>Profile</p>
                </div>
                <div onClick={() => {
                    setProfileToggle(false)
                    setDarkMode(!darkMode)
                }}
                    className='flex items-center gap-5 cursor-pointer'>
                    <div className='w-8 h-8 rounded-[50%] border-[2px] border-slate-300 hover:border-blue-400 hover:text-blue-500 flex items-center justify-center'>{!darkMode ? <HiOutlineMoon /> : <BiSun />}
                    </div>
                    <p>{!darkMode ? "Dark Mode " : 'Light Mode'}</p>
                </div>

                <div className='flex items-center gap-5 cursor-pointer'>
                    <div className='w-8 h-8 rounded-[50%] cursor-pointer border-[2px] border-slate-300 hover:border-blue-400 hover:text-blue-500 flex items-center justify-center relative'> <BiBell className='' /><p className='absolute h-2 w-2 bg-red-600 rounded-full top-1 right-2'></p>
                    </div>
                    <p>Notification</p>
                </div>

                <div className='flex items-center gap-5 cursor-pointer'>
                    <div className='w-8 h-8 rounded-[50%] border-[2px] border-slate-300 hover:border-blue-400 hover:text-blue-500  flex items-center justify-center'><BsFillShareFill className='text-sm' />
                    </div>
                    <p>Share</p>
                </div>

                <div onClick={logout} className='flex items-center gap-5 cursor-pointer hover:text-red-500'>
                    <div className='w-8 h-8 rounded-[50%] border-[2px] border-slate-300 hover:border-red-500   flex items-center justify-center'><FiLogOut className='text-sm' />
                    </div>
                    <p className='text-red-500'>LogOut</p>
                </div>

                <div className='relative w-full'>
                    <input className='w-full border-2 py-2 rounded-sm outline-none bg-gray-100 pl-2 pr-5 text-xs text-gray-600' type="text" placeholder='Search..' />
                    <FiSearch className='absolute right-1  top-3' />
                </div>
            </div>
        </>
    );
}

export default LogOut;
