import fastify from 'fastify';

const main = async () => {
  const server = fastify({
    logger: true
  });

  server.get('/', (req, rep) => {
    return {
      alive: true
    };
  });

  try {
    await server.listen({ port: 3000 })
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

main();