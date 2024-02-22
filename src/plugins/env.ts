import env, { FastifyEnvOptions } from '@fastify/env';
import { FastifyRegisterOptions } from 'fastify';
import fp from 'fastify-plugin';
import S from 'fluent-json-schema';

const schema = S.object()
  .required([
    'PORT',
    'POSTGRES_DB',
    'POSTGRES_USER',
    'POSTGRES_PASSWORD',
    'POSTGRES_HOST',
    'POSTGRES_PORT',
    'JWT_SECRET',
  ])
  .prop('PORT', S.number().default(3000))
  .prop('POSTGRES_DB', S.string())
  .prop('POSTGRES_USER', S.string())
  .prop('POSTGRES_PASSWORD', S.string())
  .prop('POSTGRES_HOST', S.string())
  .prop('POSTGRES_PORT', S.number().default(15432))
  .prop('JWT_SECRET', S.string())
  .valueOf();

const options: FastifyRegisterOptions<FastifyEnvOptions> = {
  schema,
  dotenv: true,
};

export default fp(
  async (server) => {
    await server.register(env, options);
  },
  { name: 'env' }
);
