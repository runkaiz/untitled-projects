export async function get() {
	return {
		status: 200,
		headers: {
			'Set-Cookie': 'token=; Max-Age=0'
		},
		body: {
			message: 'Logged out'
		}
	};
}
