import * as dotenv from 'dotenv';
dotenv.config();

const credentials = {
  postgres: {
    USERNAME: process.env.USER || "",
    DATABASE: process.env.DATABASE || "",
    HOST: process.env.HOST_NAME || "",
    PASSWORD: process.env.PASSWORD || "",
    DBPORT: Number(process.env.PORTNAME) || 5432,
  },
  gocardless: {
    API_KEY: process.env.GC_API_KEY || ""
  },
  jwt: {
    SECRET: process.env.JWT_KEY || "",
  }
};

export default credentials;
