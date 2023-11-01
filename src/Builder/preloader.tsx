import React from 'react';
import { TailSpin } from 'react-loader-spinner';

const LoadBar  = () => {
    return (
        <div className="preloader">
            <TailSpin
                height="80"
                width="80"
                color="#0f5beb"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </div>
    )
};

export default LoadBar ;