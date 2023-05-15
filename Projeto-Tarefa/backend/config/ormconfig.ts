import { DataSource } from "typeorm";

const dotenv = require("dotenv");
dotenv.config();

declare let process: {
  env: {
      DB_POSTGRES_HOSTNAME: string;
      DB_POSTGRES_USERNAME: string;
      DB_POSTGRES_PASSWORD: string;
      DB_POSTGRES_DATABASE: string;
      DB_POSTGRES_PORT: number;
  };
};

const connectDB = new DataSource({
  type: "postgres",
  host: process.env.DB_POSTGRES_HOSTNAME,
  port: process.env.DB_POSTGRES_PORT,
  username: process.env.DB_POSTGRES_USERNAME,
  password: process.env.DB_POSTGRES_PASSWORD,
  database: process.env.DB_POSTGRES_DATABASE,
  logging: false,
  synchronize: true,
  entities: ["./src/Entities/**/*.ts"],
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

connectDB
  .initialize()
  .then(() => {
    console.log(`Data Source has been initialized`);
  })
  .catch((err) => {
    console.error(`Data Source initialization error`, err);
  });

export default connectDB;
