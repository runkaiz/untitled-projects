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
			},
			{
				iconClass: 'ri-image-line',
				label: 'Photos',
				href: '/photos'
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
			}
		]
	},
	{
		name: 'Find',
		items: [
			{
				iconClass: 'ri-sd-card-mini-line',
				label: 'Nico',
				href: '/nico'
			},
			{
				iconClass: 'ri-save-3-line',
				label: 'yao',
				href: '/yao'
			}
		]
	}
];