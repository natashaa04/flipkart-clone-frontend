
import { Typography,Box,Menu,MenuItem,styled } from "@mui/material"
import { useContext, useState } from "react"
import { DataContext } from "../../context/DataProvider"
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew'


const Component=styled(Menu)`
margin-top:5px;
`
const Logout=styled(Typography)`
   font-size:14px;
   margin-left:8px;
`


const Profile=()=>{
     const a=useContext(DataContext);
     
     const [open,setOpen]= useState(false);

     const handleClick=(event)=>{
        setOpen(event.currentTarget)
     }
     const handleClose=()=>{
        setOpen(false);
     }
     const logoutUser=()=>{
        a.setAccount('');
     }

    return(
        <>
        <Box onClick={handleClick} >
        <Typography style={{marginTop:13,cursor:'pointer',color:"black"}}>{a.Account}</Typography>
        <Component
        anchorEl={open}
        open={Boolean(open)}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={()=>{handleClose();logoutUser();}}>
            <PowerSettingsNewIcon fontSize='small'/>
            <Logout>logout</Logout>
        </MenuItem>

      </Component>
        </Box>
        </>
    )
}
export default Profile;