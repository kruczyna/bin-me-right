import { FastifyPluginCallback } from "fastify";
import { connectWithDatabase, disconnect } from "../database/database";
import { TrashItemModel } from "../database/trashItem/trashItem.model";
import { IQuerystring } from "../server";


export const deleteItemRoute: FastifyPluginCallback = async (fastify, options, done) => {
  fastify.delete<{
    Querystring: IQuerystring,
  }>('/', {
    preValidation: (request, reply, done) => {
      const { trashItem } = request.query;
      done(trashItem === 'poop' ? new Error('That is a bad word!') : undefined);
    }
  }
    , async (request, reply) => {
      connectWithDatabase();

      const { trashItem } = request.query;

      try {
        const record = await TrashItemModel.deleteOne({ name: trashItem });
        reply.status(200).send(`You have deleted a/an ${trashItem}`);
      } catch (e) {
        console.error(`We have an error: ${e}`);
        disconnect();
      }
    });
};
