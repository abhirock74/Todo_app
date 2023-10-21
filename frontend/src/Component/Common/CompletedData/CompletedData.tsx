import { FC, useContext, useEffect, useState } from 'react'
import { MyContext } from '../../../Contaxt/Contaxt'
import { LiaAngleDownSolid } from 'react-icons/lia'
import { LiaAngleRightSolid } from 'react-icons/lia'
import axios from 'axios'
import { toast } from 'react-toastify'
import { BsCheckCircle } from 'react-icons/bs'
import { BiSolidTrash } from 'react-icons/bi'
import { motion } from 'framer-motion'

interface CompletedDataProps {}

const CompletedData: FC<CompletedDataProps> = () => {
    const { rander, darkMode ,setRender,setOpenEdit,setEditData}: any = useContext(MyContext);
    const [toggleComplet, setToggleComplet] = useState(false);
    const [completeTask, setCompleteTask] = useState([])
    const headers = { token: localStorage.getItem('token') }

   
    const fetchData = () => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/notes/Complete`, { headers })
            .then((response) => {
                setCompleteTask(response.data.note)
            })
            .catch((error) => {
                console.log("Error occurred:", error);
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

    useEffect(() => {
        fetchData();
    }, [rander])

    const handleEdit=(todo:any)=>{
        setOpenEdit(true)
        setEditData(todo)
        setRender(!rander)
    }

    const themecolor = localStorage.getItem('Completed-color') ?? '#333333';
    return (
        <>
            {completeTask?.length > 0 ?
                <>
                    <div className='w-[95%] flex items-center gap-4 mt-6 transition-all duration-300 cursor-pointer' onClick={() => setToggleComplet(!toggleComplet)}>
                        <span>{toggleComplet ? <LiaAngleDownSolid /> : <LiaAngleRightSolid />}</span>
                        <p className='text-md font-semibold'>Completed</p>
                        <span>{completeTask?.length}</span>
                    </div>
                    {toggleComplet ?
                     <motion.div
                     initial={{ y: -30 }}
                     animate={{ y: 0 }}
                     transition={{
                         duration: 0.5,
                         ease: 'easeOut'
                     }} className='w-[95%] h-full flex flex-col'>
                        {completeTask?.map((todo: any) => (
                            <div key={todo._id} className='w-[95%]  flex flex-col items-center mt-2 transition-all duration-300'>
                                <div className={`w-full min-h-[56px] h-auto py-2 rounded-md ${darkMode ? 'bg-[#141516] text-white hover:bg-[#2e2e30]' : 'bg-white hover:bg-gray-100 active:bg-[#eff6fc]'} flex items-center justify-between px-[20px] shadow-md`}>
                                    <span style={{color:themecolor}} className='cursor-pointer' onClick={() => handleCheckOut(todo)}>< BsCheckCircle/>
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

        </>
    );
}

export default CompletedData;
