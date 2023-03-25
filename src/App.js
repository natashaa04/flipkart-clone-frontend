import Header  from './components/header/Header.jsx';
import Home from './components/home/Home.jsx';
import { Box } from '@mui/system';
import DataProvider from './context/DataProvider.js';                                                                                        
import DetailView from './components/itemdetails/DetailView.jsx';
import Cart from './components/cart/Cart.jsx';
import {BrowserRouter ,Routes,Route} from 'react-router-dom';


function App() {
  return (
 <>
 <DataProvider>
  <BrowserRouter>
<Header/>
<Box style={{marginTop:30}}>
  <Routes>
<Route path='/' element={<Home/>}/>
  <Route path='/products/:id' element={<DetailView/>}/>
  <Route path= '/cart' element={<Cart/>} />
</Routes>
</Box>
</BrowserRouter>
</DataProvider>
</>
  );
}

export default App;
