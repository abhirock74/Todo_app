import type { FC } from 'react';
import ScaleLoader from 'react-spinners/ScaleLoader';


interface LoderProps {
    isLoading: boolean
}

const Loder: FC<LoderProps> = ({ isLoading }) => {
    return (
        <>
            {isLoading ? <div>
                <ScaleLoader
                    className='loder'
                    color="#3f37d7"
                    speedMultiplier={2}
                />
            </div>
                : null
            }
        </>
    );
}

export default Loder;


