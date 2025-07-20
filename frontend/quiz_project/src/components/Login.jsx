import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setCredentials } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isAuthenticated } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (isAuthenticated) {

            navigate('/Dashboard');
        }
    }, [isAuthenticated, navigate]);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await axios.post('http://localhost:8000/adminpanel/auth/login/', {
                email: formData.email,
                password: formData.password,
            });

            const { access, refresh } = response.data;
            dispatch(setCredentials({ access, refresh }));
        } catch (err) {
            setError('Invalid credentials');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 2,
                minWidth: '123px'
            }}
        >
            <Paper
                elevation={24}
                sx={{
                    maxWidth: 600,
                    width: '100%',
                    p: 4,
                    borderRadius: 3,
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(10px)'
                }}
            >
                <Box textAlign="center" mb={3}>
                    <Typography variant="h4" component="h1" sx={{
                        fontWeight: 'bold',
                        background: 'linear-gradient(45deg, #2E7D32, #4CAF50)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        mb: 1
                    }}>
                        Login
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        Login to your account using cour credentials
                    </Typography>
                </Box>

                <Box component="form" onSubmit={handleLogin}>
                    <Grid spacing={3}>

                        <Grid item xs={12} sx={{ mb: 2 }}>
                            <TextField
                                label="Email"
                                variant="outlined"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                autoComplete="off"
                                color="success"
                                fullWidth
                                sx={{ marginBottom: "16px" }}
                            />
                        </Grid>

                        <Grid item xs={12} sx={{ mb: 2 }}>
                            <TextField
                                label="Password"
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                autoComplete="current-password"
                                color="success"
                                fullWidth
                                sx={{ marginBottom: "16px" }}
                            />
                        </Grid>

                        <Grid item xs={12} sx={{ mb: 2 }}>
                            <Button
                                variant="contained"
                                color="success"
                                type="submit"
                                fullWidth
                                disabled={loading}
                                sx={{
                                    py: 1.5,
                                    background: 'linear-gradient(45deg, #2E7D32, #4CAF50)',
                                    '&:hover': {
                                        background: 'linear-gradient(45deg, #1B5E20, #2E7D32)',
                                    },
                                    fontSize: '1.1rem',
                                    fontWeight: 'bold',
                                    textTransform: 'none',
                                    borderRadius: 2
                                }}
                            >
                                {loading ? 'Logging in...' : 'Login'}
                            </Button>
                            {error && <p className="text-red-600 mt-2 text-sm">{error}</p>}
                        </Grid>
                    </Grid>
                </Box>
            </Paper >
        </Box >
    );
};

export default Login;
