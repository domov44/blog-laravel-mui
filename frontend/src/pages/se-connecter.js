import React, { useState, useRef, useContext, useEffect } from 'react';
import axios from 'axios';
import Router from 'next/router';
import {
  Container,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Paper,
  IconButton,
  InputAdornment,
  Grid,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CustomButton from '@/components/CustomButton';
import {
  showToast,
  ToastContainer,
  notifySuccess,
  notifyError,
  notifyInfo,
  notifyWarning,
  notifyDefault,
} from '../components/ui/Toastify';

function LoginForm() {

  const [values, setValues] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [globalError, setGlobalError] = useState('');

  const form = useRef(null);

  const handleInput = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    setGlobalError('');
  };

  const handleRememberMeChange = (event) => {
    setRememberMe(event.target.checked);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validateForm(values);
    setErrors(validationErrors);
    const hasErrors = Object.values(validationErrors).some((error) => error !== '');

    if (!hasErrors) {
     
    }
  };

  const validateForm = (formValues) => {
    const errors = {};
    if (!formValues.username) {
      errors.username = 'Ce champ est requis';
    }
    if (!formValues.password) {
      errors.password = 'Ce champ est requis';
    }
    return errors;
  };

  return (
    <Container component="main" maxWidth="xs">
      <Grid container justifyContent="center" alignItems="center" style={{ height: 'calc( 100vh - 69px' }} sx={{ width: '500px'  }}>
        <Paper elevation={3} sx={{ padding: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '10000px'  }}>
          <Typography component="h1" variant="h5">
            Connexion
          </Typography>
          <form ref={form} onSubmit={handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              variant="outlined"
              id="username"
              name='username'
              label="Nom d'utilisateur ou email"
              placeholder="Nom d'utilisateur ou email"
              onChange={handleInput}
              error={Boolean(errors.username)}
              helperText={errors.username}
            />
            <TextField
              fullWidth
              margin="normal"
              variant="outlined"
              id="password"
              name='password'
              label="Mot de passe"
              type={showPassword ? 'text' : 'password'}
              placeholder="Mot de passe"
              onChange={handleInput}
              error={Boolean(errors.password)}
              helperText={errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword} edge="end">
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {globalError && <p>{globalError}</p>}
            <FormControlLabel
              control={
                <Checkbox checked={rememberMe} onChange={handleRememberMeChange} name="rememberMe" color="primary" />
              }
              label="Se souvenir de moi"
            />
            <Button type="submit" fullWidth variant="contained" color="primary" size='large' sx={{ mt: 3, mb: 1 }}>
              Se connecter
            </Button>
            <CustomButton fullWidth variant="text" to="/creer-un-compte" size='large'>
              Créer mon compte
            </CustomButton>
          </form>
        </Paper>
      </Grid>
    </Container>
  );
}

export default LoginForm;
