import { h } from "preact";
import { useEffect } from 'preact/hooks';
import style from "./style";

const Home = () => {
	/*
	 * Netlify CMS's accept invite link land on home page.
	 * This redirection takes it to the right place(/admin).
	 */

	useEffect(() => {
		if (window !== undefined && window.location.href.includes('#invite_token')) {
			const { href } = window.location;
			window.location.href= `${href.substring(0, href.indexOf('#'))}admin${href.substring(href.indexOf('#'))}`;
		}
	},[]);

	return (
		<div class={style.home}>
			<div class={style.about}>
				<div class={style.imageContainer}>
					<div class={style.image} />
				</div>
				<div class={style.quote}>
					<div class={style.details}>
						Why can't I find a good list of educational apps for my toddler that aren't loaded with ads?!
					</div>
					<div class={style.author}>- Frustrated Parents</div>
				</div>
			</div>
			<div class={style.bio}>
				<p class={style.bioleft}>
				I am just your average everyday father of two who wants to set my children up for success. 
				While I try to minimize screen time as much as possible, my kids getting access to television and other digital media is unavoidable.
				I wanted to make sure the time my kids spent in front of the screen was as educational as possible so I started looking for resources on what the best content is out there for kids.
				All I could find were lists that were at best outdated but often times sponsered by the app creators. 
				</p>
				<p class={style.bioright}>
					My intention with this site is to maintain lists of curated apps, games, and shows that are educational, fun and rewarding for children.
					While I am no expert I am selfishly interested in provided the best for my kids so I figured why not share what I find for other parents.
				</p>
			</div>
		</div>
	);
};

export default Home;
