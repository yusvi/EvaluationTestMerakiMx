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
    const product = {
        name: req.body.name,
        price: req.body.price
    };

    res.status(201).json({
        message:'Handling POST request to /orders',
        product: product
    });
});

module.exports = router;