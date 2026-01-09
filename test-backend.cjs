
const https = require('https');

const data = JSON.stringify({
    name: "Test User",
    email: "elbaraemoueffek@gmail.com",
    topic: "Automation",
    message: "This is a test message from the verification step."
});

const options = {
    hostname: 'vjnucdcdhfpvokehgibz.supabase.co',
    path: '/functions/v1/send-contact-email',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer sb_publishable_uqjpLjJqGmQGoEX2rAVxjw_M2U3gojL',
        'Content-Length': data.length
    }
};

const req = https.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
        console.log(`BODY: ${chunk}`);
    });
    res.on('end', () => {
        console.log('No more data in response.');
    });
});

req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
});

req.write(data);
req.end();
