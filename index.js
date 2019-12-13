const http = require('http');
const url = require('url');
let [uri, delay, method] = process.argv.slice(2);
const fail = err => {
	console.error('err', err.message);
	process.exit(1);
};

if (!uri) {
	fail(new Error('uri is required'));
}

if (!delay) {
	delay = 10000;
}

const parsedURI = url.parse(uri);

const agent = new http.Agent({
	keepAlive: true,
	keepAliveMsecs: 30000 // 30s
});

const makeRequest = cb => {
	const req = {
		hostname: parsedURI.hostname,
	  port: parsedURI.port,
	  path: parsedURI.path,
	  method: method || 'GET',
		agent: agent
	};

	http.request(req, res => {
		console.log('response header connection:', res.headers.connection);

		let data = '';
		res
			.on('error', fail)
			.on('data', chunk => {
				data += chunk;
			})
			.on('end', () => {
				cb(data);
			});
	}).on('error', fail)
	.end();
};

console.log('request 1 start');
makeRequest(data => {
	console.log('request 1 done. response:', data);
	console.log(`time to kill the server.. you have ${ delay }ms until next request`);
	setTimeout(() => {
		console.log('request 2 start');
		makeRequest(data => {
			console.log('request 2 done. response:', data);
		});
	}, delay);
});
