import fp from 'fastify-plugin';
import jwt from '@fastify/jwt';
import { FastifyReply, FastifyRequest } from 'fastify';

export default fp(
  async (server) => {
    await server.register(jwt, {
      secret: server.config.JWT_SECRET,
    });

    server.decorate(
      'authenticate',
      async function (
        request: FastifyRequest,
        reply: FastifyReply
      ): Promise<void> {
        try {
          await request.jwtVerify();
        } catch (err) {
          reply.send(err);
        }
      }
    );
  },
  {
    name: 'auth',
    dependencies: ['env'],
  }
);
