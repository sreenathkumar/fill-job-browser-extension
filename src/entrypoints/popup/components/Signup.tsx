import { Paper } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
    const navigate = useNavigate()
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        //   event.preventDefault();
        //   const data = new FormData(event.currentTarget);
        //   const { email, password } = Object.fromEntries(data);
        //   if (password.length < 6) {
        //      alert('Password must be at least 6 characters long')
        //      return;
        //   }
        //   //registering new user
        //   registerUser(email.toString(), password.toString()).then((res) => {
        //      if (res.status === 'success') {
        //         alert('An email is sent to your email address. Please verify your email address to login.');
        //         appView.value = 'signin' //showing login screen after registering.
        //      } else {
        //         alert(res.message)
        //      }
        //   });
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
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
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