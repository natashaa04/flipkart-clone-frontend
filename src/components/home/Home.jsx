
import { Box } from "@mui/system"
import Navbar from "./Navbar"
import Banners from "./Banners"
import {styled} from "@mui/material"

import { useEffect } from "react";
import { getProducts } from "../../redux/actions/productAction";
import { useDispatch, useSelector } from "react-redux";

import Slide from "./Slide";



const Components=styled(Box)`
padding:20px 10px;
background:#F2F2F2;
`;



const Home=()=>{
    const {products}= useSelector((state)=> state.getProducts);

    const dispatch= useDispatch();
    
    useEffect(()=>{
        dispatch( getProducts());
    },[dispatch])



       
          
    
    
    return(
        <>
       <Navbar/>
       <Components>
       <Banners/>
       <Slide products={products} title='Deal of the Day' timer={true} />
       <Slide products={products} title='Discount for You' timer={false} />
       <Slide products={products} title='Suggested Items' timer={false} />
       <Slide products={products} title='Top Selection' timer={false} />
       <Slide products={products} title='Recommended Items' timer={false} />
       <Slide products={products} title='Trending Offers' timer={false} />
       <Slide products={products} title="Season's top picks" timer={false} />
       <Slide products={products} title='Top deals on Accessories' timer={false} />
       </Components>
      
        </>
    )
}
export default Home