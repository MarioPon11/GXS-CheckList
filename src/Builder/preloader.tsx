import { TailSpin } from 'react-loader-spinner';
import Box from '@mui/material/Box';

const LoadBar = () => {

    return (
            <Box display={'flex'} justifyContent={'center'} alignItems={'center'} sx={{ height: '100%', width: '100%' }}>
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
            </Box>
    );
};

export default LoadBar;
