export async function post() {
	return {
		status: 200,
		headers: {
			'Set-Cookie': 'token=; Path=/; HttpOnly; Max-Age=0'
		},
		body: {
			message: 'Logged out'
		}
	};
}
