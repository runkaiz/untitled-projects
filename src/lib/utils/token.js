import jwt from 'jsonwebtoken';

export function generateToken(user) {
	const payload = {
		userId: user.id,
		name: user.name,
		isAdmin: user.role === 'ADMIN',
		iat: Date.now()
	};

	// No expiry date for now.
	return jwt.sign(payload, 'process.env.JWT_SECRET');
}

export function verifyToken(token) {
	try {
		// Return the payload if the token is valid.
		return jwt.verify(token, 'process.env.JWT_SECRET');
	} catch (error) {
		return false;
	}
}
