import { useContext, type FC, useEffect, useState } from 'react';
import { HiOutlineDotsHorizontal } from 'react-icons/hi'
import { RiArrowUpDownLine } from 'react-icons/ri'
import { BsLayoutSidebar } from 'react-icons/bs'
import { TiDelete } from 'react-icons/ti'
import { MyContext } from '../../../Contaxt/Contaxt';
import Themes from '../Themes/Themes';
import Shorting from '../Shorting/Shorting';

interface PageHeaderProps {
    heading: string;
    icon: any;
    clear?: string;
    handleClear?: () => void;
}

const PageHeader: FC<PageHeaderProps> = (props) => {
    const { setLeftNaveBar, darkMode, themesToggle, setThemesToggle, openShort, setOpenShort }: any = useContext(MyContext)
    const [themecolor, setThemeColor] = useState<string>('#482ff7')
    const [colorChange, setColorChange] = useState<boolean>(false)

    let date = new Date();
    let day = date.getDate();
    let dayName = date.toLocaleString('default', { weekday: 'long' });
    let monthName = date.toLocaleString('default', { month: 'long' });
    useEffect(() => {
        setThemeColor(localStorage.getItem(props.heading + '-color') ?? '#482ff7')
    }, [colorChange])

    
    return (
        <>
            <div style={{ color: themecolor }} className={`w-[95%] h-auto flex  items-center justify-between py-8 font-semibold text-xl`}>
                <div className=''>
                    <div className='flex items-center gap-2 relative'>
                        <span onClick={() => setLeftNaveBar(true)} className={`cursor-pointer ${props.heading === 'Planned' && 'text-sm'}`}>
                            {props.icon}
                        </span>
                        <span>{props.heading}</span>
                        <span className='ml-1 hover:bg-white'><HiOutlineDotsHorizontal onClick={() => setThemesToggle(!themesToggle)} className=' cursor-pointer text-gray-600' />
                            <div className='absolute z-50 left-0 right-0'><Themes title={props.heading} {...{ colorChange, setColorChange }} /></div>
                        </span>
                    </div>
                    <p className={`text-xs ${darkMode ? 'text-white' : 'text-black'}  font-normal`}>{dayName}, {monthName} {day}</p>
                </div>
                <div className='flex items-center md:gap-8 gap-4 text-sm relative font-normal'>
                    <div onClick={()=> setOpenShort(!openShort)} className='flex  items-center gap-2 cursor-pointer hover:bg-white py-2  md:px-3 rounded-md'>
                        <span><RiArrowUpDownLine /></span>
                        <span>Short</span>
                        <div className='absolute z-50 top-10 right-4'><Shorting /></div>

                    </div>
                    <div onClick={props.handleClear} className='flex  items-center gap-2 cursor-pointer hover:bg-white py-2 md:px-3  rounded-md'>
                        <span>{props.clear ? <TiDelete className='text-xl' /> : <BsLayoutSidebar />}</span>
                        <span>{props.clear ? props.clear : 'Group'}</span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PageHeader;
