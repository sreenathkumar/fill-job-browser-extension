import { Avatar, Box, Button, Chip, Grid, Paper, Typography } from '@mui/material'
import { ReactNode } from 'react';

interface dataType {
    name: string, username?: string, image?: string
}

function ProfileCard({ profile, data, children }: { profile: string, data: dataType, children: ReactNode }) {
    const { name, username, image }: dataType = data;

    return (
        <Grid size={{ xs: 12, sm: 8, md: 5 }} borderRadius={'10px'} elevation={3} component={Paper} square>
            <Box
                sx={{
                    m: '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: `1rem`
                }}
            >
                <Chip label={profile} variant="outlined" size='small' sx={{ fontSize: '.5rem', height: '20px' }} />
                <Box sx={{ display: 'flex', gap: '1rem', justifyContent: 'space-between', alignItems: 'center' }}>
                    {
                        image ? <Avatar src={image} sx={{ m: 1, bgcolor: 'secondary.main', width: '50px', height: '50px' }} /> : <Avatar sx={{ m: 1, bgcolor: 'secondary.main', width: '50px', height: '50px' }}> {name ? name[0].toLocaleUpperCase() : 'U'}</Avatar>
                    }
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                        <Typography component="h5" sx={{ fontSize: '1rem', fontWeight: '600' }}>
                            {name || 'User'}
                        </Typography>
                        <Typography component="p" fontSize={'12px'} sx={{ opacity: 0.6 }}>
                            {username}
                        </Typography>
                        <Box display={'flex'} gap={'1rem'} mt={'1rem'}>
                            {
                                children
                            }
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Grid>
    )
}

export default ProfileCard;