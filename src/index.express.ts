import e from "express";
import { readFileSync } from "fs";
import { createProxyMiddleware } from "http-proxy-middleware";
import cors from "cors";
import https from "https";

import "dotenv/config";

/**
 * 이 서버는 http2 프록시 서버로, HTTPS를 통해 클라이언트와 통신합니다.
 */

const apiProxy = createProxyMiddleware({
  target: process.env.API_PROXY_TARGET,
  changeOrigin: true,
  ws: false,
  secure: false,
  pathRewrite: {
    "^/api": "",
  },
});

const app = e();
app.use(cors());

// API proxy 연결
app.use('/api', apiProxy);

// HTTPS 서버 생성
const server = https.createServer({
  key: readFileSync('./keys/private.pem'),
  cert: readFileSync('./keys/public.pem'),
}, app);

server.listen(8888, () => {
  console.log("🚀 Secure Proxy + WebSocket server is running on https://localhost:8888");
});
