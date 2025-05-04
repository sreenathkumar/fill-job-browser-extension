import API from '@/config/api';
import Toast from '@/utils/toastClass';
import { Paper } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
    const { setAuth } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const registerToast = new Toast('Registering user...')
        const formdata = new FormData(event.currentTarget);

        //registering new user
        try {
            const res = await API.post('/auth/signup', formdata);

            if (res.status === 200) {
                registerToast.sendSuccess(res.data.message || 'Registering successful. Please login!!');
                const user = res.data.data
                //set the user
                setAuth(user);

                //set the local storage
                await storage.setItem('local:auth', user);
                navigate('/');
            }
        } catch (error: any) {
            registerToast.sendError(error?.response.data.errors[0] || error?.message);
        }
    };

    return (
        <Grid container sx={{ mt: '0' }}>
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
            <Grid component={Paper} elevation={6} square>
                <Box
                    sx={{
                        m: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid width={'100%'}>
                                <TextField
                                    type='email'
                                    required
                                    fullWidth
                                    id="username"
                                    label="Email Address"
                                    name="username"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid width={'100%'}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password (at least 8 characters)"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid >
                                <Link onClick={() => navigate('/login')} sx={{ cursor: 'pointer' }} variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Grid>
            {/* <Copyright sx={{ mt: 5 }} /> */}
        </Grid>
    );
}