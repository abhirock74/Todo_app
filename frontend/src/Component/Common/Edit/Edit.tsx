import { useContext, type FC, useState, useEffect } from 'react';
import { HiPlus } from 'react-icons/hi2'
import { CiBellOn } from 'react-icons/ci'
import { PiRepeatLight } from 'react-icons/pi'
import { RiDeleteBinLine } from 'react-icons/ri'
import { AiOutlinePaperClip } from 'react-icons/ai'
import { AiOutlineTag } from 'react-icons/ai'
import { AiFillStar } from 'react-icons/ai'
import { BsCircle, BsCheckCircle } from 'react-icons/bs'
import { AiOutlineStar } from 'react-icons/ai'
import { BsCalendar4Event } from 'react-icons/bs'
import { BiSun } from 'react-icons/bi'
import { GoSidebarCollapse } from 'react-icons/go'
import { MyContext } from '../../../Contaxt/Contaxt';
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { Field, Form, Formik } from 'formik';
import { BiRightArrowAlt } from 'react-icons/bi'
import * as Yup from 'yup';


interface EditProps { }

const Edit: FC<EditProps> = () => {
    const { setRender, rander, editData, setOpenEdit, darkMode, editForm, setEditData, setEditForm }: any = useContext(MyContext)
    const [taskForEdit, settaskForEdit] = useState({} as any);
    const headers = { token: localStorage.getItem('token') }

    const initialValues = {
        tasks: editData.tasks
    }

    const validationSchema = Yup.object().shape({
        tasks: Yup.string().required('Tasks is required'),
    })
    
    const fetchData = async () => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/notes/${editData._id}/getForEdit`, { headers })
            .then((response) => {
                settaskForEdit(response.data.note);
            })
            .catch((error) => {
                console.log("Error occurred:", error);
                toast.error('Enternal Server Error')
            });
    }
  
    const handleCheck = (todo: any) => {
        if (todo.isCompleted === true) {
            axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/notes/${editData._id}/CkeckoutNotes`, { headers })
                .then((response) => {
                    setRender(!rander)
                    toast.success(response.data.message)
                })
                .catch((error) => {
                    console.log("Error occurred:", error);
                    toast.error('Enternal Server Error')
                });
        } else {
            axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/notes/${editData._id}/completed`, { headers })
                .then((response) => {
                    setRender(!rander)
                    toast.success(response.data.message)
                })
                .catch((error) => {
                    console.log("Error occurred:", error);
                    toast.error('Enternal Server Error')
                });
        }
    }

    useEffect(() => {
        fetchData();
    }, [rander])

    const handleDelete = () => {
        axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/notes/${editData._id}/delete`, { headers })
            .then((response) => {
                // fetchData()
                setRender(!rander)
                toast.success(response.data.message)
            })
            .catch((error) => {
                console.log("Error occurred:", error);
                toast.error('Enternal Server Error')
            });
        setOpenEdit(false)
    }

    const handleUpdate = (values: any) => {
        axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/notes/${editData._id}/update`, values, { headers })
            .then((response) => {
                setEditForm(false)
                setEditData({ ...{ tasks: values.tasks, _id: editData._id, isCompleted: editData.isCompleted } })
                toast.success(response.data.message)
                setRender(!rander)
            })
            .catch((error) => {
                console.log("Error occurred:", error);
            });
    }

    return (
        <>

            <motion.div
                initial={{ x: 300 }}
                animate={{ x: 0 }}
                transition={{
                    duration: 0.5,
                    ease: 'easeOut'
                }} className={`h-full overflow-hidden flex flex-col ${darkMode ? 'bg-[#252423] text-white' : 'bg-white text-black'} px-6 pt-5`}>

                <div className='w-full overflow-y-auto scrollbar-hide'>
                    <div className={`p-3.5 ${darkMode ? 'bg-[#141516] text-white' : `bg-white  ${editForm ? '' : 'hover:bg-gray-100'} text-black `} rounded-t-md  flex justify-between items-center`}>
                        {editForm ? '' :
                            <span onClick={() => handleCheck(taskForEdit)} className='w-[10%] flex justify-start text-[#2564cf] cursor-pointer'>{taskForEdit.isCompleted === true ? <BsCheckCircle/>: <BsCircle />}</span>
                        }
                        <span onClick={() => setEditForm(true)} className='w-[100%] flex flex-col'>
                            {editForm ?
                                <Formik
                                    initialValues={initialValues}
                                    onSubmit={handleUpdate}
                                    validationSchema={validationSchema}
                                >
                                    <Form className='w-full flex items-center justify-between'>
                                        <Field type="text" name='tasks' id='tasks' className={`focus:outline-none font-semibold text-lg px-2 w-full rounded-lg ${darkMode ? 'bg-[#141516] text-white' : 'bg-white'}`} />
                                        <button type='submit'><BiRightArrowAlt className='text-green-700 text-xl' /></button>
                                    </Form>
                                </Formik>
                                : <>
                                    <span className={`${taskForEdit.isCompleted === true ? 'font-normal line-through' : ' font-semibold text-lg '} `}>{taskForEdit.tasks}</span>
                                    <span className='text-base'></span>
                                </>}
                        </span>
                        {editForm ? '' :
                            <>
                                <span className='w-[10%] flex justify-end text-xl text-[#2564cf]'><AiOutlineStar className='cursor-pointer' />
                                </span>
                            </>
                        }
                    </div>
                    <div onClick={() => setEditForm(false)} className='w-full flex gap-3 flex-col'>
                        <div className='  flex flex-col  rounded-b-md'>
                            <div className={` p-3.5 ${darkMode ? 'bg-[#141516] text-white' : 'hover:bg-gray-100 bg-[#ffff]'} flex justify-between`}>
                                <span className='w-[10%] text-2xl text-[#2564cf]'><HiPlus className='cursor-pointer' /></span>
                                <span className='w-[90%] text-sm text-[#2564cf] pl-2'>Add step</span>
                            </div>
                        </div>

                        <div className={`flex justify-center cursor-default ${darkMode ? 'bg-[#141516] text-white hover:bg-gray-800' : 'bg-[#ffff] hover:bg-gray-100 hover:text-gray-900 text-gray-600'}  rounded-md p-3.5  `}>
                            <span className='w-[10%] text-xl '><BiSun /></span>
                            <span className='w-[90%] text-sm pl-2 '>Add to My Day</span>
                        </div>

                        <div className='flex flex-col rounded-md cursor-default'>

                            <div className={`flex justify-center ${darkMode ? 'bg-[#141516] text-white hover:bg-gray-800' : 'bg-[#ffff] hover:bg-gray-100 hover:text-gray-900 text-gray-600'}  rounded-md p-3.5  `}>
                                <span className='w-[10%] text-xl'><CiBellOn /></span>
                                <span className='w-[90%] text-sm pl-2'>Remind me</span>
                            </div>

                            <div className={`flex justify-center ${darkMode ? 'bg-[#141516] text-white hover:bg-gray-800' : 'bg-[#ffff] hover:bg-gray-100 hover:text-gray-900 text-gray-600'}  rounded-md p-3.5  `}>
                                <span className='w-[10%] text-sm'><BsCalendar4Event /></span>
                                <span className='w-[90%] text-sm pl-2'>Add due date</span>
                            </div>

                            <div className={`flex justify-center ${darkMode ? 'bg-[#141516] text-white hover:bg-gray-800' : 'bg-[#ffff] hover:bg-gray-100 hover:text-gray-900 text-gray-600'}  rounded-md p-3.5  `}>
                                <span className='w-[10%] text-xl'><PiRepeatLight /></span>
                                <span className='w-[90%] text-sm pl-2'>Repeat</span>
                            </div>
                        </div>

                        <div className={`flex justify-center ${darkMode ? 'bg-[#141516] text-white hover:bg-gray-800' : 'bg-[#ffff] hover:bg-gray-100 hover:text-gray-900 text-gray-600'}  rounded-md p-3.5  `}>
                            <span className='w-[10%] text-xl'><AiOutlineTag /></span>
                            <span className='w-[90%] text-sm pl-2'>Pick a category</span>
                        </div>
                        <div className={`flex justify-center ${darkMode ? 'bg-[#141516] text-white hover:bg-gray-800' : 'bg-[#ffff] hover:bg-gray-100 hover:text-gray-900 text-gray-600'}  rounded-md p-3.5  `}>
                            <span className='w-[10%] text-xl'><AiOutlinePaperClip /></span>
                            <span className='w-[90%] text-sm pl-2'>Add file</span>
                        </div>

                        <div className='flex justify-between '>
                            <textarea name="text" id="text" placeholder='Add note' className={`row-span-4 resize-none text-sm  rounded-md  p-3.5  w-full h-full border ${darkMode ? 'bg-[#2c2b29] text-white' : 'bg-white text-black'} border-white hover:border hover:border-gray-300 focus:outline-none`}></textarea>
                        </div>
                    </div>
                    <div className='w-full h-auto py-4 border-t flex justify-between items-center'>
                        <div className='cursor-pointer'><GoSidebarCollapse
                            onClick={() => {
                                setOpenEdit(false)
                                setEditForm(false);
                            }} className='' /></div>

                        <div className='text-xs'>{taskForEdit?.isCompleted === true ? 'Completed on' : taskForEdit?.isDeleted === true ? 'Deleted on' : 'Created on' } {taskForEdit?.createdAt}</div>
                        <div onClick={handleDelete}><RiDeleteBinLine className='text-lg cursor-pointer' /></div>
                    </div>
                </div>
            </motion.div>

        </>
    );
}

export default Edit;

