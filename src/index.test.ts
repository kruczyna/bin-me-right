import { stopServer } from '.';
import { disconnectDatabase } from './database/database';
import { server } from './server';

test("Dummy unit test", async () => {

  const response = await server.inject({
    method: 'GET',
    url: '/item?trashItem=Burrito',

  });
  expect(response.statusCode).toBe(200);
  // disconnectDatabase();
  // stopServer();
});
