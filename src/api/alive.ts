import { FastifyInstance } from "fastify";

export default async function route(server: FastifyInstance) {
  server.get('/alive', () => ({ alive: true }));
}