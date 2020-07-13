const sql = require("mssql");


const productSchema = sql.Schema({
    id: sql.Types.ObjectId,
    name: String
});


module.exports = sql.model('Product', productSchema);

