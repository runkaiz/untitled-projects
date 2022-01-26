import jwt from 'jsonwebtoken';

export function generateToken(user) {
	const payload = {
		userId: user.id,
		isAdmin: user.role === 'ADMIN',
		iat: Date.now()
	};

	// No expiry date for now.
	return jwt.sign(payload, 'process.env.JWT_SECRET');
}
