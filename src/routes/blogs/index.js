import { h } from 'preact';
import { Link } from 'preact-router';
import { usePrerenderData } from '@preact/prerender-data-provider';
import style from './style';

const blogs = (props) => {
	console.log(props)
	const [data, isLoading] = usePrerenderData(props);
	return (
		<div class={style.pageBlogs}>
			<h1 class={style.pageTitle}>Reviews</h1>
			{ getBlogsListing(data, isLoading) }
		</div>
	);
};

function getBlogsListing(data, isLoading) {
	if (isLoading) {
		return (
			<article class={style.loadingPlaceholder}>
				<h2 class={`${style.blogtitle} loading`}>&nbsp;</h2>
				<div class={`${style.loadingBody} loading`}>&nbsp;</div>
				<div class={`${style.loadingBody} loading`}>&nbsp;</div>
				<div class={`${style.loadingBody} loading`}>&nbsp;</div>
			</article>
		);
	}
	if (data && data.data) {
		const { data: blogs } = data;
		return (
			<>
				{blogs.edges.map(blog => (
				<Link href={`/blog/${blog.id}`}>
					<article>
						<h2>{blog.details.title}</h2>
						<div>
							{
								(blog.details.tags.split(',') || []).map(tag => <span class={style.tag}>{tag}</span>)
							}
						</div>
						<p class={style.preview}>
							{blog.preview}
						</p>
					</article>
				</Link>
			))}
			</>
		);
	}
}

export default blogs;
