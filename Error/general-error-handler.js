import winston from 'winston';
const { format } = winston;
const {combine, prettyPrint,  errors, metadata} = format;

// this enable easy calling of the handler outside of this file
export default function error (err, req, res, next) {
    const logger = winston.createLogger({
        level: 'error',
        format: combine(
            errors({stack: true}),
            prettyPrint(),
            metadata(),
        ),
        transports: [
            // save error messages to flat file
            new winston.transports.File({filename: 'errors.log', options: {flags: 'w'}}),

        ]
    });


    // this enable viewing the error in the console when application is not running as json
    if(process.env.NODE_ENV !== 'production') {
        logger.add(new winston.transports.Console({
            format: winston.format.simple()
        }));
    }

    logger.error(err); // log the error to file: this is what trigger the logging

    return res.status(500).send({message: 'Please check back later something must have gone wrong'});
};