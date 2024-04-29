import React from 'react';
import { BounceLoader } from 'react-spinners';

const Loading = () => {
    return (
        <div className='w-40 mx-auto mt-40'>
            <BounceLoader color="#36d7b7" />
        </div>
    );
};

export default Loading;