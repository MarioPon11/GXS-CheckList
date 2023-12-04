import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


const SettingMenu = (closeMenu: () => void) => {
    return (
        <Box>
            <Typography>Settings</Typography>
            <Button onClick={() => closeMenu()}>Close</Button>
        </Box>
    )
}

export default SettingMenu;