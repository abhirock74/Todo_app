import { FC, useContext, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import TopNave from '../Common/TopNave/TopNave';
import LeftNave from '../Common/LeftNave/LeftNave';
import Edit from '../Common/Edit/Edit';
import { MyContext } from '../../Contaxt/Contaxt';
import Profile from '../../Auth/Profile/Profile';

interface HomeProps { }

const Home: FC<HomeProps> = () => {
    const {setEditForm, LeftNaveBar, darkMode, openEdit ,viewProfileToggle,setViewProfileToggle,setProfileToggle }: any = useContext(MyContext);

    const navigate = useNavigate();
    let login = localStorage.getItem('token');
    useEffect(() => {
        if (!login) {
            navigate('/signin')
        }

    }, [login]);

    return (
        <>
            <div className='w-screen h-screen bg-white transition-all duration-300'>
            <Profile/>
                <div className='w-full h-auto'>
                    <TopNave />
                </div>
                <div className='h-[92vh] flex w-full relative'>
                    {LeftNaveBar === true ?
                        <div onClick={()=>setEditForm(false)} className='min-w-[300px] w-[300px] max-[990px]:max-w-[240px] max-[600px]:min-w-full h-full  bg-[#fff]'>
                            <LeftNave />
                        </div>
                        : null
                    }
                    <div onClick={()=>{
                        setEditForm(false)
                        setProfileToggle()}} className={`w-full  h-full ${darkMode ? 'bg-[#11100f] text-white shadow-gray-800' : 'bg-[#faf9f8] shadow-gray-300 shadow-inner'}   overflow-y-auto scrollbar-hide`}>
                        <Outlet />
                    </div>
                    {openEdit ? <div className='min-w-[360px] w-[360px]  max-[705px]:w-full h-[92vh] max-[705px]:absolute max-[705px]:z-20 bg-[#faf9f8]'>
                        <Edit />
                    </div> : ''}
                </div>
            </div>
        </>
    );
}

export default Home;

