import MarkdownIt from 'markdown-it';
import 'highlight.js/styles/github-dark.css'

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

export default md;
