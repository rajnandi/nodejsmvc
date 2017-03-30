var Base = new (require('./BaseModel'))();
module.exports = {
    table: 'DNAVITTA.tblFaqContents',
    getFaqList: function (params, callback) {
        var query = "SELECT FaqContentId,Question,Answer FROM " + this.table + "";
        var where = "";
        if (Object.keys(params).length) {
            if (params.id)
                where += "AND FaqContentId = " + params.id;
        } else {
           where += "AND IsActive = 1"; 
        }
        
        if (where != "") {
            where = " WHERE " + this.util.ltrim(where, "AND ");
        }
        
        query += where;
        this.db.request().query(query, function (err, recordset) {
        //dbreq.input('pCategoryId', 8);
        //dbreq.execute("[Anatomy].[uspGetBodyPartTree]", function (err, recordset) {
            if (err) {
                callback({status: 'error', error : err});
            }
            else {
                callback(false, recordset);
            }
        });
    }
};