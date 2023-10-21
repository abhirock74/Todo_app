import { type FC, useContext, useRef } from 'react';
import { BsCircle } from 'react-icons/bs'
import { AiOutlineSend } from 'react-icons/ai'
import { MyContext } from '../../../Contaxt/Contaxt';
import { Field, Formik, Form, FormikHelpers} from 'formik';
import * as Yup from 'yup';
import axios from 'axios'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

interface FormProps {
    title?: string
}
interface IFormValue {
    page?:string;
    tasks: string,
};

const Inputs: FC<FormProps> = ({ title }) => {
    const {setRender,rander, darkMode, editForm }: any = useContext(MyContext);
    const headers = { token: localStorage.getItem('token') }

    const initialValues: IFormValue = {
        tasks:'',
    };

    const validationSchema = Yup.object().shape({
        tasks: Yup.string().required('task is required')
    });

    const handleSubmit = (values: IFormValue, { resetForm }: FormikHelpers<IFormValue>) => {
        values['page'] = title ? title : '';
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/notes/create`,values,{headers})
            .then((response) => {
                if (response.status === 200) {
                    setRender(!rander)
                    toast.success(response.data.message)
                } else {
                    console.log('not post')
                }
            })
            .catch((error) => {
                toast.error(error.response.data.message)
                console.log("Error occurred:", error);
            });
            resetForm();
    };
    return (
        <>
            <div className={`w-full ${editForm ? '' : 'mb-4'} flex  flex-col items-center  gap-5`}>
                <div className='w-[95%] rounded-xl  shadow-md bg-[#fff]  relative'>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={handleSubmit}
                        validationSchema={validationSchema}
                    >
                        <Form className='w-full h-full rounded-xl'>
                            <div className='w-full h-14'>
                                <Field
                                    name='tasks'
                                    id='tasks'
                                    type='text' placeholder='Add a task' className={`w-full h-full rounded-md focus:outline-none px-14 placeholder:text-sm placeholder:text-[#222222] ${darkMode && 'bg-[#252423] text-white placeholder:text-white'} text-sm text-[#333333]`} />
                            </div>
                            <button type='submit' className='absolute top-[19px] right-[20px] cursor-pointer'><AiOutlineSend className='text-xl text-green-600 cursor-pointer' /></button>
                            <span className='absolute top-[19px] left-[25px] cursor-pointer'><BsCircle /></span>
                        </Form>
                    </Formik>
                </div>
            </div>
        </>
    );
}

export default Inputs;

