const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const productRoutes = require('./api/routes/products');
const customerRoutes = require('./api/routes/customers');
const orderRoutes = require('./api/routes/orders');
const sql = require("mssql/msnodesqlv8");
const config = require('./config')['development']['database'];


//CONEXION
sql.connect(config);


//OPTIONS
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers', 
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    if(res.method === "OPTONS"){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE');
        return res.status(200).json({});
    }
    next();
});



//Routes
app.use('/products', productRoutes);
app.use('/customers', customerRoutes);
app.use('/orders', orderRoutes);




//Error
app.use((req, res, next)=>{
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})



app.use((error, req ,res, next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    });
});


module.exports = app;