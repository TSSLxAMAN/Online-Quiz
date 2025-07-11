import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setCredentials } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

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
        <div className='flex justify-center items-center h-123'>
            <div>
                <p className='text-3xl mb-2 text-green-800 font-bold'>Admin Login</p>
                <div className='shadow-2xl p-8 rounded-2xl border-2 border-green-700 w-[320px]'>
                    <form onSubmit={handleLogin}>
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
                        <Button
                            variant="contained"
                            color="success"
                            type="submit"
                            fullWidth
                            disabled={loading}
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </Button>
                        {error && <p className="text-red-600 mt-2">{error}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
