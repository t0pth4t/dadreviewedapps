const { generateFileList } = require('./src/crawler');
const { join } = require('path');
const fs = require('fs');
// const path = 'C:\\dev\\dadreviewedapps\\dadreviewedapps\\content'
const path = './content'
const [blogs] = generateFileList(path).nodes;
console.log(blogs)
module.exports = () => {
	const pages = [
		{
			url: '/',
			seo: {
				cover: '/assets/profile.jpg'
			},
			data: blogs
		},
		{ url: '/contact/' },
		{ url: '/contact/success' }
	];

	// adding blogs list posts page
	pages.push({
		url: '/blogs/',
		data: blogs
	});
	// adding all blog pages
	pages.push(...blogs.edges.map(blog => {
		console.log(blog)
		const data = fs.readFileSync(blog.path, 'utf-8').replace(/---(.*\n)*---/, '');
		return {
			url: `/blog/${blog.id}`,
			seo: blog.details,
			data: {
				details: blog.details,
				content: data
			}
		};
	}));

	return pages;
};
