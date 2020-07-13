const express = require('express');
const router = express.Router();

const sql = require("mssql/msnodesqlv8");
const config = require('../../config')['development']['database'];


router.get('/', (req, res, next)=>{


    sql.connect(config, function (err) {
    
        if (err) console.log('Error SQL: ',err);

        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        request.query('select * from orders', function (err, data) {
            
            if (err){
                console.log(err)
                res.status(200).json({
                    success:false,
                    message:'Error Get request to /orders',
                    description: err,
                    data: []
                });
            }
            else{
                res.status(200).json({
                    success:true,
                    message:'Handling Get request to /orders',
                    data: data
                });
            }
           
           
            
        });
    });
 


    
});


router.post('/', (req, res, next)=>{


    var query = "INSERT INTO orders (product_name, customer_name, product_id, customer_id, order_date, quantity, total) VALUES ('" +req.body.product_name+"','"+req.body.customer_name+"','"+req.body.product_id+"','"+req.body.customer_id+"','"+req.body.order_date+"','"+req.body.quantity+"','"+req.body.total+"')";
   

    sql.connect(config, function (err) {
    
        if (err) console.log('Error SQL: ',err);

        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        request.query(query, function (err, data) {
            
            if (err){
                console.log(err)
                res.status(200).json({
                    success:false,
                    message:'Error Get request to /orders',
                    description: err,
                    data: []
                });
            }
            else{
                res.status(200).json({
                    success:true,
                    message:'Handling Get request to /orders',
                    data: data
                });
            }
           
           
            
        });
    });
 



});

module.exports = router;