import { Static, Type } from '@sinclair/typebox';
import { server } from './src/server';

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
