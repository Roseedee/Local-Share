module.exports = function uploadProgress(req, res, next) {
  if (req.path === '/upload' && req.method === 'POST') {
    const totalBytes = Number(req.headers['content-length'] || 0);
    let uploaded = 0;

    req.on('data', chunk => {
      uploaded += chunk.length;
      if (totalBytes) {
        process.stdout.write(
          `\r📦 Uploading... ${((uploaded / totalBytes) * 100).toFixed(2)}%`
        );
      }
    });

    req.on('end', () => {
      console.log('\n✅ Upload complete');
    });
  }
  next();
};
