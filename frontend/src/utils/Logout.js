import React, { useContext } from 'react';
import axios from 'axios';
import ListItemButton from '@mui/material/ListItemButton';
import { notifySuccess, notifyError } from '../components/ui/Toastify';
import Router from 'next/router';
import ListItemIcon from '@mui/material/ListItemIcon';
import LogoutIcon from '@mui/icons-material/Logout';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';

const Logout = () => {
    const { handleLogout } = useContext(UserContext);

    const handleLogoutRequest = () => {
        notifySuccess("Déconnexion réussie");
    };

    return (
        <ListItem disablePadding sx={{ color: "var(--error-color)" }}>
        <ListItemButton onClick={handleLogoutRequest}>
            <ListItemIcon sx={{ color: "var(--error-color)" }}>
                <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Se déconnecter" />
        </ListItemButton>
        </ListItem>
    );
};

export default Logout;
