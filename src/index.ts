import Fastify from "fastify";
import proxy from '@fastify/http-proxy';
import cors from '@fastify/cors';
import { readFileSync } from "fs";
import "dotenv/config";

(async function boot() {
  const fastify = Fastify({
    logger: true,
    http2: true,
    https: {
      key: readFileSync('./keys/private.pem'),
      cert: readFileSync('./keys/public.pem'),
    },
    requestTimeout: 60_000,
  });

  fastify.register(cors);
  
  const upstream = process.env.API_PROXY_TARGET;
  if (!upstream) throw new Error("API_PROXY_TARGET is not defined");
  
  await fastify.register(proxy, {
    upstream,
    prefix: '/api',
    rewritePrefix: '/api',
    http2: true,
  });

  fastify.listen({
    port: 8888,
  }, (err, address) => {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
    fastify.log.info(`🚀 Secure Proxy + WebSocket server is running on https://localhost:8888`);
  });
})();
