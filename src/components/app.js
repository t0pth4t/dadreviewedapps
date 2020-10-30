import { h, Component } from 'preact';
import { Router } from 'preact-router';
import { Provider } from '@preact/prerender-data-provider';
import Header from './header';
import NotFoundPage from '../routes/notfound';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
// Code-splitting is automated for routes
import Home from '../routes/home';
import Blogs from '../routes/blogs';
import Blog from '../routes/blog';
import Contact from '../routes/contact';
import ContactSuccess from '../routes/contact-success';
import About from '../routes/about';

export default class App extends Component {

	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
		this.currentUrl = e.url;
	};
	 
	render(props) {
		return (
			<Provider value={props}>
				<div id="app">
				<CssBaseline />
      <Container maxWidth="lg">
					<Header title="Dad Reviewed Apps" sections={[
		{title: 'Reviews', url:'/blogs'},
		{title: 'About', url:'/about'}
	  ]} />
					<Router onChange={this.handleRoute}>
						<Home path="/" />
						<Blogs path="/blogs/" />
						<Blog path="/blog/:name" />
						<About path="/about" />
						<Contact path="/contact/" />
						<ContactSuccess path="/contact/success" />
						<NotFoundPage type="404" default />
					</Router>
					</Container>
				</div>
			</Provider>
		);
	}
}
