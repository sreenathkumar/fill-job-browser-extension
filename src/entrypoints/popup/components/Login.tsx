import API from "@/config/api";
import { Box, Button, Grid, Link, Paper, TextField, Typography } from "@mui/material"
import { FormEvent } from "react";
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify";

function Login() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const { setAuth } = useAuth()

    //handle form submit
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        const loginTaost = toast.loading('Logging in...', { autoClose: false });
        const formdata = new FormData(e.target as HTMLFormElement);

        try {
            //send the signup request
            const res = await API.post('/auth/login', formdata);

            if (res?.status === 200) {
                setAuth(res.data.data);
                setIsLoading(false);
                toast.update(loginTaost, { render: 'Logged in successfully', type: 'success', autoClose: 2000, isLoading: false });
                await storage.setItem('local:auth', res.data.data)
            } else {
                setIsLoading(false);
                toast.update(loginTaost, { render: res.data.message, type: 'error', autoClose: 2000, isLoading: false })
            }
        } catch (error: any) {
            setIsLoading(false);
            toast.update(loginTaost, { render: error?.response.data.errors[0] || error?.message, type: 'error', autoClose: 1000, isLoading: false })
        }


    }
    return (
        <Grid container component="main">
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
            <Grid size={{ xs: 12, sm: 8, md: 5 }} component={Paper} elevation={6} square>
                <Box
                    sx={{
                        m: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h2" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Email Address"
                            name="username"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={isLoading}
                        >
                            Sign In
                        </Button>
                        <Grid container justifyContent={'space-between'}>
                            <Grid>
                                <Link onClick={() => navigate('/forgot-password')} sx={{ cursor: 'pointer' }} variant="body2">
                                    Forgot password?
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

export default Login