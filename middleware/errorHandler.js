const { constants } = require("../constants");

const errorHandler = (err, req, res, next) => {

    const { VALIDATION_ERROR, NOT_FOUND, FORBIDDEN, UNAUTHORIZED, SERVER_ERROR } = constants;
   
    const statusCode = res.statusCode ? res.statusCode : 500;
    
    switch (statusCode) {
        case VALIDATION_ERROR:
            res.json({ title: "Validation Failed", message: err.message, stackTrace: err.stack });
        case UNAUTHORIZED:
            res.json({ title: "Un Authorized", message: err.message, stackTrace: err.stack });
        case NOT_FOUND:
            res.json({ title: "Not Found", message: err.message, stackTrace: err.stack });
        case FORBIDDEN:
            res.json({ title: "Forbidden", message: err.message, stackTrace: err.stack });
        case SERVER_ERROR:
            res.json({ title: "Server Error", message: err.message, stackTrace: err.stack });
        default:
            console.log("No error found")
            break;
    }
}

module.exports = errorHandler;