import React, { useState, createContext, FC, useEffect } from 'react';

interface datas {
    tasks?: string,
    page?: string,
    icon?: string,
    createdAt?: Date,
    modifiedAt?: Date,
    isDeleted?: boolean,
    isCompleted?: boolean,
    created_by?: any
}

interface ContextValue {
    LeftNaveBar: boolean;
    setLeftNaveBar: React.Dispatch<React.SetStateAction<boolean>>;
    editForm: boolean
    setEditForm: React.Dispatch<React.SetStateAction<boolean>>;
    darkMode: boolean
    setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
    toggleLogin: boolean;
    setToggleLogin: React.Dispatch<React.SetStateAction<boolean>>;
    togglePassIcon: boolean
    setTogglePassIcon: React.Dispatch<React.SetStateAction<boolean>>;
    toggleRegister: boolean,
    setToggleRegister: React.Dispatch<React.SetStateAction<boolean>>;
    profileToggle: boolean;
    setProfileToggle: React.Dispatch<React.SetStateAction<boolean>>;
    rander: boolean
    setRender: React.Dispatch<React.SetStateAction<boolean>>
    colorPallet: boolean
    setColorPallet: React.Dispatch<React.SetStateAction<boolean>>
    themesToggle: boolean
    setThemesToggle: React.Dispatch<React.SetStateAction<boolean>>
    handleThemesToggle: Function
    opensearch: boolean
    setOpensearch: React.Dispatch<React.SetStateAction<boolean>>
    searchValue: string
    setsearchValue: React.Dispatch<React.SetStateAction<string>>
    MyDay: datas[]
    setMyDay: React.Dispatch<React.SetStateAction<datas[]>>
    task: datas[]
    setTask: React.Dispatch<React.SetStateAction<datas[]>>
    Importaint: datas[]
    setImportaint: React.Dispatch<React.SetStateAction<datas[]>>
    planned: datas[]
    setPlanned: React.Dispatch<React.SetStateAction<datas[]>>
    openEdit: boolean
    setOpenEdit: React.Dispatch<React.SetStateAction<boolean>>
    editData:{}
    setEditData:React.Dispatch<React.SetStateAction<{}>>
    viewProfileToggle:boolean
    setViewProfileToggle:React.Dispatch<React.SetStateAction<boolean>>
    openShort:boolean
    setOpenShort:React.Dispatch<React.SetStateAction<boolean>>
}
interface ContextProps {
    children: React.ReactNode;
}
export const MyContext = createContext<ContextValue | null>(null);
const Context: FC<ContextProps> = ({ children }) => {
    const [LeftNaveBar, setLeftNaveBar] = useState(true);     //leftnave hide show
    const [editForm, setEditForm] = useState(false);       //edit form toggle
    const [darkMode, setDarkMode] = useState(() => {
        const storedDarkMode = localStorage.getItem('darkMode');
        return storedDarkMode === 'true';
    });
    useEffect(() => {
        localStorage.setItem('darkMode', darkMode.toString());
    }, [darkMode]);
    const [toggleLogin, setToggleLogin] = useState(false);    //login button hide
    const [toggleRegister, setToggleRegister] = useState(false);    //login button hide
    const [togglePassIcon, setTogglePassIcon] = useState(true);  //password hide
    const [profileToggle, setProfileToggle] = useState(false);  //profile hide sho
    const [rander, setRender] = useState(false);   //renderring data
    const [colorPallet, setColorPallet] = useState(false)   //change themes
    const [themesToggle, setThemesToggle] = useState(false)
    const [opensearch, setOpensearch] = useState(false);    //open search component
    const [openEdit, setOpenEdit] = useState(false);    //open search component
    const [openShort, setOpenShort] = useState(false);    //open shorting component
    const [editData, setEditData] = useState({});    //open search component
    const [searchValue, setsearchValue] = useState('');
    const [MyDay, setMyDay] = useState<datas[]>([]);
    const [Importaint, setImportaint] = useState<datas[]>([])
    const [task, setTask] = useState<datas[]>([]);
    const [planned, setPlanned] = useState<datas[]>([])
    const [viewProfileToggle,setViewProfileToggle]=useState(false)

    const handleThemesToggle = () => {    //set thems
        setColorPallet(false)
        setThemesToggle(false)
        setOpenShort(false)
       
    }

    const contextValue: ContextValue = {
        LeftNaveBar, setLeftNaveBar,
        editForm, setEditForm,
        darkMode, setDarkMode,
        toggleLogin, setToggleLogin,
        togglePassIcon, setTogglePassIcon,
        toggleRegister, setToggleRegister,
        profileToggle, setProfileToggle,
        rander, setRender,
        colorPallet, setColorPallet,
        themesToggle, setThemesToggle,
        handleThemesToggle,
        opensearch, setOpensearch,
        searchValue, setsearchValue,
        MyDay, setMyDay,
        task, setTask,
        Importaint, setImportaint,
        planned, setPlanned,
        openEdit, setOpenEdit,
        editData, setEditData,
        viewProfileToggle,setViewProfileToggle,
        openShort, setOpenShort,
    };

    return (
        <MyContext.Provider value={contextValue}>
            {children}
        </MyContext.Provider>
    );
};

export default Context;