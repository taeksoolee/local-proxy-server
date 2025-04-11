# local-proxy-server
> simple proxy server

## getting started

### create env

```sh
echo API_PROXY_TARGET=https://example.com/api >> .env
```

### generate key

```sh
openssl genrsa 1024 > keys/private.pem
openssl req -x509 -new -key keys/private.pem > keys/public.pem
```

### install and start

```sh
npm install

npm start
```
