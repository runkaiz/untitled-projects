import MarkdownIt from 'markdown-it';
import 'highlight.js/styles/github-dark.css';

import hljs from 'highlight.js';
let md = new MarkdownIt({
	highlight: function (str, lang) {
		if (lang && hljs.getLanguage(lang)) {
			try {
				return (
					'<pre class="hljs whitespace-pre-wrap"><code>' +
					hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
					'</code></pre>'
				);
			} catch (__) {}
		}
		return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
	}
});

export default md;
