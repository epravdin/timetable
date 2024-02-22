import { join } from 'path';
import fastify from 'fastify';
import sensible from '@fastify/sensible';
import cors from '@fastify/cors';
import autoload from '@fastify/autoload';
import helmet from '@fastify/helmet';
import { DbConnection } from './db/db';

const main = async () => {
  const server = fastify({ logger: true });

  await server.register(sensible);
  await server.register(cors);
  await server.register(helmet);
  await server.register(autoload, {
    dir: join(__dirname, 'plugins'),
  });

  await server.register(autoload, {
    dir: join(__dirname, 'api'),
    dirNameRoutePrefix: false,
  });

  try {
    DbConnection.init({
      db: server.config.POSTGRES_DB,
      host: server.config.POSTGRES_HOST,
      port: server.config.POSTGRES_PORT,
      user: server.config.POSTGRES_USER,
      password: server.config.POSTGRES_PASSWORD,
    });

    await DbConnection.testConnection();
    await server.listen({ port: server.config.PORT });
  } catch (err) {
    server.log.error(err);
    DbConnection.close();
    process.exit(1);
  }
};

main();
