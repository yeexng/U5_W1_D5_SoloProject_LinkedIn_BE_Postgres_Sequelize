import Express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";
import {
  badRequestErrorHandler,
  genericErrorHandler,
  notFoundErrorHandler,
} from "./errorHandlers.js";
import { pgConnect } from "./db.js";
import usersRouter from "./users/index.js";
import experiencesRouter from "./experiences/index.js";
import postsRouter from "./posts/index.js";
import commentsRouter from "./comments/index.js";

const server = Express();
const port = process.env.PORT || 3005;

//Middlewares
server.use(cors());
server.use(Express.json());

//Endpoints
server.use("/users", usersRouter);
server.use("/users", experiencesRouter);
server.use("/users", postsRouter);
server.use("/users", commentsRouter);
//Error Handlers
server.use(badRequestErrorHandler);
server.use(notFoundErrorHandler);
server.use(genericErrorHandler);

await pgConnect();

server.listen(port, () => {
  console.table(listEndpoints(server));
  console.log(`Server is running on port ${port}`);
});
