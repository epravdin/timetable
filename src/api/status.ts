import { readFileSync } from 'fs';
import S from 'fluent-json-schema';
import { FastifyInstance } from 'fastify';
import { join } from 'path';

const { version } = JSON.parse(
  readFileSync(join(__dirname, '..', '../package.json'), { encoding: 'utf-8' })
);

export const autoPrefix = '/api';

export default async function status(server: FastifyInstance) {
  server.route({
    method: 'GET',
    url: '/status',
    handler: onStatus,
    onRequest: [server.authenticate],
    schema: {
      response: {
        200: S.object().prop('status', S.string()).prop('version', S.string()),
      },
    },
  });

  async function onStatus() {
    return { status: 'ok', version };
  }
}
