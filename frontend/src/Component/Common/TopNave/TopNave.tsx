import { useContext, type FC } from 'react';
import { TbGridDots } from 'react-icons/tb'
import { VscSearch } from 'react-icons/vsc'
import { LuSettings } from 'react-icons/lu'
import { IoMdClose } from 'react-icons/io'
import { BiBell, BiQuestionMark } from 'react-icons/bi'
import { MyContext } from '../../../Contaxt/Contaxt';
import avatar from '../../../Assets/avatar.png'
import LogOut from '../../../Auth/LogOut/LogOut';
import { Link } from 'react-router-dom';

interface TopNaveProps { }

const TopNave: FC<TopNaveProps> = () => {
    const { darkMode, profileToggle, setProfileToggle, setOpensearch, setsearchValue,searchValue }: any = useContext(MyContext)
    const searchvalue=(e:any)=>{
        setsearchValue(e.target.value)
    }

    const handleClick =()=>{
        setOpensearch(false)
        setsearchValue()
    }
    let userDetail = JSON.parse(localStorage.getItem('user') ?? '[]');


    return (
        <>
            <div className={`w-full h-[52px] ${darkMode ? 'bg-[#1b1a19]' : 'bg-[#2564cf] '}  text-white font-bold flex justify-between`}>
                <div className='h-full flex items-center'>
                    <span className='px-[14px] py-[18px] hover:bg-[#204b96] cursor-pointer'><TbGridDots className='text-xl font-extrabold' /></span>
                    <span className='px-2 py-[18px] hover:underline cursor-pointer'>To Do</span>
                </div>
                <div  className='flex items-center relative max-md:hidden'>
                    <Link to={'/Searching/:value'}><input onChange={(e)=>searchvalue(e)} value={searchValue} type="input" className={`w-[25rem] ${darkMode ? 'bg-[#2c2b29] text-gray-200 focus:bg-[#363533]' : 'bg-gray-300 focus:bg-white'}  focus:outline-none  focus:cursor-text h-8 rounded-md cursor-pointer  text-gray-600 font-normal px-10`}/></Link>
                    <span className='absolute left-2'><VscSearch className='text-[#2564cf]' /></span>
                    {searchValue ?  <Link to={'/myDay'} onClick={handleClick} className='absolute right-2 cursor-pointer'><IoMdClose className='text-[#2564cf]' /></Link> : ''}
                </div>
                <div className='flex items-center'>
                    <span className='max-md:hidden px-[14px] py-[18px] cursor-pointer hover:bg-[#204b96]'><LuSettings className='text-xl' /></span>
                    <span className='max-md:hidden px-[14px] py-[18px] cursor-pointer hover:bg-[#204b96]'><BiQuestionMark className='text-xl' /></span>
                    <span className='max-md:hidden px-[14px] py-[18px] cursor-pointer hover:bg-[#204b96]'><BiBell className='text-xl' /></span>
                    <span onClick={() => setProfileToggle(!profileToggle)} className='px-[10px] py-[18px] cursor-pointer hover:bg-[#204b96]'>
                        <div className='w-[35px] h-[35px] font-sm font-normal border border-white flex items-center justify-center rounded-full'><img className='w-full h-full rounded-full' src={userDetail.img_url == '' ? avatar : `${process.env.REACT_APP_BACKEND_URL}/${userDetail.img_url}`} alt="img" />
                        </div></span>
                    <LogOut />
                </div>
            </div>

        </>
    );
}

export default TopNave;
