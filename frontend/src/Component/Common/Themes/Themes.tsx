import { FC, useContext } from 'react';
import { IoColorPaletteOutline } from 'react-icons/io5'
import { LiaAngleRightSolid } from 'react-icons/lia'
import { AiOutlinePrinter } from 'react-icons/ai'
import { MyContext } from '../../../Contaxt/Contaxt';


interface ThemesProps {
    title?: any
    colorChange:boolean
    setColorChange: React.Dispatch<React.SetStateAction<boolean>>
}

const Themes: FC<ThemesProps> = (props) => {
    const { colorPallet, setColorPallet, themesToggle }: any = useContext(MyContext)
    const colors = ["#FF0000", "#FFA500", "#FFFF00", "#008000", "#0000FF", "#4B0082", "#9400D3","#581b98","#9c1de7","#f3558e","#ff304f","#ffd615","#e41749","#430d27","#0e153a"];

    const choosecolor = (item: any) => {
        localStorage.setItem(props?.title + '-color', item)
        props.setColorChange(!props.colorChange)
    }

    const handlePrint = () => {
        const divToPrint = document.getElementById(props.title);
        if (divToPrint) {
            const newWin = window.open('', 'PrintWindow');
            if (newWin) {
                newWin.document.open();
                newWin.document.write(`
              <html>
                <head>
                  <title>Print</title>
                  <link rel="stylesheet" type="text/css" href="./themes.css">
                </head>
                <body>
                <div id="print-content">
                ${Array.from(divToPrint.children).map((rowDiv) => `
                  <div class="row">
                    ${Array.from(rowDiv.children).map((cellDiv) => `
                      <div>${cellDiv.innerHTML}</div>
                    `).join('')}
                  </div>
                `).join('')}
              </div>
                </body>
              </html>
            `);
                newWin.document.close();
                newWin.print();
                newWin.close();
            }
        }
    };

    return (
        <>

            {themesToggle ?
                <>
                    <div className='text-sm font-normal text-gray-600 w-52 h-auto flex flex-col gap-1 relative rounded-md border bg-white'>
                        <div className='text-black p-2  font-semibold m-auto'>List Options</div>
                        <hr />
                        <div onClick={() => setColorPallet(!colorPallet)} className='flex items-center gap-4 cursor-pointer px-3 py-2 hover:bg-[#f3f2f1]'>
                            <span className='text-xl'><IoColorPaletteOutline /></span>
                            <span>Change Themes</span>
                            <span className='ml-2'><LiaAngleRightSolid /></span>
                        </div>
                        <div onClick={handlePrint} className='flex gap-4 cursor-pointer px-3 py-2 hover:bg-[#f3f2f1]'>
                            <span><AiOutlinePrinter className='text-xl' /></span>
                            <span>Print List</span>
                        </div>
                    </div>
                    {colorPallet ? <div className='absolute border rounded-md z-50 max-w-[400px] h-auto p-5 gap-2 max-[700px]:w-[200px] max-[700px]:flex-wrap bg-white flex justify-center items-center transition-all duration-300'>
                        {colors.map((item: any, i: any) => (
                            <div style={{ background: item }} onClick={() => choosecolor(item)} key={i} className={`w-8 h-12 rounded-full border cursor-pointer`}></div>
                        ))}
                    </div>
                        : ''}
                </>
                : ''}


        </>
    );
}

export default Themes;
