import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
const useStyles = makeStyles((theme) => ({
  markdown: {
    ...theme.typography.body2,
    padding: theme.spacing(3, 0),
  },
}));

export default function Main(props) {
  const classes = useStyles();
  const { posts, title } = props;

  return (
    <Grid item xs={12} md={8}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Divider />
      <List className={classes.root}>
      {posts.map((post) => (
        <Link href={`/blog/${post.id}`}>
         <ListItem alignItems="flex-start">
         <ListItemText
           primary={post.details.title} 
           secondary={
             <React.Fragment>
               <Typography
                 component="span"
                 variant="body2"
                 className={classes.inline}
                 color="textPrimary"
               >
               </Typography>
               {post.details.subtitle} 
             </React.Fragment>
           }
         />
       </ListItem>
       <Divider variant="inset" component="li" />
        </Link>
      ))}
      </List>
    </Grid>
  );
}

Main.propTypes = {
  posts: PropTypes.array,
  title: PropTypes.string,
};
