<script>
	export let link;
	export let newWindow = false;
</script>

<a class="hyperlink" href={link} target={ newWindow ? "_blank" : "" }><slot /></a>
