import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import MainFeaturedPost from '../../components/featured';
import FeaturedPost from '../../components/featuredPost';
import Main from '../../components/main';
import Sidebar from '../../components/sidebar';
import Footer from '../../components/footer';
import { usePrerenderData } from '@preact/prerender-data-provider';
const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}));


const posts=[]

const sidebar = {
  title: 'About',
  description:
    'Curated lists of curated apps, games, and shows that are educational, fun and rewarding for children.',
  social: [
    { name: 'Twitter', icon: TwitterIcon },
    { name: 'Facebook', icon: FacebookIcon },
  ],
};

export default function Blog() {
  const classes = useStyles();
  const [data, isLoading] = usePrerenderData({path: "/", url: "/",matches:{}});
  const {data: {edges:blogs}} = !isLoading && data || {data: {edges:[]}};
  const mainFeaturedPost = blogs[0];
  return (
    <React.Fragment>
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          <Grid container spacing={4}>
  
               {blogs.slice(1).map((post) => (
              <FeaturedPost key={post.details.title} post={post} />
            ))} 
          </Grid>
          <Grid container spacing={5} className={classes.mainGrid}>
            <Main title="From the firehose" posts={blogs} />
            <Sidebar
              title={sidebar.title}
              description={sidebar.description}
              archives={sidebar.archives}
              social={sidebar.social}
            />
          </Grid>
        </main>
      
      <Footer title="" description="Dad reviewed apps" />
    </React.Fragment>
  );
}
