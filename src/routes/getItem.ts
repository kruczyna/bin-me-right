import { FastifyPluginCallback } from "fastify";
import { connectWithDatabase } from "../database/database";
import { TrashItemModel } from "../database/trashItem/trashItem.model";
import { IQuerystring } from "../server";

export const getItemRoute: FastifyPluginCallback = async (fastify, options, done) => {
  fastify.get<{
    Querystring: IQuerystring,
  }>('/', {
    preValidation: (request, reply, done) => {
      const { trashItem } = request.query;
      done(trashItem === 'poop' ? new Error('That is a bad word!') : undefined); // do not validate
    },
  }
    , async (request, reply) => {
      connectWithDatabase();
      const { trashItem } = request.query;

      try {
        const record = await TrashItemModel.findOne({ name: trashItem });

        if (!record || undefined) {
          reply.status(404).send(`The item ${trashItem} does not exist in the DB`);
        }

        reply.status(204).send(`You have to throw out ${trashItem} to the ${record.binAssignment} bin`);
      } catch (error) {
        console.error(`We have an error: ${error}`);
      }
    });
};
