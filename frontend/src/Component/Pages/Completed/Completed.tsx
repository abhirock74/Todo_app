import { useContext, type FC } from 'react';
import { CiCircleCheck } from 'react-icons/ci'
import { IoReorderThreeOutline } from 'react-icons/io5'
import PageHeader from '../../Common/PageHeader/PageHeader';
import { MyContext } from '../../../Contaxt/Contaxt';
import CompletedData from '../../Common/CompletedData/CompletedData';

interface CompletedProps {}

const Completed: FC<CompletedProps> = () => {
    const { LeftNaveBar,handleThemesToggle }: any = useContext(MyContext)
   
    return (
        <>
            <div className=' w-full h-[92vh]'>
                <div className='w-full min-h-[15vh] h-auto  flex flex-col items-center'>
                    <PageHeader heading={'Completed'} icon={LeftNaveBar ? < CiCircleCheck /> : <IoReorderThreeOutline className='text-2xl bg-gray-100' />} />
                </div>
                <div onClick={handleThemesToggle} className='w-full h-[74vh] flex flex-col items-center overflow-y-auto scrollbar-hide mt-2'>
                    <CompletedData />
                </div>
            </div>
        </>
    );
}

export default Completed;
