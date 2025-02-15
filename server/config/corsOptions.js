const whitelist = [
  "http://localhost:5173", 
  "http://127.0.0.1:5173",
];

const corsOptions = {
  // origin: function (origin, callback) {
  //   console.log("origin:", origin);
  //   if (whitelist.indexOf(origin) !== -1) {
  //     callback(null, true);
  //   } else {
  //     callback(new Error("Not allowed by CORS"));
  //   }
  // },
  origin: '*',
  optionsSuccessStatus: 200,
  credentials: true,
};

module.exports = corsOptions;