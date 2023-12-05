import React, { useContext } from 'react';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function OrderInfo() {

    return (
        <Box sx={{ width: "100%", display: 'flex', alignItems: 'space-between', gap: 2, marginBottom: 3 }}>
            <TextField
                id="outlined-basic"
                label="Account"
                variant="standard"
                /* value={account}
                onChange={e => setAccount(e.target.value)} */
                fullWidth
            />
            <TextField
                id="outlined-basic"
                label="Order Number"
                variant="standard"
                /* value={order}
                onChange={e => setOrder(e.target.value)} */
                sx={{ width: "80%" }}
            />
        </Box>
    )
}