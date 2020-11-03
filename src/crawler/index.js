const fs = require('fs');
const { join } = require('path');

function getDetails(data) {	
	const matadata = data.match(/---([\S\s]*?)---/)[0];
	const details =  matadata.match(/(.*):(.*)/g).reduce((obj, detail) => {
		const value = detail.substr(detail.indexOf(':') + 2);
		const key = detail.substr(0, detail.indexOf(':'));
		obj[key] = value;
		return obj;
	}, {});
	return details;
}

function getPreview(data) {
	let preview = data.replace(/---([\S\s]*?)---/, '').replace(/\[.*\]\(.*\)/g, '').replace(/\n/,'');
	preview = preview.substr(0, preview.length >= 500 ? 500: preview.length);
	return preview.length < 500? preview : preview.substr(0, 500);
}

function getFolders(source) {console.log(source)
	const isDirectory = source => fs.lstatSync(source).isDirectory();
	const isFile = source => !fs.lstatSync(source).isDirectory();
	const getAllListings = source =>
		fs.readdirSync(source).map(name => join(source, name));
	let allContent = getAllListings(source);
	console.log(allContent)
	const edges = allContent.filter(isFile).map(file => {
		console.log(file)
		const data = fs.readFileSync(file, 'utf-8');
		console.log('DATA: ' + data)
		return {
			id: file.substr(file.lastIndexOf('/') + 1),
			path: file,
			details: getDetails(data),
			preview: getPreview(data)
		};
	});
	const nodes = allContent.filter(isDirectory).map(dir => getFolders(dir));
	const result = {
		id: source.substr(source.lastIndexOf('/') + 1)
	};
	if (nodes.length) {
		result.nodes = nodes;
	}
	if (edges.length) {
		result.edges = edges;
	}
	console.log(result)
	return result;
}

function generateFileList(src) {
	return getFolders(src);
}

module.exports = {
	generateFileList
};
