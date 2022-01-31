import { stopServer } from '..';
import { disconnectDatabase } from '../database/database';
import { server } from '../server';

afterAll(() => {
  disconnectDatabase();
  stopServer();
});

describe('GET route', () => {
  it('Will retrieve an item', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/item?trashItem=Burrito',
    });
    expect(response.statusCode).toBe(200);
  });

  it('Will throw error when item is not found', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/item?trashItem=qwerty',
    });
    expect(response.statusCode).toBe(404);
    expect(response.body).toStrictEqual('The item qwerty does not exist in the DB');
  });
});

describe('POST route', () => {
  it('Will post an item', async () => {
    const response = await server.inject({
      method: 'POST',
      url: '/item',
      payload: {
        name: "Yerba",
        binAssignment: "1",
        isBreakable: true
      },
    });
    expect(response.statusCode).toBe(200);
  });

  describe('DELETE route', () => {
    it('Will delete an item', async () => {
      const response = await server.inject({
        method: 'DELETE',
        url: '/item?trashItem=Apple',
      });
      expect(response.statusCode).toBe(200);
    });
  });
});
