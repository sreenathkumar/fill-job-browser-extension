import API from '@/config/api';
import useAuth from '@/hooks/useAuth';
import { Button, Grid } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ProfileCard from './ui/ProfileCard';
import JobProfiles from './ui/JobProfiles';


function Home() {
    const { auth, setAuth } = useAuth();
    const navigate = useNavigate();

    // function to handle logout
    const handleLogout = async () => {
        try {
            const res = await API.get('/auth/logout');

            if (res?.status === 200) {
                await storage.clear('local');
                setAuth(null);
                navigate('/login')
            }
        } catch (error: any) {
            console.log(error.message)
            toast.error('Logout failed')
        }
    }

    return (
        <Grid container component="main" gap={'1rem'}>
            <ProfileCard profile={'General Profile'} data={auth}>
                <Button component={Link} to='/edit' variant="contained" sx={{ borderRadius: '50px', fontSize: '12px', padding: '5px 16px', lineHeight: '1.5' }}>
                    Edit
                </Button>
                <Button onClick={handleLogout} variant="contained" sx={{ borderRadius: '50px', fontSize: '12px', padding: '5px 16px', lineHeight: '1.5' }}>
                    Logout
                </Button>
            </ProfileCard>
            <JobProfiles profiles={auth.profiles} />
        </Grid>
    )
}

export default Home