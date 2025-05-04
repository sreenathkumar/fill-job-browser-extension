import API from "@/config/api";
import Toast from "@/utils/toastClass";
import { Box, Button, Grid, TextField, Typography } from "@mui/material"
import { FormEvent } from "react"

function ResendCode() {
    const handleResendCode = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const resendToast = new Toast('Sending code...');
        const formdata = new FormData(e.currentTarget);

        try {
            const res = await API.post('/auth/resend-otp', formdata);

            if (res.status === 200) {
                resendToast.sendSuccess(res.data.message || 'OTP is sent to your email. Please check inbox');
            }
        } catch (error: any) {
            resendToast.sendError(error?.response.data.errors[0] || error?.message);
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
            <Box component={'form'} onSubmit={handleResendCode} display={'flex'} gap={'1rem'} mt={'1.5rem'}>
                <TextField
                    type="email"
                    name="email"
                    required
                    fullWidth
                    id="email"
                    label="Email address"
                    placeholder='Enter the email address.'
                    autoFocus
                />
                <Button type='submit' variant='contained'>Resend</Button>
            </Box>
        </Grid>
    )
}

export default ResendCode