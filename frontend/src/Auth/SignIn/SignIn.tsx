import { useState, useContext, type FC, useEffect } from 'react';
import logo from '../../Assets/todo img.jpg'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { BiRefresh } from 'react-icons/bi'
import { MyContext } from '../../Contaxt/Contaxt';
import { Link, useNavigate } from 'react-router-dom';
import google from '../../Assets/google.png'
import github from '../../Assets/github.png'
import sos from '../../Assets/SOS.png'
import { Field, Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import generateCaptcha from '../../utils'
import { toast } from 'react-toastify';


interface SignInProps { }
interface IFormValue {
    email: string,
    password: string,
    captchaInput: string
}

const SignIn: FC<SignInProps> = () => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/auth/login`;
    const navigate = useNavigate();

    let user = localStorage.getItem('user');

    useEffect(() => {
        if (user) {
            navigate('/')
        }
    }, [user]);

    const { toggleLogin, setToggleLogin, togglePassIcon, setTogglePassIcon }: any = useContext(MyContext);
    //this is captcha try
    const [captaIndex, setCaptaIndex] = useState(generateCaptcha());
    const handleClick = () => {
        setCaptaIndex(generateCaptcha())
    };
    //end
    const initialValues: IFormValue = {
        email: '',
        password: '',
        captchaInput: ''
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().required('Password is required')
            .min(8, 'Password must be 8 characters long')
            .matches(/[0-9]/, 'Password requires a number')
            .matches(/[a-z]/, 'Password requires a lowercase letter')
            .matches(/[A-Z]/, 'Password requires an uppercase letter')
            .matches(/[^\w]/, 'Password requires a symbol'),
        captchaInput: Yup.string()
            .required('Captcha code is required')
            .test('match-captcha', 'Captcha code does not match', (value) => {
                return value === captaIndex;
            }),
    });

    const handleLogin = (values: IFormValue) => {
        axios.post(url, values)
            .then((response) => {
                toast.success(response.data.message)
                navigate('/Tasks/:_id')
                localStorage.setItem('token', response.data.token as string)
                localStorage.setItem('user', JSON.stringify(response.data.user) as string)
            })
            .catch((error) => {
                toast.error(error.response.data.message)
                console.log("Error occurred:", error);
            });

    };

    return (
        <>
            <div className='w-screen h-screen bg-[#9c27b0] relative flex justify-center items-center'>
                <div className='w-[80%] max-w-[70rem]  max-[900px]:w-full  max-[900px]:h-full max-[900px]:flex-col  absolute rounded-md bg-white shado flex overflow-y-auto'>
                    <div className='absolute right-4 top-4'>
                        <span className='text-black text-sm'>New User ?</span>
                        <Link to={'/signUp'} className='text-blue-600 cursor-pointer'> SignUp</Link>
                    </div>
                    <div className='w-[40%] max-[900px]:w-full max-sm:h-auto border-r'><img className='w-full h-full' src={logo} alt="" /></div>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={handleLogin}
                        validationSchema={validationSchema}
                    >

                        <Form className='w-[60%] max-[900px]:w-full p-8 flex  flex-col items-center'>
                            <div className='text-gray-600 text-3xl font-bold mb-5'>Login</div>
                            <div className='w-full justify-center text-gray-700 max-[900px]:flex-col flex gap-10'>

                                <div className='w-full'>
                                    <Field className='w-full border-b outline-none font-medium pb-2' type="email" name='email' id='email' placeholder='User Name' />
                                    <span className="text-red-500 text-sm"><ErrorMessage name="email" /></span>
                                </div>

                                <div className='w-full relative'>
                                    <Field className='w-full border-b outline-none font-medium pb-2' type={`${togglePassIcon ? 'password' : 'text'}`} name='password' id='password' placeholder='Password' />
                                    <span onClick={() => setTogglePassIcon(!togglePassIcon)} className='absolute text-xl text-gray-600 right-2 cursor-pointer'>{togglePassIcon ? <FaEye /> : <FaEyeSlash />}</span>
                                    <span className="text-red-500 text-sm"><ErrorMessage name="password" /></span>
                                </div>
                                {/* value={captcha[captaIndex]} */}
                            </div>
                            <div className=' w-[18rem] max-sm:w-full mt-8  mb-6'>
                                <div className='mb-3 w-full h-10 border rounded-lg bg-[#ede7f6] p-2 flex items-center justify-center text-2xl font-bold line-through relative'>
                                    <span>{captaIndex}</span>
                                    <BiRefresh onClick={() => handleClick()} className='absolute right-2 top-2 text-2xl text-gray-800 cursor-pointer  transition-transform transform hover:-rotate-45' />
                                </div>
                                <div className='w-full h-10 rounded-lg border-2 border-[#e4daf3]'>
                                    <Field type='text' name='captchaInput' id='captchaInput' className='w-full h-full p-2 px-5  text-base font-serif font-medium outline-none text-center rounded-lg' placeholder='captcha' />
                                    <p className='font-serif text-red-600'><ErrorMessage name="captchaInput" /></p>
                                </div>
                            </div>
                            <div className='w-full text-gray-700 flex flex-col gap-4'>
                                <div className='flex max-sm:flex-col max-sm:gap-5 justify-between'>
                                    <div className=''>
                                        <p className='text-blue-500 mt-4 underline hover:text-blue-700 cursor-pointer'>Forgot Password</p>
                                    </div>
                                    <div className='max-sm:w-full w-[8rem] h-[2.25rem] rounded-md shadow-md border'><button type='submit' className='bg-green-600 text-white rounded-md w-full h-full font-medium'>Login</button></div>
                                </div>
                            </div>

                            <div className='w-full mt-5'>
                                <div className="w-full relative border-b-2 flex justify-center">
                                    <p className="absolute -top-3.5  bg-white px-2 text-sm font-medium">
                                        or login using
                                    </p>
                                </div>
                                <div className='w-full flex justify-center mt-3 gap-2'>
                                    <div className="w-10 h-10 border flex justify-center items-center p-2 cursor-pointer rounded-full">
                                        <img src={google} alt="" />
                                    </div>
                                    <div className="w-10 h-10 border flex justify-center items-center p-2 cursor-pointer rounded-full">
                                        <img src={github} alt="" />
                                    </div>
                                    <div className="w-10 h-10 border flex justify-center items-center p-2 cursor-pointer rounded-full">
                                        <img src={sos} alt="" />
                                    </div>
                                </div>
                            </div>
                        </Form>
                    </Formik>
                </div>

            </div>
        </>
    );
}

export default SignIn;
