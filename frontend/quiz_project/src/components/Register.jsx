import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { Visibility, VisibilityOff, Email, Person, Phone, School, DateRange, FilePresent } from '@mui/icons-material';
import axios from 'axios'
const Register = () => {
    const [formData, setFormData] = useState({
        email: '',
        password1: '',
        password2: '',
        full_name: '',
        course: '',
        branch: '',
        year: '',
        semester: '',
        college: '',
        mobile_number: ''
    });
    console.log(formData)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const courses = [
        { value: 'B.Tech', label: 'B.Tech (Bachelor of Technology)', years: 4, semesters: 8 },
        { value: 'M.Tech', label: 'M.Tech (Master of Technology)', years: 2, semesters: 4 },
        { value: 'BCA', label: 'BCA (Bachelor of Computer Applications)', years: 3, semesters: 6 },
        { value: 'MCA', label: 'MCA (Master of Computer Applications)', years: 2, semesters: 4 },
        { value: 'Polytecnic', label: 'Polytechnic Diploma', years: 3, semesters: 6 },
        { value: 'Diploma', label: 'Diploma Engineering', years: 3, semesters: 6 },
    ];

    const branches = [
        { value: 'CSE', label: 'Computer Science & Engineering' },
        { value: 'IT', label: 'Information Technology' },
        { value: 'ECE', label: 'Electronics & Communication Engineering' },
        { value: 'EEE', label: 'Electrical & Electronics Engineering' },
        { value: 'MECH', label: 'Mechanical Engineering' },
        { value: 'CIVIL', label: 'Civil Engineering' },
        { value: 'AUTOMOBILE', label: 'Automobile Engineering' },
        { value: 'AEROSPACE', label: 'Aerospace Engineering' },
        { value: 'CHEMICAL', label: 'Chemical Engineering' },
        { value: 'BIOTECHNOLOGY', label: 'Biotechnology' },
        { value: 'OTHERS', label: 'Others' }
    ];

    // Get available years based on selected course
    const getAvailableYears = () => {
        const selectedCourse = courses.find(course => course.value === formData.course);
        if (!selectedCourse) return [];

        const years = [];
        for (let i = 1; i <= selectedCourse.years; i++) {
            years.push({ value: i.toString(), label: `${i}${i === 1 ? 'st' : i === 2 ? 'nd' : i === 3 ? 'rd' : 'th'} Year` });
        }
        return years;
    };

    // Get available semesters based on selected course and year
    const getAvailableSemesters = () => {
        const selectedCourse = courses.find(course => course.value === formData.course);
        if (!selectedCourse || !formData.year) return [];

        const currentYear = parseInt(formData.year);
        const semestersPerYear = 2;
        const maxSemester = Math.min(currentYear * semestersPerYear, selectedCourse.semesters);
        const minSemester = (currentYear - 1) * semestersPerYear + 1;

        const semesters = [];
        for (let i = minSemester; i <= maxSemester; i++) {
            semesters.push({
                value: i.toString(),
                label: `${i}${i === 1 ? 'st' : i === 2 ? 'nd' : i === 3 ? 'rd' : 'th'} Semester`
            });
        }
        return semesters;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Reset dependent fields when course changes
        if (name === 'course') {
            setFormData(prev => ({
                ...prev,
                [name]: value,
                year: '',
                semester: ''
            }));
        } else if (name === 'year') {
            setFormData(prev => ({
                ...prev,
                [name]: value,
                semester: ''
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }

        // Clear error when user starts typing
        if (error) setError('');
    };

    const validateForm = () => {
        if (!formData.email || !formData.password1 || !formData.full_name || !formData.mobile_number) {
            setError('Please fill in all required fields');
            return false;
        }

        if (formData.password1 !== formData.password2) {
            setError('Passwords do not match');
            return false;
        }

        if (formData.password1.length < 8) {
            setError('Password must be at least 8 characters long');
            return false;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setError('Please enter a valid email address');
            return false;
        }

        // Mobile number validation (10 digits)
        const mobileRegex = /^\d{10}$/;
        if (!mobileRegex.test(formData.mobile_number)) {
            setError('Please enter a valid 10-digit mobile number');
            return false;
        }

        return true;
    };

    const showSuccessToast = () => {
        alert('Registration successful! Your registration will be approved by admin soon.');
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);
        setError('');

        try {
            // Replace with your actual registration API call
            const response = await axios.post('http://localhost:8000/adminpanel/auth/registration/', {
                email: formData.email,
                password1: formData.password1,
                password2: formData.password2,
                full_name: formData.full_name,
                course: formData.course,
                branch: formData.branch,
                year: formData.year,
                semester: formData.semester,
                college: formData.college,
                mobile_number: formData.mobile_number,
            });
            console.log(response)
            if (response.status==201) {
                alert("Check you mail and confirm your mail")
                setFormData({
                    email: '',
                    password1: '',
                    password2: '',
                    full_name: '',
                    course: '',
                    branch: '',
                    year: '',
                    semester: '',
                    college: '',
                    mobile_number: ''
                });
            } else {
                const errorData = response.data;
                setError(errorData.message || 'Registration failed. Please try again.');
            }
        } catch (err) {
            setError('Network error. Please try again.');
            console.error('Registration error:', err);
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
                padding: 2
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
                        Student Registration
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        Create your account to access online quizzes
                    </Typography>
                </Box>

                <Box component="form" onSubmit={handleRegister}>
                    <Grid spacing={3}>
                        {/* Personal Information */}
                        <Grid item xs={12}>
                            <Typography variant="h6" sx={{ color: '#2E7D32', fontWeight: 'medium', mb: 2 }}>
                                Personal Information
                            </Typography>
                        </Grid>

                        <Grid item xs={12} sx={{ mb: 2 }}>
                            <TextField
                                label="Full Name"
                                name="full_name"
                                value={formData.full_name}
                                onChange={handleChange}
                                fullWidth
                                required
                                variant="outlined"
                                color="success"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Person color="success" />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} sx={{ mb: 2 }}>
                            <TextField
                                label="Email Address"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                fullWidth
                                required
                                variant="outlined"
                                color="success"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Email color="success" />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} sx={{ mb: 2 }}>
                            <TextField
                                label="Mobile Number"
                                name="mobile_number"
                                value={formData.mobile_number}
                                onChange={handleChange}
                                fullWidth
                                required
                                variant="outlined"
                                color="success"
                                placeholder="Enter 10-digit mobile number"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Phone color="success" />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>

                        {/* Educational Information */}
                        <Grid item xs={12} sx={{ mb: 2 }}>
                            <Typography variant="h6" sx={{ color: '#2E7D32', fontWeight: 'medium', mb: 2, mt: 2 }}>
                                Educational Information
                            </Typography>
                        </Grid>

                        <Grid item xs={12} sx={{ mb: 2 }}>
                            <TextField
                                label="College/University"
                                name="college"
                                value={formData.college}
                                onChange={handleChange}
                                fullWidth
                                variant="outlined"
                                color="success"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <School color="success" />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} sx={{ mb: 2 }} sm={6}>
                            <FormControl fullWidth color="success">
                                <InputLabel>Course</InputLabel>
                                <Select
                                    name="course"
                                    value={formData.course}
                                    onChange={handleChange}
                                    label="Course"
                                >
                                    {courses.map((course) => (
                                        <MenuItem key={course.value} value={course.value}>
                                            {course.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sx={{ mb: 2 }} sm={6}>
                            <FormControl fullWidth color="success">
                                <InputLabel>Branch</InputLabel>
                                <Select
                                    name="branch"
                                    value={formData.branch}
                                    onChange={handleChange}
                                    label="Branch"
                                >
                                    {branches.map((branch) => (
                                        <MenuItem key={branch.value} value={branch.value}>
                                            {branch.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sx={{ mb: 2 }} sm={6}>
                            <FormControl fullWidth color="success">
                                <InputLabel>Year</InputLabel>
                                <Select
                                    name="year"
                                    value={formData.year}
                                    onChange={handleChange}
                                    label="Year"
                                    disabled={!formData.course}
                                >
                                    {getAvailableYears().map((year) => (
                                        <MenuItem key={year.value} value={year.value}>
                                            {year.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sx={{ mb: 2 }} sm={6}>
                            <FormControl fullWidth color="success">
                                <InputLabel>Semester</InputLabel>
                                <Select
                                    name="semester"
                                    value={formData.semester}
                                    onChange={handleChange}
                                    label="Semester"
                                    disabled={!formData.course || !formData.year}
                                >
                                    {getAvailableSemesters().map((semester) => (
                                        <MenuItem key={semester.value} value={semester.value}>
                                            {semester.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Security Information */}
                        <Grid item xs={12} sx={{ mb: 2 }}>
                            <Typography variant="h6" sx={{ color: '#2E7D32', fontWeight: 'medium', mb: 2, mt: 2 }}>
                                Security Information
                            </Typography>
                        </Grid>

                        <Grid item xs={12} sx={{ mb: 2 }} sm={6}>
                            <TextField
                                label="Password"
                                name="password1"
                                type={showPassword ? 'text' : 'password'}
                                value={formData.password1}
                                onChange={handleChange}
                                fullWidth
                                required
                                variant="outlined"
                                color="success"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowPassword(!showPassword)}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} sx={{ mb: 2 }} sm={6}>
                            <TextField
                                label="Confirm Password"
                                name="password2"
                                type={showConfirmPassword ? 'text' : 'password'}
                                value={formData.password2}
                                onChange={handleChange}
                                fullWidth
                                required
                                variant="outlined"
                                color="success"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                edge="end"
                                            >
                                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>

                        {error && (
                            <Grid item xs={12} sx={{ mb: 2 }}>
                                <Typography color="error" variant="body2" textAlign="center">
                                    {error}
                                </Typography>
                            </Grid>
                        )}

                        <Grid item xs={12} sx={{ mb: 2 }}>
                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                disabled={loading}
                                sx={{
                                    mt: 2,
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
                                {loading ? 'Registering...' : 'Register'}
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Paper >
        </Box >
    );
};

export default Register;