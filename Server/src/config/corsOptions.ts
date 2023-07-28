const allowedOrigins: Array<string> = [];

const corsOptions = {
  origin: (
    origin: string | undefined,
    cb: (error: Error | null, access: boolean) => void
  ) => {
    // allowed
    if (!origin || allowedOrigins.indexOf(origin) != -1) {
      cb(null, true);
    } else {
      cb(new Error("unauthorized access."), false);
    }
  },
};

export default corsOptions;
