
import "reflect-metadata";
import { createConnection } from "typeorm";
import express from 'express';
import bodyParser from "body-parser";
import routes from './routes/index';
import cors from 'cors';
import helmet from "helmet";
import "reflect-metadata";
const app: express.Application = express();

//support application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: false }));
// Call midlewares
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());

// Mount the UserRouters
app.use(routes);

// The port the express app will listen on
const port = process.env.PORT || 3000;
app.listen(port, () => {
  // Success callback
  console.log(`Listening at http://localhost:${port}/`);
});
