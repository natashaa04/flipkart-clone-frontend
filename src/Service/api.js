import axios from 'axios'

const URL='http://localhost:8000';

export const authenticateSignup=async(data)=>{

    try{
   return await axios.post(`${URL}/signup`,data);
    }catch(error){
        console.log('Error while calling signup api',error.response.data);
    }
}

export const authenticateLogin=async(data)=>{
                     
    try{
   return await axios.post(`${URL}/login`,data);
    }catch(error){
        console.log('Error while calling login api',error.response.data);
        return error;
    }
}

export const checkoutHandler=async(amount)=>{
    const {data :{order}}=await axios.post(`${URL}/checkout`,amount);
    const {data:{key}}=await axios.get(`${URL}/getkey`);

    const options = {
        key, // Enter the Key ID generated from the Dashboard
        amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "Natasha Chawda",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        callback_url: `${URL}/paymentverification`,
        prefill: {
            name: "gaurav kumar",
            email: "gauravkumar@example.com",
            contact: "9000090000"
        },
        notes: {
            address: "Razorpay Corporate Office"
        },
        theme: {
            color: "#3399cc"
        }
    };
    const razor = new window.Razorpay(options);
        razor.open();

}