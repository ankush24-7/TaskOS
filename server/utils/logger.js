const logger = (req, res, next) => {
    const url = req.url;
    const method = req.method;
    console.log(`${method} ${url}`);
    next();
}

module.exports = logger;