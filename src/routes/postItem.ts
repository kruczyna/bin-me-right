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
        const record = await TrashItemModel.findOne({ name: body.name });

        if (!record) {
          await TrashItemModel.create(trashItem);
          //@ts-expect-error
          reply.status(200).send(`Created item an item with a name property of ${trashItem.name}`);
        } else {
          //@ts-expect-error
          reply.status(400).send(`Item ${body.name} already exists in the DB!`);
        }
      } catch (error) {
        console.error(`We got an error while creating a new entry!: ${error}`);
        disconnect();
      }

      done();
    });
};
