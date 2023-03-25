import { Typography } from "@mui/material"
import { Box } from "@mui/system"
import {styled} from "@mui/material"
import {navData} from '../../constants/data.js'

const Components=styled(Box)`
display:flex;
margin 55px 130px 0 130px;
justify-content:space-between;
`
const Container=styled(Box)`
text-align:center;
`

const Navbar=()=>{
 
    return(
        <>
      
        <Components>
          {
            navData.map(Data=>(
                <Container>
                    <img src={Data.url} alt='' style={{width:64}} />
                    <Typography>{Data.text}</Typography>
                </Container>
            ))
          }
          
        </Components>
        </>
    )
}
export default Navbar;