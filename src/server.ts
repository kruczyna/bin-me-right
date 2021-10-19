import fastify, { FastifyInstance, FastifySchema } from "fastify";
import { connect, disconnect } from './database/database';
import { Static, Type } from '@sinclair/typebox';
import { TrashItemModel } from "./database/trashItem/trashItem.model";
import rateLimit from 'fastify-rate-limit';

const port = 3322;

export const server: FastifyInstance = fastify({
  logger: true,
}).register(rateLimit, {
  global: false,
  max: 3,
  timeWindow: '5 minutes',
  errorResponseBuilder: function (req, context) {
    return {
      code: 429,
      error: 'Too Many Requests',
      message: `I only allow ${context.max} requests per ${context.after} to this API. Try again soon.`,
    };
  }
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
  binAssignment: Type.Number(),
  isBreakable: Type.Boolean(),
});

type ItemType = Static<typeof Item>;

interface IQuerystring {
  trashItem: string;
}

const bodyJsonSchema = {
  type: 'object',
  required: ['name'],
  properties: {
    name: { type: 'string' },
    binAssignment: { type: 'number' },
    isBreakable: {
      type: 'boolean',
    }
  }
};

const schema = {
  body: bodyJsonSchema,
};

server.get<{
  Querystring: IQuerystring,
}>('/item', {
  preValidation: (request, reply, done) => {
    const { trashItem } = request.query;
    done(trashItem === 'poop' ? new Error('That is a bad word!') : undefined); // do not validate
  }
}
  , async (request, reply) => {
    connect();
    const { trashItem } = request.query;
    const record = await TrashItemModel.findOne({ name: trashItem });
    if (record) {
      return `The item ${record.name} is already in the DB`;
    } else {
      return `You have to throw out ${trashItem} to the mixed bin`;
    };
  });

server.post<{ Body: ItemType; Reply: ItemType; }>(
  "/item",
  {
    schema,
  },
  async (request, reply) => {
    connect();
    const { body } = request;
    const { name, binAssignment, isBreakable } = body;

    let trashItem = { name, binAssignment, isBreakable };

    try {
      await TrashItemModel.create(trashItem);
      console.log(`Created item ${trashItem.name}`);
      disconnect();
    } catch (e) {
      console.error(`We have an error: ${e}`);
      disconnect();
    }
    reply.status(204);
    disconnect();
  });

server.delete<{
  Querystring: IQuerystring,
}>('/item', {
  preValidation: (request, reply, done) => {
    const { trashItem } = request.query;
    done(trashItem === 'poop' ? new Error('That is a bad word!') : undefined);
  }
}
  , async (request, reply) => {
    connect();

    const { trashItem } = request.query;

    try {
      const record = await TrashItemModel.deleteOne({ name: trashItem });
      reply.status(200).send(`You have deleted a/an ${trashItem}`);
    } catch (e) {
      console.error(`We have an error: ${e}`);
      disconnect();
    }
  });
