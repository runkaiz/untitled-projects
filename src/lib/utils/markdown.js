import MarkdownIt from 'markdown-it';
import markdownItImageLazyLoading from 'markdown-it-image-lazy-loading';
import { html5Media } from 'markdown-it-html5-media';
import 'highlight.js/styles/github-dark.css';

import hljs from 'highlight.js';
let md = new MarkdownIt({
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
md.use(markdownItImageLazyLoading, {
	decoding: true,
});
md.use(footnote_plugin);
md.use(html5Media);

export default md;
