import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';

const GeneralSettings = () => {
    const label = { inputProps: { 'aria-label': 'Switch demo' } };
    return (
        <Box>
            <Typography>General Settings</Typography>
            <Switch {...label} />
        </Box >
    )
}

export default GeneralSettings;