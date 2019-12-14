const http = require('http');
const url = require('url');
let [uri, delay, method] = process.argv.slice(2);
const fail = err => {
	console.error('err', err.message);
	process.exit(1);
};
const dumpHeaders = (req, res) => {
	const stringify = obj => JSON.stringify(obj.headers, 2, null);
	if (process.env.HEADERS == 1) {
		console.log('request headers:', stringify(req));
		console.log('response headers:', stringify(res));
	} else {
		console.log('response header connection:', res.headers.connection);
	}
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

const call = n => new Promise((resolve, reject) => {
	const req = {
		hostname: parsedURI.hostname,
	  port: parsedURI.port,
	  path: parsedURI.path,
	  method: method || 'GET',
		agent: agent
	};

	const cb = res => {
		dumpHeaders(req, res);
		let data = '';
		res
			.on('error', reject)
			.on('data', chunk => data += chunk)
			.on('end', () => {
				console.log(`request ${ n } done. response: ${ data }`);
				resolve();
			});
	};

	console.log(`request ${ n } start`);

	http.request(req, cb)
		.on('error', reject)
		.end();
});

call(1)
	.then(() => {
		console.log(`time to kill the server.. you have ${ delay }ms until next request`);
		return setTimeout(() => call(2), delay);
	})
	.catch(fail);
