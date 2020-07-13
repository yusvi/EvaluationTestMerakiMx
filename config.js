var config = {
    development: {


        database:{
            
            database:'merakiShopDB',  
            server: 'DESKTOP-3I340MI\\SQLEXPRESS02',
            driver: 'msnodesqlv8',
            options: {
                trustedConnection: true,
                enableArithAbort: true
            },
        },


    },

};

module.exports = config;