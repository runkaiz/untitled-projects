<script>
	export async function load({ session }) {
		if (!session.user) {
			return {
				status: 307,
				redirect: '/'
			};
		}
	}
</script>

<slot />
