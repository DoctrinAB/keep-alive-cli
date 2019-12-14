# keep-alive-cli
A cli for testing http keep-alive connections during graceful exits. The client makes two requests to the passed url. The first request attempts to establish a keep-alive connection. You're supposed to kill the server manually between requests.

# usage
```bash
$ node index.js <url> [delay method]
```
flags
- url - The url to call. Required
- delay - The time between requests. Optional. Defaults to 10s
- method - The request method. Optional. Defaults to GET

env_vars
- HEADERS=1 to dump all request and response headers

# todos
- [x] parse cli args
- [x] dump connection header
- [x] opt to dump all headers

# license
MIT
