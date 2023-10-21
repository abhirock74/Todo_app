import type { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../Home/Home';
import Planed from '../Pages/Planned/Planed';
import MyDay from '../Pages/My Day/MyDay';
import Importaint from '../Pages/Importaint/Importaint';
import All from '../Pages/All/All';
import Completed from '../Pages/Completed/Completed';
import Tasks from '../Pages/Tasks/Tasks';
import SignIn from '../../Auth/SignIn/SignIn';
import SignUp from '../../Auth/SignUp/SignUp';
import RecycleBin from '../Pages/Recyclebin/Recyclebin';
import Search from '../Pages/Search/Search';

interface RouterProps { }

const Router: FC<RouterProps> = () => {
    return (
        <>
            <Routes>
                <Route path='/signin' element={<SignIn />} />
                <Route path='/signUp' element={<SignUp />} />
                <Route path='*' element={<>Page Note Found!</>} />
                <Route element={<Home />}>
                    <Route path='/' element={<All />} />
                    <Route path='/planed' element={<Planed />} />
                    <Route path='/myDay' element={<MyDay />} />
                    <Route path='/Importaint' element={<Importaint />} />
                    <Route path='/planed' element={<Planed />} />
                    <Route path='/completed' element={<Completed />} />
                    <Route path='/Tasks/:_id' element={<Tasks />} />
                    <Route path='/recyclebin' element={<RecycleBin/>} />
                    <Route path='/Searching/:value' element={<Search/>} />
                </Route>
            </Routes>
        </>
    );
}

export default Router;
