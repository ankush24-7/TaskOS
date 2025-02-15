const logger = (req, res, next) => {
  const userAgent = req.get("User-Agent");
  const ip = req.ip || req.connection.remoteAddress;
  const origin = req.get('Origin') || 'No Origin header';
  const authToken = req.headers["authorization"] || "No token provided";

  console.log(`Request Info:
    IP Address: ${ip}
    Origin: ${origin}
    User-Agent: ${userAgent}
    Authorization Token: ${authToken}
    Request Method: ${req.method}
    Request URL: ${req.originalUrl}
  `);

  next();
};

module.exports = logger;
