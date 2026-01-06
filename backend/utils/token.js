const crypto = require('crypto');

const secretKey = crypto.randomBytes(64).toString('hex');

exports.signToken = function signToken(payload) {
    const data = JSON.stringify(payload);
    const sig = crypto.createHmac('sha256', secretKey).update(data).digest('hex');

    return Buffer.from(data).toString('base64') + '.' + sig;
}

exports.verifyToken = function verifyToken(token) {
    const [dataB64, sig] = token.split('.');
    const data = Buffer.from(dataB64, 'base64').toString();

    const expectedSig = crypto.createHmac('sha256', secretKey).update(data).digest('hex');

    if(expectedSig !== sig) {
        console.error('Invalid token signature');
        return null;
    }

    const payload = JSON.parse(data);
    
    if(Date.now() > payload.exp) {
        console.error('Token has expired');
        return null;
    }

    return payload;
}