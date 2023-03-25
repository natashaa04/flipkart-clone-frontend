import {Dialog,Box, TextField, Typography,Button,styled} from '@mui/material';
import { useState } from 'react';
import { authenticateSignup,authenticateLogin } from '../../Service/api.js';
import { DataContext } from '../../context/DataProvider.js';
import { useContext } from 'react';

const Component= styled(Box)`
height:75vh;
width:95vh;
display:flex;
`;
const Image=styled(Box)`
background: #2874f0 url(https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/login_img_c4a81e.png) center 75% no-repeat;

height: 81.7%;
width:35%;
padding: 45px 35px;

&>p, &>h5{
   color:#FFFFFF;
   font-weight:400;
}
`;

const Wrapper=styled(Box)`
display: flex;
flex-direction: column;
padding:25px 35px;
flex: 1;
&>div,&>button,&>p{
    margin-top:20px;

}
`;

const LoginButton=styled(Button)`
text-transform:none;
background:#FB641B;
color:#fff;
height:48px;
border-radius:2px;
`;
const Requestotp=styled(Button)`
text-transform:none;
height:48px;
border-radius:2px;
box-shadow: 0 2px 4px 0 rgb(0 0 0/20%)
`;

const Text=styled(Typography)`

font-size:12px;
color:#878787;
`;
const CreateAccount=styled(Typography)`
font-size:12px;
text-align:center;
color:#2874f0;
font-weight:700;
cursor:pointer;
`;
const Error=styled(Typography)`
font-size:10px;
color:#ff6161;
line-height:0;
margin-top:10px;
font-weight:600;
`;

const LoginDialog=({open,setOpen})=>{
      
    const signupInitialValue={
        firstname:'',
        lastname:'',
        username:'',
        email:'',
        password:'',
        phone:'',
     };
     const loginInitialValue={
        username:'',
        password:''
     }
     const [signup,setSignup]=useState(signupInitialValue);
     const [login,setLogin]= useState(loginInitialValue);
     const  [error,setError]= useState(false);
     
     const a=useContext(DataContext); 

     const onInputChange=(e)=>{
              setSignup({ ...signup,[e.target.name]:e.target.value});
     };
      
    const accountInitialValue={
             login:{
                view:'login',
                heading:"Login",
                subHeading:"Get acces to your orders,Wishlist and Recommendations"
             },
             signup:{
                view:'signup',
                heading:"Looks like you're new here!",
                subHeading:"sign up with your mobile number to get started"

             }
    }
    const [account,toggleAccount]=useState(accountInitialValue.login);

        const toggleSignUp=()=>{
            toggleAccount(accountInitialValue.signup)
        }
        const loginBox=()=>{
            setOpen(false);
            toggleAccount(accountInitialValue.login);
            setError(false);
        }

        const signupUser=async()=>{
         let response = await  authenticateSignup(signup);
         if(!response)return;
         loginBox();
         a.setAccount(signup.firstname)
        }
        const onValueChange=(e)=>{
              setLogin({...login,[e.target.name]:e.target.value})
        }
        const loginUser=async()=>{
           let response= await authenticateLogin(login);
             if(response.status===200){
                console.log(response);
                loginBox();
                a.setAccount(response.data.data.firstname);
               }
               else {
                console.log(response);
                    setError(true);
               } 
             }
             
        
      


    return(
        <>
        <Dialog open ={open} onClose={loginBox} PaperProps={{sx:{maxWidth:'unset'}}}>
            <Component>
            <Image>
                <Typography variant="h5">{account.heading}</Typography>
                <Typography style={{marginTop:20}}>{account.subHeading}</Typography>
            </Image>
            { account.view==='login' ?
            <Wrapper>
                <TextField variant="standard" onChange={(e)=>onValueChange(e)}  name='username' label="Enter username"/>
               {error && <Error>Please enter valid username or password!</Error>}
                <TextField variant="standard" onChange={(e)=>onValueChange(e)} name='password' label="Enter Password"/>
                <Text>By continuing, you agree to FlipKart's Terms of Use and Privacy Policy</Text>
                <LoginButton onClick={()=>loginUser()}>Login</LoginButton>
                <Typography style={{textAlign:'center'}}>OR</Typography>
                <Requestotp>Request OTP</Requestotp>
                <CreateAccount onClick={toggleSignUp}>New to FlipKart? Create an Account</CreateAccount>
                </Wrapper>
                :
                <Wrapper>
                <TextField variant="standard" onChange={(e)=>onInputChange(e)} name='firstname' label="Enter Firstname"/>
                <TextField variant="standard" onChange={(e)=>onInputChange(e)} name='lastname'  label="Enter Lastname"/>
                <TextField variant="standard" onChange={(e)=>onInputChange(e)} name='username'  label="Enter Username"/>
                <TextField variant="standard" onChange={(e)=>onInputChange(e)} name='email'     label="Enter Email"/>
                <TextField variant="standard" onChange={(e)=>onInputChange(e)} name='password'  label="Password"/>
                <TextField variant="standard" onChange={(e)=>onInputChange(e)} name='phone'     label="Enter Phone"/>
                <LoginButton onClick={()=>signupUser()}>Continue</LoginButton>
                </Wrapper>
                }
            </Component>
        </Dialog>
        </>
    )
};
export default LoginDialog;















