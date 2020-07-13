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
        request.query('select * from customers', function (err, data) {
            
            if (err){
                console.log(err)
                res.status(200).json({
                    success:false,
                    message:'Error Get request to /customers',
                    description: err,
                    data: []
                });
            }
            else{
                res.status(200).json({
                    success:true,
                    message:'Handling Get request to /customers',
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
        message:'Handling POST request to /customers',
        product: product
    });
});

module.exports = router;