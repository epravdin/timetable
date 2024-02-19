import fastify from 'fastify';
import env from './plugins/env';
import aliveRoutes from './api/alive';

const main = async () => {
  const server = fastify({ logger: true });

  await server.register(env);

  await server.register(aliveRoutes, { prefix: '/api' });

  try {
    await server.listen({ port: 3000 });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

main();
