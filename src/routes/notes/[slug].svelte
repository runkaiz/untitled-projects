<script context="module">
	export async function load({ params, fetch }) {
		const url = `/notes/${params.slug}.json`;
		const res = await fetch(url);

		if (res.ok) {
			return {
				props: {
					note: await res.json()
				}
			};
		}

		return {
			status: res.status,
			error: new Error(`Failed to load ${url}`)
		};
	}
</script>

<script>
	export let note;
</script>

{JSON.stringify(note)}
