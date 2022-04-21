const express=require('express');
const cors=require('cors');
const bodyParser=require('body-parser');
const Razorpay=require('razorpay');
const { response } = require('express');

const app=express();
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
const instance=new Razorpay({
    key_id: 'rzp_test_25KnYfoIcEzVyf',
    key_secret:'OEB12eQtyhSe5uHGIy9967q9'
})
app.post('/order',(req,res)=>{
    instance.orders.create({
        amount:50000,
        currency:'INR',
        receipt:'receipt#1',
        notes:{
            key1:'value3',
            key2:'value2'
        }        }
    ,(err,order)=>{
        if(err)
        console.log("err in order "+err);
        else
        console.log(order);
        res.status(200).json(order);

})

})
app.post('/order-status',(req,res)=>{
    instance.payments.fetch(req.body.razorpay_payment_id).then(paymentdeatail=>{
        console.log(paymentdeatail);
        res.send('Your payment sucessfull');
    })
})
app.listen(3000,(r)=>{
    console.log('server is runing');
})