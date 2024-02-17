import fastify from 'fastify';
import env from './plugins/env';

const main = async () => {
  const server = fastify({ logger: true });

  await server.register(env);

  try {
    await server.listen({ port: 3000 });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

main();
