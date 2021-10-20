import fastify, { FastifyInstance } from 'fastify';
import { Static, Type } from '@sinclair/typebox';
import rateLimit from 'fastify-rate-limit';
import * as bearerAuthPlugin from 'fastify-bearer-auth';
import { postItemRoute } from './routes/postItem';
import { getItemRoute } from './routes/getItem';
import { deleteItemRoute } from './routes/deleteItem';

const superKeys = new Set(['a-super-secret-key', 'another-super-secret-key']);

export const server: FastifyInstance = fastify({
  logger: true,
})
  .register(postItemRoute, { prefix: '/item' })
  .register(getItemRoute, { prefix: '/item' })
  .register(deleteItemRoute, { prefix: '/item' })
  .register(rateLimit, {
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
  })
  .register(bearerAuthPlugin, { keys: superKeys, bearerType: 'Bearer' });

const Item = Type.Object({
  name: Type.String(),
  binAssignment: Type.Number(),
  isBreakable: Type.Boolean(),
});

export type ItemType = Static<typeof Item>;

export interface IQuerystring {
  trashItem: string;
}

const bodyJsonSchema = {
  type: 'object',
  required: ['name', 'binAssignment'],
  properties: {
    name: { type: 'string' },
    binAssignment: { type: 'string' },
    isBreakable: {
      type: 'boolean',
    }
  }
};

export const schema = {
  body: bodyJsonSchema,
};
