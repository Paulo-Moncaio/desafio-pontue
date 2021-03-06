import React, { useState, useEffect, Text } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useHistory } from 'react-router';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import { Card, ListItem, ListItemIcon, ListItemText, Table, TableCell, TableRow } from '@material-ui/core';
import DescriptionIcon from '@material-ui/icons/Description';
import api from '../../services/api'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
    backgroundColor: '#592a96',
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    backgroundColor: "#592A96"
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(10)
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));


export default function Dashboard() {
  const [redacoes, setRedacoes] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const classes = useStyles();
  let history = useHistory();
  const [open, setOpen] = useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const getIdRedacoes = async () => {
    await api.get(`/index/aluno/${localStorage.getItem("aluno_id")}`,
      { headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` } })
      .then((res) => {
        setRedacoes(res.data.data);
      });
  };

  useEffect(async () => {
    getIdRedacoes();
  }, []);


  const handleLogout = () => {
    localStorage.clear();
    history.push('/')
  };

  const dateFormat = (date) => {
    const dateObj = new Date(date);
    let formatted = "";

    formatted = `${("0" + dateObj.getDate()).slice(-2)}/${("0" +
      (dateObj.getMonth() + 1)).slice(-2)}/${dateObj.getFullYear()}`

    return formatted;
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>

        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Reda????es
          </Typography>
          <IconButton color="inherit">
            <ExitToAppIcon onClick={handleLogout} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <CloseIcon style={{ color: "white" }} />
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon>
              <DescriptionIcon style={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Reda????es" style={{ color: "white" }} />
          </ListItem>
        </List>
      </Drawer>
      <div className={classes.appBarSpacer} />
      <main className={classes.content}>
        <Container>
          <Table style={{ maxHeight: '700px' }}>
            {redacoes.map((res) => (
              <TableRow>
                <TableCell>Reda????o N?? {res.numero}</TableCell>
                <TableCell>{dateFormat(res.created_at)}</TableCell>
              </TableRow>
            ))
            }
          </Table>
        </Container>
      </main>
    </div>
  );
}