import { useContext, type FC, useEffect, useState } from 'react';
import PageHeader from '../../Common/PageHeader/PageHeader';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { MyContext } from '../../../Contaxt/Contaxt';
import { IoReorderThreeOutline } from 'react-icons/io5';
import { RxCross2 } from 'react-icons/rx';
import { TbClockDown } from 'react-icons/tb';
import axios from 'axios';
import { MdDeleteForever } from 'react-icons/md';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';


interface RecycleBinProps { }

const RecycleBin: FC<RecycleBinProps> = () => {
    const { LeftNaveBar, rander, setRender, darkMode ,handleThemesToggle }: any = useContext(MyContext)
    const [recycleBin, setRecycleBin] = useState([])
    const [conformPopup, setConformPopup] = useState(false)
    const headers = { token: localStorage.getItem('token') }

    const fetchData = () => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/notes/Recyclebin`, { headers })
            .then((response) => {
                setRecycleBin(response.data.note)
            })
            .catch((error) => {
                console.log("Error occurred:", error);
            });
    }

    const handleDelete = (todo: any) => {
        axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/notes/${todo._id}/parmanentdelete`, { headers })
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

    const handleRestore = (todo: any) => {
        axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/notes/${todo._id}/restore`, { headers })
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

    const handleClear = () => {
        if (recycleBin.length > 0) {
            setConformPopup(true)
        }
    }

    const handleDeleteAll = () => {
        setConformPopup(false)
        axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/notes/parmanentdeleteall`, { headers })
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

    return (
        <>



            <div className=' w-full h-[92vh] relative'>
                {conformPopup ?
                 <div className='absolute bg-black bg-opacity-60  top-0 bottom-0 left-0 right-0 z-40 flex flex-col justify-center items-center'>
                    <div className={`w-60 h-32  ${darkMode ? 'bg-[#22201e] text-white' : 'bg-white'} rounded-lg px-5 pt-5 pb-2 flex flex-col justify-between relative`}>
                        <p className='font-medium'>Are you sure want to delete all permanently</p>
                        <p onClick={() => setConformPopup(false)} className='absolute top-2 right-2 w-6 cursor-pointer h-6 rounded-full bg-gray-200 text-black flex items-center justify-center'><RxCross2 /></p>
                        <div className='flex justify-between font-bold'>
                            <div onClick={() => setConformPopup(false)} className='cursor-pointer'>Cancle</div>
                            <div onClick={handleDeleteAll} className='cursor-pointer text-red-600'>Delete</div>
                        </div>
                    </div>
                </div>
                    : ''}

                <div className='w-full min-h-[15vh] h-auto  flex flex-col items-center'>
                    <PageHeader heading={'Trash'} handleClear={handleClear} clear={'Clear All'} icon={LeftNaveBar ? <  RiDeleteBin6Line /> : <IoReorderThreeOutline className='text-2xl bg-gray-100' />} />
                    <motion.div
                     initial={{ y: -30 }}
                     animate={{ y: 0 }}
                     transition={{
                         duration: 1,
                         ease: 'easeOut'
                     }}
                    onClick={handleThemesToggle} className='w-full h-[74vh] flex flex-col items-center overflow-y-auto scrollbar-hide mt-2'>

                        {recycleBin?.map((todo: any) => (
                            <motion.div
                            initial={{ y: -30 }}
                                            animate={{ y: 0 }}
                                            transition={{
                                                duration: 0.5,
                                                ease: 'easeOut'
                                            }} key={todo._id} className='w-[95%]  flex flex-col items-center mt-2 transition-all duration-300'>
                                <div className={`w-full min-h-[56px] h-auto py-2 rounded-md ${darkMode ? 'bg-[#030608] text-white hover:bg-gray-800' : 'bg-white hover:bg-gray-100 active:bg-[#eff6fc]'} flex items-center justify-between px-[20px] shadow-md`}>
                                    <span className='cursor-pointer' onClick={() => handleRestore(todo)}><TbClockDown className='text-green-500 text-xl' />
                                    </span>
                                    <div className='w-[80%] px-1 '>
                                        <p className={`${todo.isCompleted === true && 'line-through'}`}>{todo?.tasks}</p>
                                        <p className='text-xs'></p>
                                    </div>
                                    <span className='flex justify-end w-[10%] text-xl  text-blue-600 '>
                                        <span className='cursor-pointer text-red-500' onClick={() => handleDelete(todo)}>
                                            <MdDeleteForever />
                                        </span>
                                    </span>
                                </div>
                            </motion.div>))}

                    </motion.div>
                </div>
            </div>
        </>
    );
}

export default RecycleBin;

