import { useState } from 'react';
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
import {
    showToast,
    ToastContainer,
    notifySuccess,
    notifyError,
    notifyInfo,
    notifyWarning,
    notifyDefault,
} from '../components/ui/Toastify';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CustomButton from '@/components/CustomButton';

export default function Register() {
    const [globalError, setGlobalError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      });

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleInput = (event) => {
        const { name, value } = event.target;
        setValues((prev) => ({ ...prev, [name]: value }));
        setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
        setGlobalError('');
    };

    const validateForm = (formValues) => {
        const errors = {};
        if (!formValues.name) {
            errors.name = 'Ce champ est requis';
        }
        if (!formValues.email) {
            errors.email = 'Ce champ est requis';
        }
        if (!formValues.password) {
            errors.password = 'Ce champ est requis';
        }
        if (!formValues.confirmPassword) {
            errors.confirmPassword = 'Ce champ est requis';
        }
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm(values);
        setErrors(validationErrors);
        const hasErrors = Object.values(validationErrors).some((error) => error !== '');

        if (!hasErrors) {
            try {
                const response = await fetch('http://localhost:8000/api/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name, email, password }),
                });
                const data = await response.json();
                console.log(data);
                notifySuccess("Bienvenue");
            } catch (error) {
                console.error('Error:', error);
                notifyError("Problème...");
            }
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Grid container justifyContent="center" alignItems="center" style={{ height: 'calc( 100vh - 69px' }} sx={{ width: '500px' }}>
                <Paper elevation={3} sx={{ padding: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '10000px' }}>
                    <Typography component="h1" variant="h5">
                        Inscription
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Name"
                            variant="outlined"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            fullWidth
                            margin="normal"
                            error={Boolean(errors.name)}
                            helperText={errors.name}
                        />
                        <TextField
                            label="Email"
                            variant="outlined"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            fullWidth
                            margin="normal"
                            autoComplete='off'
                            error={Boolean(errors.email)}
                            helperText={errors.email}
                        />
                        <TextField
                            label="Password"
                            variant="outlined"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            fullWidth
                            margin="normal"
                            autoComplete='new-password'
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
                        <TextField
                            label="Confirm password"
                            variant="outlined"
                            type={showPassword ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            fullWidth
                            margin="normal"
                            autoComplete='new-password'
                            error={Boolean(errors.confirmPassword)}
                            helperText={errors.confirmPassword}
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
                        {globalError && <Typography variant='body1' color="error">{globalError}</Typography>}
                        <Button type="submit" fullWidth variant="contained" color="primary" size="large" sx={{ mt: 3, mb: 1 }}>
                            Valider l&apos;inscription
                        </Button>
                        <CustomButton fullWidth variant="text" to="/se-connecter" size='large'>
                            J&apos;ai déjà un compte
                        </CustomButton>
                    </form>
                </Paper>
            </Grid>
        </Container>
    );
}
