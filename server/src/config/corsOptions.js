const whitelist = [
  "http://localhost:5173", 
  "https://task-os-rho.vercel.app",
  "https://task-os-rho.vercel.app/",
  "https://task-os-ankushs-projects-11b078a3.vercel.app/",
  "https://task-os-ankushs-projects-11b078a3.vercel.app",
  "https://task-os-git-main-ankushs-projects-11b078a3.vercel.app/",
  "https://task-os-git-main-ankushs-projects-11b078a3.vercel.app",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
  credentials: true,
};

module.exports = corsOptions;