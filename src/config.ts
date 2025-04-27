const config = {
  JWT_SECRET: process.env.JWT_SECRET || 'leslie',
  PORT: process.env.PORT || 3000,
  DATABASE_URL: process.env.DATABASE_URL,
  SESSION_SECRET: process.env.SESSION_SECRET,
};

export default config;
