const notFound = (req,res,next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`); // create an object
    res.status(404);
    next(error);


}


const errorHandler = (err,req,res,next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    const message = err.message;

    if(err.name === 'CastError' && err.kind === 'ObjectId') {
        statusCode = 404;
        message = 'Resource not Found';
    }

    res.status(statusCode).json({message, stack: process.env.NODE_ENV === 'Production' ?null :err.stack })
}

export{notFound, errorHandler};
