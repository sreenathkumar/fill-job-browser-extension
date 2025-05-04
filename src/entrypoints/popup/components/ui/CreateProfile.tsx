import API from '@/config/api';
import Toast from '@/utils/toastClass';
import { Box, Button, Grid, TextField } from '@mui/material'
import { FormEvent } from 'react';

function CreateProfile() {
    const { auth, setAuth } = useAuth();
    const [formVisible, setFormVisible] = useState(false);

    //function which trigger on clicking "create profile"
    const handleCreateProfile = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const createToast = new Toast('Creating profile...');
        const formdata = new FormData(e.currentTarget);
        const data = Object.fromEntries(formdata);

        try {
            const res = await API.post('/profiles/create', { username: auth.username, name: data.name });

            if (res.status === 200) {
                const updatedAuth = { ...auth, profiles: res.data.data }
                setAuth(updatedAuth);
                await storage.setItem('local:auth', updatedAuth);
                createToast.sendSuccess('Profile created');
            }
        } catch (error: any) {
            createToast.sendError(error?.response.data.errors[0] || error.message)
        }
    }
    return (
        <Grid display={'flex'} flexDirection={'column'} alignItems={'flex-start'} width={'100%'}>
            {formVisible && <Box component={'form'} onSubmit={handleCreateProfile} display={'flex'} width={'100%'} gap={'1rem'} >
                <TextField
                    name="name"
                    required
                    fullWidth
                    id="name"
                    label="Full name"
                    placeholder='Enter your real name.'
                    autoFocus
                />
                <Button type='submit' variant='contained'>Create</Button>
            </Box>}
            <Button onClick={() => setFormVisible(!formVisible)} sx={{ marginTop: '1rem' }} variant="text">{formVisible ? 'Cancel' : 'Create profile'}</Button>
        </Grid>

    )
}

export default CreateProfile