// This file describes the menu items that are available in the menu bar.
// Use https://remixicon.com for icons.

export const menuItems = [
	{
		name: null,
		items: [
			{
				iconClass: 'ri-home-line',
				label: 'Home',
				href: '/'
			},
			{
				iconClass: 'ri-booklet-line',
				label: 'Notes',
				href: '/notes'
			}
		]
	},
	{
		name: 'Projects',
		items: [
			{
				iconClass: 'ri-bubble-chart-line',
				label: 'Sdartistics',
				href: 'https://github.com/runkaiz/sdartistics'
			},
			{
				iconClass: 'ri-contrast-2-line',
				label: 'Shift C',
				href: 'https://shiftc.app/'
			}
		]
	},
	{
		name: 'Find',
		items: [
			{
				iconClass: 'ri-sd-card-mini-line',
				label: 'nico',
				href: '/nico'
			},
			{
				iconClass: 'ri-save-3-line',
				label: 'yao',
				href: '/yao'
			}
		]
	},
	{
		name: 'Misc',
		items: [
			{
				iconClass: 'ri-chat-private-line',
				label: 'Chat',
				href: 'https://chat.untitled.codes'
			},
			{
				iconClass: 'ri-bar-chart-2-line',
				label: 'Status Report',
				href: 'https://status.untitled.codes'
			},
			{
				iconClass: 'ri-file-list-3-line',
				label: 'Changelog',
				href: '/changelog'
			}
		]
	}
];
