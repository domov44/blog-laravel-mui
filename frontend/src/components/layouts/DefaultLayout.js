import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import CreateIcon from '@mui/icons-material/Create';
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import Router from 'next/router';
import CustomButton from '../CustomButton';
import {
  showToast,
  ToastContainer,
  notifySuccess,
  notifyError,
  notifyInfo,
  notifyWarning,
  notifyDefault,
} from '../../components/ui/Toastify';

const drawerWidth = 300;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    marginTop: '64px',
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const handleProfileClick = () => {

};

const handleLogout = async () => {
  try {
    const response = await fetch('http://localhost:8000/api/logout', {
      method: 'POST'
    });
    if (response.ok) {
      notifySuccess("Déconnexion réussie");
      Router.push('/');
    } else {
      notifyError("Erreur lors de la déconnexion");
      console.error('Logout failed:', response);
    }
  } catch (error) {
    notifyError("Erreur lors de la déconnexion");
    console.error('Logout error:', error);
  }
};

export default function DefaultLayout({ children }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Container maxWidth="lg">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: 'none' }) }}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ flexGrow: 1 }} />
            <CustomButton variant="contained" color="primary" to="/se-connecter">
              Se connecter
            </CustomButton>
            <Tooltip title="Votre profil">
              <IconButton onClick={handleProfileClick} sx={{ p: 0 }}>
                <Avatar />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </Container>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List sx={{ padding: '10px' }}>
          <ListItem disablePadding>
            <ListItemButton href="/">
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Accueil" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton href="/mes-articles">
              <ListItemIcon>
                <CreateIcon />
              </ListItemIcon>
              <ListItemText primary="Mes articles" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton href="/profil">
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Mon profil" />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <List sx={{ padding: '10px' }}>
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Déconnexion" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Main open={open}>
        {children}
      </Main>
    </Box>
  );
}

