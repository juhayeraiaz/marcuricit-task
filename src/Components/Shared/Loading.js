import React from 'react';
import { BounceLoader } from 'react-spinners';

const Loading = () => {
    return (
        <div style={{ marginTop: "150px", width: "250px", marginLeft: "auto", marginRight: "auto" }}>
            <BounceLoader color="#36d7b7" />
        </div>
    );
};

export default Loading;