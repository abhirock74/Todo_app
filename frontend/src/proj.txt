import { useContext, useState, FC, useEffect } from 'react';
import { MyContext } from '../../Contaxt/Contaxt';
import { RxCross2 } from 'react-icons/rx'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { MdDelete } from 'react-icons/md';
import { AiOutlineCamera } from 'react-icons/ai';
import avatar from '../../Assets/avatar.png'

interface ProfileProps { }



const Profile: FC<ProfileProps> = () => {
    const { viewProfileToggle, setViewProfileToggle, darkMode, setRender, rander, setProfileToggle }: any = useContext(MyContext)
    const [isInputOpen, setIsInputOpen] = useState(false);
    const [conformPopup, setConformPopup] = useState(false);
    const user = JSON.parse(localStorage.getItem('user') ?? '[]');
    const [imageFile, setImageFile] = useState<Blob | null>()
    const [rawUrl, setRawUrl] = useState<string | null>(`http://localhost:4000/${user.img_url}`)
    const headers = { token: localStorage.getItem('token') }
    const navigate = useNavigate()
    let userDetail = JSON.parse(localStorage.getItem('user') ?? '[]');
    const [cameraIcon,setCameraIcon]=useState(false)

    const initialValues = {
        name: user.name ? user.name : '',
        phone: user.phone ? user.phone : '',
        email: user.email ? user.email : '',
        gender: user.gender ? user.gender : '',
        address: user.address ? user.address : '',
    }

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        gender: Yup.string()
            .required('Gender is required')
            .oneOf(['Male', 'Female', 'other', 'male', 'female'], 'Invalid gender'),
        phone: Yup.string()
            .matches(/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits'),
    })

    const handleUpdate = async (values: any) => {
        try {
            let FD = new FormData;
            FD.append('name', values.name);
            FD.append('email', values.email);
            FD.append('gender', values.gender);
            FD.append('address', values.address);
            if (values.phone) {
                FD.append('phone', String(values.phone));
            }
            if (imageFile) {
                FD.append('file', imageFile);
            }
            const response = await axios.put(`http://localhost:4000/api/auth/${user._id}/updateUser`, FD, { headers });
            toast.success(response.data.message);
            localStorage.setItem('user', JSON.stringify(response.data.user))
            setIsInputOpen(false);
            setViewProfileToggle(false);
        } catch (error) {
            console.error("Error occurred:", error);
        }
    };

    const handleDelete = () => {
        axios.delete(`http://localhost:4000/api/notes/parmanentdeleteallnote_user`, { headers })
            .then((response) => {
            })
            .catch((error) => {
                console.log("Error occurred:", error);
                toast.error('Enternal Server Error')
            });

        axios.delete(`http://localhost:4000/api/auth/${user._id}/deleteUser`, { headers })
            .then((response) => {
                // fetchData()
                setRender(!rander)
                toast.success(response.data.message)
                localStorage.clear()
                setProfileToggle(false)
                setViewProfileToggle(false)
                navigate('/signin')
            })
            .catch((error) => {
                console.log("Error occurred:", error);
                toast.error('Enternal Server Error')
            });

    }

    const handleEdit = () => {
        setIsInputOpen(true)
    }
    const handleChange = (event?: any) => {
        setRawUrl(URL.createObjectURL(event.target.files[0]))
        setImageFile(event.target.files[0])
    }
    return (
        <>
            <div className={`w-full h-screen py-6 max-sm:py-0  ${viewProfileToggle ? '-translate-y-0' : '-translate-y-full'} transition-all duration-200 fixed top-0  z-50 ${darkMode ? 'bg-gray-700' : 'bg-black'}  bg-opacity-50 flex flex-col items-center`}>
                {conformPopup ?
                    <div className='absolute bg-gray-400 top-0 bottom-0 left-0 right-0 z-40 flex flex-col justify-center items-center'>
                        <p className='text-red-500'>* This Action May Loss your data parmanently</p>
                        <div className={`w-60 h-32  ${darkMode ? 'bg-[#22201e] text-white' : 'bg-white'} rounded-lg px-5 pt-5 pb-2 flex flex-col justify-between relative`}>
                            <p className='font-medium'>Are you sure want to delete your Account</p>
                            <p onClick={() => setConformPopup(false)} className='absolute top-2 right-2 w-6 cursor-pointer h-6 rounded-full bg-gray-200 text-black flex items-center justify-center'><RxCross2 /></p>
                            <div className='flex justify-between font-bold'>
                                <div onClick={() => setConformPopup(false)} className='cursor-pointer'>Cancle</div>
                                <div onClick={handleDelete} className='cursor-pointer text-red-600'>Delete</div>
                            </div>
                        </div>
                    </div>
                    : ''}

                <div className={`relative  shadow-md w-[600px] max-sm:w-full ${darkMode ? 'bg-[#1b1a19] text-gray-100' : 'bg-white'} h-full rounded-xl p-5`}>
                    <div className='w-8 h-8 cursor-pointer absolute top-0 -right-12 max-sm:right-2 max-sm:top-2 bg-gray-300 rounded-full flex flex-col items-center justify-center' onClick={() => setViewProfileToggle(false)}><RxCross2 className='text-black' />
                    </div>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={handleUpdate}
                        validationSchema={validationSchema}
                    >
                        <Form>

                            {isInputOpen ?
                                <div className={`absolute right-10 max-sm:bottom-0 z-10 max-sm:w-full max-sm:right-0 max-sm:pb-2 ${darkMode ? 'max-sm:bg-black' : 'max-sm:bg-white'}`}><button className='bg-blue-800 font-bold max-sm:w-full px-3 py-1 text-white rounded-xl' type='submit'>Save</button>
                                </div> :
                                <>
                                    <div onClick={() => setConformPopup(true)} className={`absolute right-10 max-sm:bottom-0 z-10 max-sm:w-1/2 max-sm:right-0 max-sm:pb-2 ${darkMode ? 'max-sm:bg-black' : 'max-sm:bg-white'} `}><button className='bg-red-600 cursor-pointer font-bold max-sm:w-full px-3 py-1 rounded-xl text-white'>Delete Account</button>
                                    </div>
                                    <div onClick={handleEdit} className={`absolute left-10 max-sm:bottom-0 z-10 max-sm:w-1/2 max-sm:left-0  max-sm:pb-2 ${darkMode ? 'max-sm:bg-black' : 'max-sm:bg-white'}`}><button className='bg-blue-800 font-bold max-sm:w-full px-3 text-white py-1 rounded-xl'>Update Profile</button>
                                    </div>
                                </>
                                }

                            <div className='flex flex-col items-center justify-center font-semibold font-serif'>
                                <div className="w-44 h-44 rounded-full">
                                    <div className="flex items-center justify-center w-full">
                                            <label htmlFor="dropzone-file" className="flex flex-col relative items-center justify-center w-full h-44 border-2 border-gray-300 border-dashed rounded-full bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                                {rawUrl !== null && (
                                                    <img src={userDetail.img_url == '' ? avatar : rawUrl} alt="" className="w-full h-full object-cover absolute z-30 rounded-full" />
                                                )}
                                                {isInputOpen ?
                                                    <span onClick={() => setRawUrl(null)} onMouseEnter={()=> setCameraIcon(true)} onMouseLeave={()=> setCameraIcon(false)} className='absolute w-full cursor-pointer h-full hover:bg-black hover:bg-opacity-50 rounded-full flex items-center justify-center z-30' >{cameraIcon ? <AiOutlineCamera className='text-3xl text-white ' /> : ''}</span>
                                                    : ''}
                                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                    <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                                    </svg>
                                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span></p>
                                                </div>
                                                {rawUrl === null &&
                                                    <input id="dropzone-file" type="file" accept="image/*" onChange={(e: any) => handleChange(e)} className="hidden" />
                                                }
                                            </label>
                                    </div>
                                </div>
                                <div className={`mt-10 sm:h-10 w-full cursor-default  flex max-sm:flex-col gap-5 sm:w-1/2 border-b shadow-inner shadow-gray-400 px-2 py-1 rounded-md relative`}>
                                    <span>Name:-</span>
                                    <span >
                                        <Field readOnly={!isInputOpen} className={`w-full ${isInputOpen ? 'cursor-text' : 'cursor-default'} h-full focus:outline-none bg-transparent`} type='text' name='name' id='name' />
                                    </span>
                                    <span className="text-red-500 text-sm"><ErrorMessage name="name" /></span>
                                </div>
                                <div className={`mt-7 sm:h-10 w-full cursor-default  flex max-sm:flex-col gap-5 sm:w-1/2 border-b shadow-inner shadow-gray-400 px-2 py-1 rounded-md relative`}>
                                    <span>Email:-</span>
                                    <span >
                                        <Field readOnly className={`w-full ${isInputOpen ? 'cursor-not-allowed' : 'cursor-default'} h-full focus:outline-none bg-transparent`} type='email' name='email' id='email' />
                                    </span>
                                </div>
                                <div className={`mt-7 sm:h-10 w-full cursor-default  flex max-sm:flex-col gap-5 sm:w-1/2 border-b shadow-inner shadow-gray-400 px-2 py-1 rounded-md relative`}>
                                    <span>Phone:-</span>
                                    <span >
                                        <Field readOnly={!isInputOpen} className={`w-full ${isInputOpen ? 'cursor-text' : 'cursor-default'} h-full focus:outline-none bg-transparent`} type='tel' name='phone' id='phone' />
                                    </span>
                                </div>
                                <span className="text-red-500 text-sm"><ErrorMessage name="phone" /></span>

                                <div className={`mt-7 sm:h-10 w-full cursor-default  flex max-sm:flex-col gap-5 sm:w-1/2 border-b shadow-inner shadow-gray-400 px-2 py-1 rounded-md relative`}>
                                    <span>Gender:-</span>
                                    <span >
                                        <Field readOnly={!isInputOpen} className={`w-full ${isInputOpen ? 'cursor-text' : 'cursor-default'} h-full focus:outline-none bg-transparent`} type='text' name='gender' id='gender' />
                                    </span>
                                    <span className="text-red-500 text-sm"><ErrorMessage name="gender" /></span>
                                </div>
                                <div className={`mt-7 sm:h-10 w-full cursor-default  flex max-sm:flex-col gap-5 sm:w-1/2 border-b shadow-inner shadow-gray-400 px-2 py-1 rounded-md relative`}>
                                    <span>Address:-</span>
                                    <span >
                                        <Field readOnly={!isInputOpen} className={`w-full ${isInputOpen ? 'cursor-text' : 'cursor-default'} h-full focus:outline-none bg-transparent`} type='text' name='address' id='address' />
                                    </span>
                                </div>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </>
    );
}

export default Profile;
