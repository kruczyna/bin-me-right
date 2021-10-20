import { FastifyPluginCallback } from "fastify";
import { ItemType, schema } from "../server";
import { connectWithDatabase, disconnect } from '../database/database';
import { TrashItemModel } from "../database/trashItem/trashItem.model";

export const postItemRoute: FastifyPluginCallback = async (fastify, options, done) => {
  fastify.post<{ Body: ItemType; Reply: ItemType; }>(
    '/',
    {
      schema,
    },
    async (request, reply) => {
      connectWithDatabase();
      const { body } = request;
      const { name, binAssignment, isBreakable } = body;

      let trashItem = { name, binAssignment, isBreakable };

      try {
        await TrashItemModel.create(trashItem);
        console.log(`Created item ${trashItem.name}`);
      } catch (e) {
        console.error(`We have an error: ${e}`);
        disconnect();
      }
      reply.status(204);

      done();
    });
};
