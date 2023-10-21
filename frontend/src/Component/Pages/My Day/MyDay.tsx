import { useContext, type FC, useEffect, useState } from 'react';
import PageHeader from '../../Common/PageHeader/PageHeader';
import Inputs from '../../Common/Inputs/Inputs';
import { BiSun } from 'react-icons/bi';
import { IoReorderThreeOutline } from 'react-icons/io5';
import { MyContext } from '../../../Contaxt/Contaxt';
import axios from 'axios';
import { BsCheckCircle, BsCircle } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { LiaAngleDownSolid, LiaAngleRightSolid } from 'react-icons/lia';
import { BiSolidTrash } from 'react-icons/bi';
import { motion } from 'framer-motion';


interface MyDayProps { }

const MyDay: FC<MyDayProps> = () => {
    const { setEditData,setOpenEdit, LeftNaveBar, setRender, rander, handleThemesToggle, darkMode ,MyDay, setMyDay}: any = useContext(MyContext)
    const headers = { token: localStorage.getItem('token') }
    const [toggleComplet, setToggleComplet] = useState(false);
    const [myDayComplete, setMyDayComplete] = useState([])




    // const array = [
    //     { name: "banana", id: 1 },
    //     { name: "zherry", id: 3 },
    //     { name: "apple", id: 2 },
    //     { name: "cherry", id: 3 },
    //   ];
      
    //   // Sort the array of objects by the "name" property in ascending order
    //   array.sort((a, b) => {
    //     if (a.name < b.name) return -1;
    //     if (a.name > b.name) return 1;
    //     return 0; // Objects are considered equal
    //   });
      
    //   console.log(array);


    const fetchData = () => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/notes/MyDay`, { headers })
            .then((response) => {
                setMyDay(response.data.note)
            })
            .catch((error) => {
                console.log("Error occurred:", error);
            });
        //For completeData
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/notes/mydayconplete`, { headers })
            .then((response) => {
                setMyDayComplete(response.data.note)
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

    const handleCheckOut = (todo: any) => {
        axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/notes/${todo._id}/CkeckoutNotes`, { headers })
            .then((response) => {
                fetchData()
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

    const handleEdit=(todo:any)=>{
        setOpenEdit(true)
        setEditData(todo)
        setRender(!rander)
    }

    useEffect(() => {
        fetchData();
    }, [rander])

    const themecolor = localStorage.getItem('My Day-color') ?? '#482ff7';
    return (
        <>
            <div className=' w-full h-[92vh] scrollbar-hide'>
                <div className='w-full min-h-[24vh] h-auto  flex flex-col items-center'>
                    <PageHeader heading={'My Day'} icon={LeftNaveBar ? <  BiSun /> : <IoReorderThreeOutline className='text-2xl bg-gray-100' />} />

                    <div className='w-full h-full'>
                        <Inputs title='My Day' />
                    </div>
                    <div id='My Day' onClick={handleThemesToggle} className='w-full h-[59vh] flex flex-col items-center scrollbar-hide overflow-y-auto mt-2'>

                        {[...MyDay]?.reverse()?.map((todo: any,index:number) => (
                        <motion.div
                            initial={{ y: -30 }}
                            animate={{ y: 0 }}
                            transition={{
                                duration: 0.5,
                                ease: 'easeOut'
                            }}
                            
                            key={index} className='w-[95%]  flex flex-col items-center mt-2'>
                            <div  className={`w-full scrollbar-hide min-h-[56px] h-auto py-2 rounded-md ${darkMode ? 'bg-[#141516] text-white hover:bg-[#2e2e30]' : 'bg-white hover:bg-gray-100 active:bg-[#eff6fc]'} flex items-center justify-between px-[20px] shadow-md`}>
                                <span style={{ color: themecolor }} className='cursor-pointer' onClick={() => handleCheck(todo)}><BsCircle />
                                </span>
                                <div onClick={()=>handleEdit(todo)} className='w-[80%] px-1 '>
                                    <p className=''>{todo?.tasks}</p>
                                    <p className='text-xs'></p>
                                </div>
                                <span className='flex justify-end w-[10%] text-xl'>
                                    <span className='cursor-pointer hover:text-red-400 text-blue-600' onClick={() => handleDelete(todo)}>
                                        <BiSolidTrash />
                                    </span>
                                </span>
                            </div>
                        </motion.div>))}

                        {myDayComplete?.length > 0 ?
                            <>
                                <div className='w-[95%] flex items-center gap-4 mt-6' onClick={() => setToggleComplet(!toggleComplet)}>
                                    <span>{toggleComplet ? <LiaAngleDownSolid /> : <LiaAngleRightSolid />}</span>
                                    <p className='text-md font-semibold'>completed</p>
                                    <span>{myDayComplete?.length}</span>
                                </div>
                                {toggleComplet ?
                                    <motion.div
                                    initial={{ y: -30 }}
                                    animate={{ y: 0 }}
                                    transition={{
                                        duration: 0.5,
                                        ease: 'easeOut'
                                    }} className='w-[95%] h-full flex flex-col'>
                                        {myDayComplete?.map((todo: any) => (
                                            <div key={todo._id} className='w-[95%]  flex flex-col items-center mt-2 '>
                                                <div className={`w-full min-h-[56px] h-auto py-2 rounded-md ${darkMode ? 'bg-[#141516] text-white hover:bg-[#525355]' : 'bg-white hover:bg-gray-100 active:bg-[#eff6fc]'} flex items-center justify-between px-[20px] shadow-md`}>
                                                    <span style={{ color: themecolor }} className='cursor-pointer' onClick={() => handleCheckOut(todo)}>< BsCheckCircle />
                                                    </span>
                                                    <div onClick={()=>handleEdit(todo)} className='w-[80%] px-1 '>
                                                        <p className='w-[80%] px-1 line-through'>{todo?.tasks}</p>
                                                        <p className='text-xs'></p>
                                                    </div>
                                                    <span className='flex justify-end w-[10%] text-xl  text-blue-600 '>
                                                        <span className='cursor-pointer hover:text-red-400 text-blue-600' onClick={() => handleDelete(todo)}>
                                                            <BiSolidTrash />
                                                        </span>
                                                    </span>
                                                </div>
                                            </div>))}
                                    </motion.div>
                                    : <hr className='mt-5 w-full' />
                                }

                            </>
                            : <></>
                        }

                    </div>
                </div>
            </div>
        </>
    );
}

export default MyDay;
