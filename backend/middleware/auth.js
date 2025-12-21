export default function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token || token !== 'your_secret_token') {
        return res.status(403).json({ error: 'Forbidden' });
    }
    next();
}