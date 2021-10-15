import fastify, { FastifyInstance } from "fastify";
import { connect } from './database/database';
import { Static, Type } from '@sinclair/typebox';

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

const Item = Type.Object({
  name: Type.String(),
  category: Type.Optional(Type.String()),
});
type ItemType = Static<typeof Item>;

interface IQuerystring {
  trashItem: string;
}

server.get<{
  Querystring: IQuerystring,
}>('/item', {
  preValidation: (request, reply, done) => {
    const { trashItem } = request.query;
    done(trashItem === 'poop' ? new Error('That is a bad word!') : undefined); // do not validate
  }
}
  , async (request, reply) => {
    const { trashItem } = request.query;

    return `You have to throw out ${trashItem} to the mixed bin`;
  });

server.post<{ Body: ItemType; Reply: ItemType; }>(
  "/item",
  {
    schema: {
      body: Item,
      response: {
        200: Item,
      },
    },
  },
  (request, reply) => {
    const { body: user } = request;
    reply.status(200).send(user);
  }
);
