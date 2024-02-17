import env from '@fastify/env';
import fp from 'fastify-plugin';

declare module 'fastify' {
  interface FastifyInstance {
    config: {
      PORT: number;
      POSTGRES_DB: string;
      POSTGRES_USER: string;
      POSTGRES_PASSWORD: string;
      POSTGRES_HOST: string;
      POSTGRES_PORT: number;
    };
  }
}

const schema = {
  type: 'object',
  required: [
    'PORT',
    'POSTGRES_DB',
    'POSTGRES_USER',
    'POSTGRES_PASSWORD',
    'POSTGRES_HOST',
    'POSTGRES_PORT',
  ],
  properties: {
    PORT: {
      type: 'number',
      default: 3000,
    },
    POSTGRES_DB: {
      type: 'string',
    },
    POSTGRES_USER: {
      type: 'string',
    },
    POSTGRES_PASSWORD: {
      type: 'string',
    },
    POSTGRES_HOST: {
      type: 'string',
    },
    POSTGRES_PORT: {
      type: 'number',
    },
  },
};

const options = {
  schema,
  dotenv: true,
};

export default fp(async (server) => {
  server.register(env, options);
});
