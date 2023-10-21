import { FC, useContext, useEffect, useState } from 'react';
import PageHeader from '../../Common/PageHeader/PageHeader';
import Form from '../../Common/Inputs/Inputs';
import { BsCalendar4Event, BsCircle } from 'react-icons/bs';
import { IoReorderThreeOutline } from 'react-icons/io5'
import { MyContext } from '../../../Contaxt/Contaxt';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BiSolidTrash } from 'react-icons/bi';
import { motion } from 'framer-motion';

interface PlanedProps { }

const Planed: FC<PlanedProps> = () => {
    const { LeftNaveBar,setRender ,setOpenEdit, setEditData,rander,darkMode,handleThemesToggle,planned, setPlanned}: any = useContext(MyContext)
    const headers = { token: localStorage.getItem('token') }
    
   
    const fetchData = () => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/notes/planned`, { headers })
            .then((response) => {
                setPlanned(response.data.note)
            })
            .catch((error) => {
                console.log("Error occurred:", error);
            });
    }

    const handleCheck = (todo: any) => {
        axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/notes/${todo._id}/completed`, { headers })
            .then((response) => {
                fetchData()
                setRender(!rander)
                toast.success(response.data.message)
            })
            .catch((error) => {
                console.log("Error occurred:", error);
                toast.error('Enternal Server Error')
            });
    }

    const handleDelete = (todo: any) => {
        axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/notes/${todo._id}/delete`, { headers })
            .then((response) => {
                fetchData()
                setRender(!rander)
                toast.success(response.data.message)
            })
            .catch((error) => {
                console.log("Error occurred:", error);
                toast.error('Enternal Server Error')
            });
    }

    useEffect(() => {
        fetchData();
    }, [rander])

    const handleEdit=(todo:any)=>{
        setOpenEdit(true)
        setEditData(todo)
        setRender(!rander)
    }

    const themecolor = localStorage.getItem('Planned-color') ?? '#333333';
    return (
        <>
            <div className=' w-full h-[92vh]'>
                <div className='w-full min-h-[24vh] h-auto  flex flex-col items-center'>
                    <PageHeader heading={'Planned'} icon={LeftNaveBar ? < BsCalendar4Event /> : <IoReorderThreeOutline className='text-2xl bg-gray-100' />} />

                    <div className='w-full h-full'>
                        <Form title='Planned'/>
                    </div>
                    <div onClick={handleThemesToggle} className='w-full h-[59vh] flex flex-col items-center overflow-y-auto scrollbar-hide mt-2'>
                        
                    {planned?.map((todo: any) => (
                        <motion.div
                        initial={{ y: -30 }}
                                            animate={{ y: 0 }}
                                            transition={{
                                                duration: 0.5,
                                                ease: 'easeOut'
                                            }} key={todo._id} className='w-[95%]  flex flex-col items-center mt-2 '>
                            <div className={`w-full min-h-[56px] h-auto py-2 rounded-md ${darkMode ? 'bg-[#141516] text-white hover:bg-[#2e2e30]' : 'bg-white hover:bg-gray-100 active:bg-[#eff6fc]'} flex items-center justify-between px-[20px] shadow-md`}>
                                <span style={{color:themecolor}} className='cursor-pointer' onClick={() => handleCheck(todo)}><BsCircle/>
                                </span>
                                <div onClick={()=>handleEdit(todo)} className='w-[80%] px-1 '>
                                    <p className=''>{todo?.tasks}</p>
                                    <p className='text-xs'></p>
                                </div>
                                <span className='flex justify-end w-[10%] text-xl  text-blue-600 '>
                                <span className='cursor-pointer hover:text-red-400 text-blue-600' onClick={() => handleDelete(todo)}>
                                            <BiSolidTrash />
                                        </span>
                                </span>
                            </div>
                        </motion.div>))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Planed;


