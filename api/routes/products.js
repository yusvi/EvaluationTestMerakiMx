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
        request.query('select * from products', function (err, data) {
            
            if (err){
                console.log(err)
                res.status(200).json({
                    success:false,
                    message:'Error Get request to /products',
                    description: err,
                    data: []
                });
            }
            else{
                res.status(200).json({
                    success:true,
                    message:'Handling Get request to /products',
                    data: data
                });
            }
           
           
            
        });
    });

    
});


router.get('/:productId', (req, res, next)=>{

    
    sql.connect(config, function (err) {
    
        if (err) console.log('Error SQL: ',err);

        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        request.query(" select * from products where id = " +req.params.productId+" ", function (err, data) {
            
            if (err){
                console.log(err)
                res.status(200).json({
                    success:false,
                    message:'Error Get request to /products by id',
                    description: err,
                    data: []
                });
            }
            else{
                res.status(200).json({
                    success:true,
                    message:'Handling Get request to /products by id',
                    data: data
                });
            }
           
           
            
        });
    });

    
});


router.post('/', (req, res, next)=>{


    var query = "INSERT INTO products (product_name, category, price) VALUES ('" +req.body.product_name+"','"+req.body.category+"','"+req.body.price+"')";
   

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
                    message:'Error Get request to /products',
                    description: err,
                    data: []
                });
            }
            else{
                res.status(200).json({
                    success:true,
                    message:'Handling Get request to /products',
                    data: data
                });
            }
           
           
            
        });
    });
 

    // res.status(201).json({
    //     message:'Handling POST request to /products',
    //     product: product
    // });

});

module.exports = router;