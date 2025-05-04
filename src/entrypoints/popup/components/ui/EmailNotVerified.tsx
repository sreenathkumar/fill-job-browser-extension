import API from '@/config/api';
import Toast from '@/utils/toastClass';
import { Alert, Box, Button, Grid, TextField, Typography } from '@mui/material';
import { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function EmailNotVerified() {
    const { auth, setAuth } = useAuth();
    const navigate = useNavigate()
    //function which will handle the otp verification
    const handleOtp = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const otpToast = new Toast('Verifing OTP...');
        const formdata = new FormData(e.currentTarget);
        const { otp } = Object.fromEntries(formdata);

        if (String(otp).length !== 6) {
            otpToast.sendError('Invalid otp.');
        }

        // send over api
        try {
            const res = await API.post('/auth/verify-email', { otp, email: auth.username });

            if (res.status === 200) {
                otpToast.sendSuccess('OTP verification successful.')
                const updatedAuth = { ...auth, emailVerified: true }
                setAuth(updatedAuth);
                navigate('/')
                await storage.setItem('local:auth', updatedAuth)
            }
        } catch (error: any) {
            otpToast.sendError(error?.response.data.errors[0] || error?.message)
        }
    }

    return (
        <Grid>
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
            <Alert variant="filled" severity="warning">
                Please verify your email. Check inbox!!
            </Alert>
            <Box component={'form'} onSubmit={handleOtp} display={'flex'} gap={'1rem'} mt={'1.5rem'}>
                <TextField
                    name="otp"
                    required
                    fullWidth
                    id="otp"
                    label="Enter code"
                    placeholder='Enter the 6 digits code.'
                    autoFocus
                />
                <Button type='submit' variant='contained'>Verify</Button>
            </Box>
            <Box mt={'1rem'}>
                <Typography component='span'>
                    Didn't get the code?
                </Typography>
                <Button component={Link} to='/resend-code' variant='text'>Resend Code</Button>
            </Box>

        </Grid>
    )
}

export default EmailNotVerified