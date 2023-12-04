import React, { useEffect, useState } from 'react';
import { useCheckboxContext } from './Context';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Checkbox from '@mui/material/Checkbox';


interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

interface CheckListProps {
    something?: string
}

interface TabData {
    name: string,
    values: string[],
    isEmpty?: boolean
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`skills-${index}`}
            aria-labelledby={`skills-${index}`}
            {...other}
        >
            {value === index && (
                <Box>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `skills-${index}`,
        'aria-controls': `skills-${index}`,
    };
}

const CheckList: React.FC<CheckListProps> = () => {
    const [value, setValue] = React.useState(0);
    const [tabs, setTabs] = useState<TabData[]>([]);

    useEffect(() => {
        const fetchTabData = async () => {
            try {
                const data: TabData[] | null = await window.api.invoke('get-data');
                if (!data) {
                    setTabs([{
                        name: 'Welcome',
                        values: ['Checklist is not setup'],
                        isEmpty: true
                    }]);
                    return;
                }
                setTabs(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchTabData();
    }, []);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    function generateTabPanels() {
        if (tabs.length === 1 && tabs[0].isEmpty) {
            return generateWelcome();
        } else {
            return tabs.map((tab, index) => (
                <CustomTabPanel key={index} value={value} index={index}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 200 }} size='small'>
                            <TableHead>
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell>Task Name</TableCell>
                                    <TableCell>Time Stamp</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tab.values.map((value, subIndex) => (
                                    <TableRow key={subIndex}>
                                        <TableCell>
                                            <Checkbox />
                                        </TableCell>
                                        <TableCell>{value}</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CustomTabPanel>
            ));
        }
    }

    function generateWelcome() {
        return (
            <Box>
                <Typography>Welcome!</Typography>
                <Typography>Please click on the gear icon to setup your tasks</Typography>
            </Box>
        )
    }

    return (
        <Box position={'relative'} width={'100%'} height={'80%'}>
            <Box sx={{ width: '100%', height: 'calc(100% - 50px)', overflow: 'auto' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'center' }}>
                    <Tabs value={value} onChange={handleChange} variant='scrollable' aria-label="skills" scrollButtons="auto">
                        {tabs.map((tab, index) => (
                            <Tab key={index} label={tab.name} {...a11yProps(index)} />
                        ))}
                    </Tabs>
                </Box>
                <Box sx={{ marginTop: 2 }}>{tabs.length > 0 ? generateTabPanels() : null}</Box>
            </Box>
            {/* Remaining code unchanged */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, height: '50px', position: 'absolute', bottom: 0, width: '100%' }}>
                <ButtonGroup variant="contained" aria-label="outlined primary button group" fullWidth>
                    <Button>Submit</Button>
                    <Button sx={{ width: '30%' }}><KeyboardArrowDownIcon /></Button>
                </ButtonGroup>
                <Button variant='contained' color='secondary' sx={{ width: '60%' }}>Reset</Button>
            </Box>
        </Box>
    );
};

export default CheckList;
