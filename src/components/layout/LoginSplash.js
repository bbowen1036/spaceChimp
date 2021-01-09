import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import AppIcon from '../../images/ape.png';

import Button from '@material-ui/core/Button';
import MuiLink from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';
import { deepOrange } from '@material-ui/core/colors';

import waldo from '../../images/whereRu.jpg';
import salad from '../../images/salad.jpg';
import type from '../../images/type.jpg';
import ken from '../../images/ken.jpeg';
import cat from '../../images/cat.jpg';
import sun from '../../images/sun.jpeg';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
    
  },
  inline: {
    display: 'inline',
  },
  pageTitle: {
    margin: '10px auto'
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  paper: {
    padding: 20
  },
  invisibleSeparator: {
    border: 'none',
    margin: 4
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    marginRight: 10
  },
}));

export default function LoginSplash() {
  const classes = useStyles();

  return (
    <Fragment>


      <Paper className={classes.paper}>
      <Typography variant='h2' className={classes.pageTitle}>Welcome to Chat Monkey</Typography>
     
        
      </Paper>
      <hr className={classes.invisibleSeparator}/>

    <List className={classes.root}>
      <Typography variant='h1'></Typography>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src={waldo} className={classes.large}/>
        </ListItemAvatar>
        <ListItemText
          primary="Brunch this weekend?"
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                Ali Connors
              </Typography>
              {" — I'll be in your neighborhood doing errands this…"}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Travis Howard" src={salad} className={classes.large}/>
        </ListItemAvatar>
        <ListItemText
          primary="Summer BBQ"
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                to Scott, Alex, Jennifer
              </Typography>
              {" — Wish I could come, but I'm out of town this…"}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Cindy Baker" src={type} className={classes.large}/>
        </ListItemAvatar>
        <ListItemText
          primary="Oui Oui"
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                Michel G.
              </Typography>
              {' — Do you have Paris recommendations? Have you ever…'}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Cindy Baker" src={ken} className={classes.large}/>
        </ListItemAvatar>
        <ListItemText
          primary="Where am I?"
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                John 
              </Typography>
              {' — anyone want to play Scrabble?'}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Cindy Baker" src={cat} className={classes.large}/>
        </ListItemAvatar>
        <ListItemText
          primary="Whiskers"
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                Julie Adams
              </Typography>
              {' — Want to hear a funny joke?'}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Cindy Baker" src={sun} className={classes.large}/>
        </ListItemAvatar>
        <ListItemText
          primary="Drew"
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                
              </Typography>
              {' — Having so much fun, come check...'}
            </React.Fragment>
          }
        />
      </ListItem>
    </List>
    </Fragment>
  );
}