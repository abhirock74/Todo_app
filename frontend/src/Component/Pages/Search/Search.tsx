import { useContext, type FC, useEffect, useState } from 'react';
import { MyContext } from '../../../Contaxt/Contaxt';
import axios from 'axios';
import { BiSolidTrash } from 'react-icons/bi';
import { BsCheckCircle, BsCircle } from 'react-icons/bs';
import { LiaAngleDownSolid, LiaAngleRightSolid } from 'react-icons/lia';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import search from '../../../Assets/empty_search-removebg-preview.png'
import { motion } from 'framer-motion';
import { IoReorderThreeOutline } from 'react-icons/io5'
interface SearchProps { }

const Search: FC<SearchProps> = () => {
    const { rander, darkMode, setRender, searchValue, LeftNaveBar ,setLeftNaveBar,setOpenEdit,setEditData}: any = useContext(MyContext);
    const [toggleComplet, setToggleComplet] = useState(true);
    const [searchData, setSearchData] = useState([])
    const headers = { token: localStorage.getItem('token') }
    const navigate = useNavigate()


    const fetchData = () => {
        if (searchValue) {
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/notes/search/${searchValue}`, { headers })
                .then((response) => {
                    setSearchData(response.data.note)
                    navigate(`/Searching/:${searchValue}`)
                })
                .catch((error) => {
                    console.log("Error occurred:", error);
                });
        }
    }

    const handleCheckOut = (todo: any) => {
        if (todo.isCompleted === true) {
            axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/notes/${todo._id}/CkeckoutNotes`, { headers })
                .then((response) => {
                    fetchData()
                    toast.success(response.data.message)
                })
                .catch((error) => {
                    console.log("Error occurred:", error);
                    toast.error('Enternal Server Error')
                });
        } else {
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
    }, [rander, searchValue])

    const handleEdit=(todo:any)=>{
        setOpenEdit(true)
        setEditData(todo)
        setRender(!rander)
    }
    return (
        <>

            <div className=' w-full h-[92vh]'>
                <div className='w-full min-h-[15vh] h-auto  flex flex-col items-center'>
                    <div className='w-[95%] h-auto text-xl flex font-bold text-blue-700 py-8 px-5'>
                        {LeftNaveBar ? '' : 
                        <span onClick={() => setLeftNaveBar(true)}><IoReorderThreeOutline className='text-2xl bg-gray-100 mr-2' />
                        </span>}
                        <span className=''>Searching for</span>
                        <span>"{searchValue}"</span>
                    </div>
                </div>
                <div className='w-full h-[74vh] flex flex-col items-center overflow-y-auto scrollbar-hide mt-2'>

                    {searchValue ?
                        <>
                            {searchData?.length > 0 ?
                                <>
                                    <div className='w-[95%] flex items-center gap-4 mt-6 transition-all duration-300 cursor-pointer' onClick={() => setToggleComplet(!toggleComplet)}>
                                        <span>{toggleComplet ? <LiaAngleDownSolid /> : <LiaAngleRightSolid />}</span>
                                        <p className='text-md font-semibold'>Tasks</p>
                                        <span>{searchData?.length}</span>
                                    </div>
                                    {toggleComplet ?
                                        <motion.div
                                            initial={{ y: -30 }}
                                            animate={{ y: 0 }}
                                            transition={{
                                                duration: 0.5,
                                                ease: 'easeOut'
                                            }}
                                            className='w-[95%] h-full flex flex-col'>
                                            {searchData?.map((todo: any) => (
                                                <div key={todo._id} className='w-[95%]  flex flex-col items-center mt-2 transition-all duration-300'>

                                                    <div className={`w-full min-h-[56px] h-auto py-2 rounded-md ${darkMode ? 'bg-[#141516] text-white hover:bg-[#2e2e30]' : 'bg-white hover:bg-gray-100 active:bg-[#eff6fc]'} flex items-center justify-between px-[20px] shadow-md`}>
                                                        <span className='cursor-pointer text-blue-500' onClick={() => handleCheckOut(todo)}>
                                                            {todo.isCompleted === true ? < BsCheckCircle /> : <BsCircle />}

                                                        </span>
                                                        <div onClick={()=>handleEdit(todo)} className='w-[80%] px-1 '>
                                                            <p className={`${todo.isCompleted === true && 'line-through'}`}>{todo?.tasks}</p>
                                                            <p className='text-xs text-[#d25359]'>{todo?.page}</p>
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
                            }  </> : <img src={search} alt="" />}



                </div>
            </div>


        </>
    );
}

export default Search;
