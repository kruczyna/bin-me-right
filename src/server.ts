import fastify, { FastifyInstance } from "fastify";
import { connect } from './database/database';

const port = 3322;

export const server: FastifyInstance = fastify({
  logger: true,
});

connect();

server.listen(port, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server started at ${address}`);
});
