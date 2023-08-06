const cLog = (req, res, next) => {

    switch (req.method) {

        case "GET":
            console.info(`\x1b[32m ${req.method} \x1b[0m request for \x1b[100m${req.path}\x1b[0m`);
            break;
        case "POST":
            console.info(`\x1b[33m ${req.method} \x1b[0m request for \x1b[100m${req.path}\x1b[0m`);
            break;
        case "DELETE":
            console.info(`\x1b[31m ${req.method} \x1b[0m request for \x1b[100m${req.path}\x1b[0m`);
            break;
        default:
            console.info(`\x1b[35m ${req.method} \x1b[0m request for \x1b[100m${req.path}\x1b[0m => \x1b[31mMETHOD NOT RECOGNISED\x1b[0m`);
            break;

    }

    next();

}

exports.cLog = cLog;