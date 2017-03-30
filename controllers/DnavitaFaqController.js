var Base = new (require('./BaseController'))();

Base.router.get('/', function (req, res, next) {
    var params = {};
	console.log(123);
    if (req.query.id)
        params.id = parseInt(req.query.id, 10);

    var DnavitaFaqModel = Base.loadModel('DnavitaFaqModel', req.db);
    DnavitaFaqModel.getFaqList(params, function (err, data) {
        if (err) {
            Base.io.response(res, {
                status : Base.io.status.ERR,
                message: err
            });
        }
        else {
            Base.io.response(res, {data : data});
        }
        
    });
});

module.exports = Base.router;