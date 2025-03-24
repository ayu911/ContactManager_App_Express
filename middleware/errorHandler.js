const { constants } = require('../constants'); // Import the constants file

const errorHandler = (err, req, res, next) => {
    // Ensure a valid status code is set; default to 500 if not provided
    const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : constants.INTERNAL_SERVER_ERROR;

    // Prepare the response object based on the error status code
    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.status(constants.VALIDATION_ERROR).json({
                title: "Validation Error",
                message: err.message,
                stackTrace: err.stack
            });
            break;

        case constants.UNAUTHORIZED:
            res.status(constants.UNAUTHORIZED).json({
                title: "Unauthorized",
                message: err.message,
                stackTrace: err.stack
            });
            break;

        case constants.FORBIDDEN:
            res.status(constants.FORBIDDEN).json({
                title: "Forbidden",
                message: err.message,
                stackTrace: err.stack
            });
            break;

        case constants.NOT_FOUND:
            res.status(constants.NOT_FOUND).json({
                title: "Not Found",
                message: err.message,
                stackTrace: err.stack
            });
            break;

        default:
            res.status(constants.INTERNAL_SERVER_ERROR).json({
                title: "Internal Server Error",
                message: err.message,
                stackTrace: err.stack
            });
            break;
    }
};

// Export the middleware so it can be used in the app
module.exports = errorHandler;
