import React from 'react';
import clsx from 'clsx';
import { useHistory, withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setViewerToken } from '../Viewer';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import SettingsIcon from '@material-ui/icons/Settings';
import AddBoxIcon from '@material-ui/icons/AddBox';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Banner from '../common/components/Banner';
import { signOutUser } from '../User/UserReducer';
const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },

  banner: {
    marginRight: theme.spacing(4),
  },

  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    color: 'black',
    flexDirection: 'row',
    justifyContent: 'space-between',
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },

  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(7) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  // menuButton: {
  //   // marginRight: theme.spacing(2),
  // },
  menuButton: {
    marginRight: 0,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar

    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(7),
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  spacer: {
    width: '70px',
  },
  active: {
    color: 'black',
    '& $title': {
      fontWeight: theme.typography.fontWeightMedium,
    },
    '& $icon': {
      color: theme.palette.primary.main,
    },
  },
}));

const PersistentDrawerLeft = props => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const { token } = useSelector(state => state.viewer);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSignOut = () => {
    localStorage.clear();
    dispatch(setViewerToken(null));
    dispatch(signOutUser());
    history.push('/');
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleMenu = () => {};

  const menuItems = [
    {
      text: 'Dashboard',
      icon: <HomeIcon />,
      onClick: () => history.push('/dashboard'),
    },
    {
      text: 'Create Workout',
      icon: <AddBoxIcon />,
      onClick: () => history.push('/create'),
    },
    {
      text: 'Log Workout',
      icon: <FitnessCenterIcon />,
      onClick: () => history.push('/log'),
    },
    // {
    //   text: "Progress",
    //   icon: <TrendingUpIcon />,
    //   onClick: () => history.push("/progress"),
    // },
  ];
  const accountItems = [
    {
      text: 'Account Details',
      icon: <SettingsIcon />,
      onClick: () => history.push('/account'),
    },
    {
      text: 'Sign Out',
      icon: <ExitToAppIcon />,
      onClick: handleSignOut,
    },
  ];
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
        <Banner className={classes.banner} />
        <div className={classes.spacer}></div>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {menuItems.map(item => {
            const { text, icon, onClick } = item;
            return (
              <ListItem
                button
                key={text}
                onClick={onClick}
                activeClassName={classes.active}
              >
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            );
          })}
        </List>
        <Divider />
        <List>
          {accountItems.map(item => {
            const { text, icon, onClick } = item;
            return (
              <ListItem button key={text} onClick={onClick}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            );
          })}
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        {props.children}
      </main>
    </div>
  );
};

export default withRouter(PersistentDrawerLeft);
