import API from '@/config/api';
import { convertImage } from '@/utils';
import Toast from '@/utils/toastClass';
import { Avatar, Box, Button, Grid, Paper, styled, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function EditUser() {
    const navigate = useNavigate();
    const { auth, setAuth } = useAuth();
    //const [name, setName] = useState<string>(auth?.name || '');

    const [previewImage, setPreviewImage] = useState<string>(auth?.image || '#');
    const [currentImage, setCurrentImage] = useState<File>();

    //handle image upload
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target?.files as FileList;
        setCurrentImage(selectedFile?.[0]);
        setPreviewImage(URL.createObjectURL(selectedFile?.[0]));
    }

    //handle form submit
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const updateToast = new Toast('Updating data');

        const formData = new FormData(e.currentTarget);
        if (currentImage) {
            const convertedImg = await convertImage(currentImage);
            formData.append('img', convertedImg);
        }
        const data = Object.fromEntries(formData.entries());
        try {
            const res = await API.patch('/user', data);

            if (res.status === 200) {
                setAuth({ ...auth, ...data });
                updateToast.sendSuccess('user updated successfully');
            } else {
                throw new Error(res?.data.message || 'updating error failed')
            }
        } catch (error: any) {
            updateToast.sendError(error?.message || 'Unexpected error');
        }

    }

    const VisuallyHiddenInput = styled('input')`
   clip: rect(0 0 0 0);
   clip-path: inset(50%);
   height: 1px;
   overflow: hidden;
   position: absolute;
   bottom: 0;
   left: 0;
   white-space: nowrap;
   width: 1px;
   name: 'generalProfileImage';
 `;
    return (
        <Grid size={{ xs: 12, sm: 8, md: 5 }} borderRadius={'10px'} elevation={3} component={Paper} square>
            <Box component='form' onSubmit={handleSubmit} padding={'1.5rem'} sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', justifyContent: 'space-between', alignItems: 'center' }}>

                <Box sx={{ display: 'flex', gap: '1rem' }} width={'100%'}>
                    {
                        previewImage ? <Avatar src={previewImage} sx={{ m: 1, bgcolor: 'secondary.main', width: '50px', height: '50px' }} /> : <Avatar sx={{ m: 1, bgcolor: 'secondary.main', width: '50px', height: '50px' }}> {auth?.name ? auth?.name[0].toLocaleUpperCase() : 'U'}</Avatar>
                    }
                    <TextField
                        name="name"
                        required
                        fullWidth
                        id="name"
                        label="Full Name"
                        autoFocus
                        defaultValue={auth?.name}
                    />

                </Box>

                {/* <TextField
                id="outlined-multiline-static"
                label="Bio"
                name='bio'
                multiline
                rows={4}
                fullWidth
                value={bio}
                onChange={(e) => { setBio(e.target.value) }}
             /> */}
                {/* <Box sx={{ display: 'flex', gap: '1rem' }} width={'100%'}>
                    <Avatar variant="square" sx={{ width: '50px', height: '50px' }}>
                        <img src={previewImage} alt="" width={'100%'} height={'100%'} />
                    </Avatar>
                     <Button
                   component="label"
                   tabIndex={-1}
                   variant="outlined"
                   fullWidth
                   startDecorator={
                      <SvgIcon>
                         <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                         >
                            <path
                               strokeLinecap="round"
                               strokeLinejoin="round"
                               d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                            />
                         </svg>
                      </SvgIcon>
                   }
                >
                   Upload profile picture
                   <VisuallyHiddenInput onChange={handleFileUpload} type="file" />
                </Button> 
                </Box> */}
                <Box display={'flex'} gap={'1rem'} alignItems={'center'} justifyContent={'space-between'} width={'100%'}>
                    <Button onClick={() => navigate(-1)} sx={{ fontSize: '12px' }} >
                        Go back
                    </Button>
                    <Button type='submit' sx={{ fontSize: '12px', borderRadius: '50px' }} variant='contained' >
                        Update data
                    </Button>
                </Box>
            </Box>
        </Grid>
    )
}


export default EditUser