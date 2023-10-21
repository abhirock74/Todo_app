import { useContext, useEffect, useState, FC } from 'react';
import { MyContext } from '../../Contaxt/Contaxt';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import google from '../../Assets/google.png'
import github from '../../Assets/github.png'
import sos from '../../Assets/SOS.png';
import { Field, Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios'
import { toast } from 'react-toastify';
import { FiCheckSquare } from 'react-icons/fi'
import { FiSquare } from 'react-icons/fi'
import { BiRefresh } from 'react-icons/bi';
import generateCaptcha from '../../utils';


interface SignUpProps { };
interface IFormValue {
    email: string,
    password: string,
    name: string,
    conformPassword: string,
    gender: string,
    captchaInput: string,
};

const SignUp: FC<SignUpProps> = () => {
    const navigate = useNavigate();
    const { toggleRegister, setToggleRegister, togglePassIcon, setTogglePassIcon }: any = useContext(MyContext);
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/auth/register`
    

    let user = localStorage.getItem('user');
    useEffect(() => {
        if (user) {
            navigate('/')
        }
    }, [user]);


    const [captaIndex, setCaptaIndex] = useState(generateCaptcha());
    const handleClick = () => {
        setCaptaIndex(generateCaptcha())
    };

    const initialValues: IFormValue = {
        email: '',
        password: '',
        name: '',
        conformPassword: '',
        gender: '',
        captchaInput: '',
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().required('Password is required')
            .min(8, 'Password must be 8 characters long')
            .matches(/[0-9]/, 'Password requires a number')
            .matches(/[a-z]/, 'Password requires a lowercase letter')
            .matches(/[A-Z]/, 'Password requires an uppercase letter')
            .matches(/[^\w]/, 'Password requires a symbol'),
        conformPassword: Yup.string().required('Please confirm your password')
            .oneOf([Yup.ref('password')], 'Password does not match'),
        gender: Yup.string()
            .required('Gender is required')
            .oneOf(['Male', 'Female', 'other'], 'Invalid gender'),
        captchaInput: Yup.string()
            .required('Captcha code is required')
            .test('match-captcha', 'Captcha code does not match', (value) => {
                return value === captaIndex;
            }),
    });

    const handleSignUp = (values: IFormValue) => {
        axios.post(url, values)
            .then((response) => {
                toast.success(response.data.message)
                navigate('/signin')
                setToggleRegister(false)
            })
            .catch((error) => {
                toast.error(error.response.data.message)
                console.log("Error occurred:", error);
            });

    };
    return (
        <>
            <div className='w-screen h-screen bg-[#9c27b0] relative flex justify-center items-center p-10'>
                <div className='w-[60%] max-w-[70rem] max-sm:w-full max-sm:h-full  absolute rounded-md bg-white shado flex overflow-y-auto'>
                    <div className='absolute right-4 top-4'>
                        <span className='text-black text-sm'>Already Have An Account ?</span>
                        <Link to={'/'} className='text-blue-600 cursor-pointer'> SignIn</Link>
                    </div>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={handleSignUp}
                        validationSchema={validationSchema}
                    >
                        <Form className=' w-[100%] max-[900px]:w-full p-8 flex pt-14  flex-col items-center  max-sm:h-auto'>
                            <div className='text-gray-600 text-3xl font-bold mb-5'>Register</div>

                            <div className='w-full justify-center text-gray-700 max-sm:flex-col flex mb-5 gap-10'>
                                <div className='w-full flex flex-col gap-8 '>
                                    <div className='w-full'>
                                        <Field className='w-full border-b outline-none font-medium pb-2' type="text" placeholder='Full Name' name='name' id='name' />
                                        <span className="text-red-500 text-sm"><ErrorMessage name="name" /></span>
                                    </div>
                                    <div className='w-full relative'>
                                        <Field className='w-full border-b outline-none font-medium pb-2' type={`${togglePassIcon ? 'password' : 'text'}`} name='password' id='password' placeholder='Password' />
                                        <span onClick={() => setTogglePassIcon(!togglePassIcon)} className='absolute text-xl text-gray-600 right-2 cursor-pointer'>{togglePassIcon ? <FaEye /> : <FaEyeSlash />}</span>
                                        <span className="text-red-500 text-sm"><ErrorMessage name="password" /></span>
                                    </div>
                                </div>
                                <div className='w-full flex flex-col gap-8 '>
                                    <div className='w-full'>
                                        <Field className='w-full border-b outline-none font-medium pb-2' type="email" placeholder='Email' name='email' id='email' />
                                        <span className="text-red-500 text-sm"><ErrorMessage name="email" /></span>
                                    </div>
                                    <div className='w-full relative'>
                                        <Field className='w-full border-b outline-none font-medium pb-2' type={`${togglePassIcon ? 'password' : 'text'}`} name='conformPassword' id='conformPassword' placeholder='Conform Password' />
                                        <span onClick={() => setTogglePassIcon(!togglePassIcon)} className='absolute text-xl text-gray-600 right-2 cursor-pointer'>{togglePassIcon ? <FaEye /> : <FaEyeSlash />}</span>
                                        <span className="text-red-500 text-sm"><ErrorMessage name="conformPassword" /></span>
                                    </div>
                                </div>
                            </div>
                            <div className='w-full text-gray-700 flex flex-col gap-2'>
                                <div className='mb-7 w-full'>
                                    <Field
                                        className="py-2 text-gray-700 font-medium border-b outline-none w-full"
                                        id="gender"
                                        name="gender"
                                        as="select">
                                        <option className='text-gray-700' value="chooche your gender">Chooche your gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="other">Other</option>
                                    </Field>
                                    <span className="text-red-500 text-sm"><ErrorMessage name="gender" /></span>
                                </div>
                                <div className='flex flex-col items-center gap-5'>
                                    <div className='flex items-center gap-5'>
                                        <span onClick={() => setToggleRegister(!toggleRegister)} className='text-xl text-gray-600'>
                                            {toggleRegister ? <FiCheckSquare className='text-green-500' /> : <FiSquare />}
                                        </span>
                                        <span>I accept Terms of Use and Privacy Policy of the Website.</span>
                                    </div>
                                    <div className=' w-[18rem] max-sm:w-full mt-2  mb-2'>
                                        <div className='mb-3 w-full h-10 border rounded-lg bg-[#ede7f6] p-2 flex items-center justify-center text-2xl font-bold line-through relative'>
                                            <span>{captaIndex}</span>
                                            <BiRefresh onClick={() => handleClick()} className='absolute right-2 top-2 text-2xl text-gray-800 cursor-pointer  transition-transform transform hover:-rotate-45' />
                                        </div>
                                        <div className='w-full h-10 rounded-lg border-2 border-[#e4daf3]'>
                                            <Field type='text' name='captchaInput' id='captchaInput' className='w-full h-full p-2 px-5  text-base font-serif font-medium outline-none text-center rounded-lg' placeholder='captcha' />
                                            <p className='font-serif text-red-600'><ErrorMessage name="captchaInput" /></p>
                                        </div>
                                    </div>
                                    <div className='w-full h-[2.25rem] rounded-md shadow-md border'>
                                        <button type='submit' disabled={!toggleRegister} className={`${toggleRegister ? 'bg-green-600 text-white' : 'cursor-not-allowed'} rounded-md  w-full h-full font-medium`}>SignUp</button>
                                    </div>
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

export default SignUp;
