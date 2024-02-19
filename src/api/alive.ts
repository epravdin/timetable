import { FastifyInstance } from 'fastify';

export const autoPrefix = '/api';

export default async function route(server: FastifyInstance) {
  server.get('/alive', () => ({ status: 'ok', alive: true }));

  server.get('/error', async () => {
    return server.httpErrors.methodNotAllowed();
  });
}
