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
      const record = await TrashItemModel.findOne({ name: trashItem });
      if (record) {
        return `The item ${record.name} is already in the DB`;
      } else {
        return `You have to throw out ${trashItem} to the mixed bin`;
      };
    });
};
