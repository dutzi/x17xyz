const whitelist = [
  'http://localhost:5050',
  'http://xxxxxxxxxxxxxxxxx.xyz',
  'https://xxxxxxxxxxxxxxxxx.xyz',
];

const corsOptions = {
  origin: function (
    origin: string,
    callback: (err: Error | null, allow?: boolean) => void
  ) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

export default corsOptions;
