import fastify from 'fastify'; // eslint-disable-line @typescript-eslint/no-unused-vars

declare module 'fastify' {
  interface FastifyInstance {
    config: {
      PORT: number;
      POSTGRES_DB: string;
      POSTGRES_USER: string;
      POSTGRES_PASSWORD: string;
      POSTGRES_HOST: string;
      POSTGRES_PORT: number;
      JWT_SECRET: string;
    };

    authenticate: (FastifyRequest, FastifyReply) => Promise<void>;
  }
}
