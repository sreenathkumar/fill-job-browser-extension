import API from '@/config/api';
import { Box, Button, Grid, Link, Paper, TextField, ThemeProvider, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';



export default function Forgot() {
    const navigate = useNavigate();
    const [sendMailMessage, setSendMailMessage] = useState('')
    const handleResetPassword = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const { email } = Object.fromEntries(data);
        try {
            const res = await API.post('/auth/forgot-password', { username: email });
            if (res.status === 200) {
                setSendMailMessage('Password reset link is sent to your email. Pleas check inbox.')
            }
        } catch (error: any) {
            setSendMailMessage(error.message || 'Something went wrong. Please try again');
        }

    }
    return (
        <Grid container component="main" >
            <Box gap='0.5rem' mb='2.5rem' sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
            }}>
                <Typography component="h1" variant="h5" fontWeight='900' >
                    Fill Job
                </Typography>
                <Typography component='p'>
                    Fill up your dream job within a minute
                </Typography>
            </Box>
            <Grid component={Paper} elevation={6} square width={'100%'}>
                <Box
                    sx={{
                        m: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h2" variant="h5">
                        Reset Password
                    </Typography>
                    <Box component="form" onSubmit={handleResetPassword} sx={{ mt: 1 }} width={'100%'}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="reset_email"
                            label="Email Aaddress"
                            name="email"
                            type="email"
                            autoFocus
                        />
                        {sendMailMessage !== '' &&
                            <Typography component='p' fontSize={'12px'} color={'rgb(244, 67, 54)'}>
                                {sendMailMessage}
                            </Typography>}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Reset Password
                        </Button>
                        <Grid container justifyContent={'space-between'}>
                            <Grid>
                                <Link onClick={() => navigate('/login')} sx={{ cursor: 'pointer' }} variant="body2">
                                    Sign In
                                </Link>
                            </Grid>
                            <Grid>
                                <Link onClick={() => navigate('/signup')} sx={{ cursor: 'pointer' }} variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Grid>
        </Grid>

    )
}
