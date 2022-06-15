<!-- src/Markdown.svelte -->
<script>
	import MarkdownIt from 'markdown-it';
	import 'highlight.js/styles/github-dark.css'

	// NEW: Import `highlight.js`
	import hljs from 'highlight.js';

	export let markdown = '';

	// Initialize `markdown-it`
	// NEW: Configure highlight via constructor params!
	const md = new MarkdownIt({
		highlight: function (str, lang) {
			if (lang && hljs.getLanguage(lang)) {
				try {
					return hljs.highlight(str, { language: lang }).value;
				} catch (e) {
					// eslint-disable-next-line no-console
					console.error('Failed to highlight string');
				}
			}
			return ''; // use external default escaping
		}
	});

	// Render to an html string
	const rendered = md.render(markdown);
</script>

<!-- Render with the `@html` directive -->
<div>
	{@html rendered}
</div>
