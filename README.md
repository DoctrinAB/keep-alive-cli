# keep-alive-cli
A cli for testing http keep-alive connections during graceful exits. The client makes two requests to the passed url. The first request establishes a keep-alive connection. You're supposed to kill the server manually between requests.

# usage
```bash
$ node index.js <url> [delay method]
```
flags
- url - The url to call. Required
- delay - The time between requests. Optional. Defaults to 10s
- method - The request method. Optional. Defaults to GET

# todos
- [x] parse cli args
- [x] dump connection header

# license
MIT
