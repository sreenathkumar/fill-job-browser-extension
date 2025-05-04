import API from '@/config/api';
import { jobProfileFormInfo } from '@/utils/formInfo';
import { formStructure } from '@/utils/formStructure';
import Toast from '@/utils/toastClass';
import { Box, Button, Chip, Grid, Paper } from '@mui/material';
import DependentFields from './components/DependentFields';
import InputGroup from './components/InputGroup';
import FormGroupItem from './components/FormGroupItem';
import { FormEvent } from 'react';
import { getObjectDiff } from '@/utils';

function Options() {
  const [profileData, setProfileData] = useState<jobProfileDataType>();

  const getData = async (id: string) => {
    const res = await API.get(`/profiles/${id}`);

    if (res.status === 200) {
      return res.data.data
    } else {
      return null
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updateToast = new Toast('updating profile...')
    const formdata = new FormData(e.currentTarget);

    if (!formdata) {
      updateToast.sendError('Update failed. change something.')
      return
    }

    const diff = getObjectDiff(profileData || {}, Object.fromEntries(formdata));

    try {
      const res = await API.patch(`/profiles/${profileData?.username}`, diff);

      if (res.status === 200) {
        setProfileData({ ...res.data.data });
        updateToast.sendSuccess('Profile updated successfully')
      } else {
        updateToast.sendError('Update profile failed.')
      }
    } catch (error: any) {
      updateToast.sendError(error.message || 'Unexpected error.')
    }
  }

  // Use useEffect to call getData when needed
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const username = params.get('username');

    (async () => {

      if (username) {
        const dataToast = new Toast('Loading profile data...');
        const data = await getData(username);
        if (data) {
          setProfileData(data);
          dataToast.sendSuccess('Profile data loaded.');
        } else {
          dataToast.sendError('Loading data failed.');
        }
      }
    })()
  }, []);

  return (
    <Box display={"flex"} flexDirection={"column"}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        id="text-form"
        sx={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}
      >
        <Grid
          size={{ xs: 12, sm: 8, md: 5 }}
          padding={"1.5rem"}
          borderRadius={"10px"}
          elevation={3}
          component={Paper}
          square
        >
          <Chip
            label={"Basic Information"}
            variant="outlined"
            sx={{ marginBottom: "2.5rem" }}
          />
          <Box display={"flex"} flexDirection={"column"} gap={"1rem"}>
            {formStructure.basic_field.map((item, itIndex) => {
              return (
                <InputGroup key={itIndex}>
                  {item.fields?.map((field, index) => {
                    return (
                      <FormGroupItem
                        field={field}
                        key={index}
                        value={profileData ? profileData[field.id] : ''}
                        fieldInfo={jobProfileFormInfo[field.id]}
                        size={{ xs: 12, md: 6, lg: 6 }}
                      />
                    );
                  })}
                </InputGroup>
              );
            })}
          </Box>
        </Grid>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid
            size={{ xs: 12, md: 6, lg: 6 }}
            padding={"1.5rem"}
            borderRadius={"10px"}
            elevation={3}
            component={Paper}
            square
          >
            <Chip
              label={"Present Address"}
              variant="outlined"
              sx={{ marginBottom: "2.5rem" }}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                flexGrow: "1",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {formStructure.present_address_field.map((item, itIndex) => {
                return (
                  <FormGroupItem
                    field={item}
                    key={itIndex}
                    value={profileData ? profileData[item.id] : ''}
                    fieldInfo={jobProfileFormInfo[item.id]}
                  />
                );
              })}
            </Box>
          </Grid>
          <Grid
            size={{ xs: 12, md: 6, lg: 6 }}
            padding={"1.5rem"}
            borderRadius={"10px"}
            elevation={3}
            component={Paper}
            square
          >
            <Chip
              label={"Permanent Address"}
              variant="outlined"
              sx={{ marginBottom: "2.5rem" }}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                flexGrow: "1",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <DependentFields
                name="same_as_present"
                id="same_as_present"
                check={false}
              />
            </Box>
          </Grid>
        </Grid>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid
            size={{ xs: 12, md: 6, lg: 6 }}
            padding={"1.5rem"}
            borderRadius={"10px"}
            elevation={3}
            component={Paper}
            square
          >
            <Chip
              label={"SSC/Equivalent Level"}
              variant="outlined"
              sx={{ marginBottom: "2.5rem" }}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                flexGrow: "1",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {formStructure.ssc_field.map((item, itIndex) => {
                return (
                  <FormGroupItem
                    field={item}
                    key={itIndex}
                    value={profileData ? profileData[item.id] : ''}
                    fieldInfo={jobProfileFormInfo[item.id]}
                  />
                );
              })}
            </Box>
          </Grid>
          <Grid
            size={{ xs: 12, md: 6, lg: 6 }}
            padding={"1.5rem"}
            borderRadius={"10px"}
            elevation={3}
            component={Paper}
            square
          >
            <Chip
              label={"HSC/Equivalent Level"}
              variant="outlined"
              sx={{ marginBottom: "2.5rem" }}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                flexGrow: "1",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {formStructure.hsc_field.map((item, itIndex) => {
                return (
                  <FormGroupItem
                    field={item}
                    key={itIndex}
                    value={profileData ? profileData[item.id] : ''}
                    fieldInfo={jobProfileFormInfo[item.id]}
                  />
                );
              })}
            </Box>
          </Grid>
        </Grid>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid
            size={{ xs: 12, md: 6, lg: 6 }}
            padding={"1.5rem"}
            borderRadius={"10px"}
            elevation={3}
            component={Paper}
            square
          >
            <Chip
              label={"Honors/Equivalent"}
              variant="outlined"
              sx={{ marginBottom: "2.5rem" }}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                flexGrow: "1",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {formStructure.honors_field.map((item, itIndex) => {
                return (
                  <FormGroupItem
                    field={item}
                    key={itIndex}
                    value={profileData ? profileData[item.id] : ''}
                    fieldInfo={jobProfileFormInfo[item.id]}
                  />
                );
              })}
            </Box>
          </Grid>
          <Grid
            size={{ xs: 12, md: 6, lg: 6 }}
            padding={"1.5rem"}
            borderRadius={"10px"}
            elevation={3}
            component={Paper}
            square
          >
            <Chip
              label={"Masters/Equivalent"}
              variant="outlined"
              sx={{ marginBottom: "2.5rem" }}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                flexGrow: "1",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <DependentFields
                name="if_applicable_mas"
                id="if_applicable_mas"
                check={false}
              />
            </Box>
          </Grid>
        </Grid>
        <Box width={"100%"}>
          <Button type='submit' variant='contained' sx={{ borderRadius: '50px', position: "fixed", bottom: '1rem', right: '1rem' }}>
            Update
          </Button>
        </Box>
      </Box>
      {/* <Box
        component="form"
        onSubmit={handleFileSubmit}
        id="file-form"
        my={"2.5rem"}
      >
        <Grid
          container
          padding={"1.5rem"}
          borderRadius={"10px"}
          rowGap={"1rem"}
          elevation={3}
          component={Paper}
          square
        >
          <Box sx={{ display: "flex", gap: "1rem" }} width={"100%"}>
            <Avatar variant="square" sx={{ width: "100px", height: "100px" }}>
              <img
                src={previewProPhoto}
                alt=""
                width={"100%"}
                height={"100%"}
              />
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
              Upload Photo (must be 300px x 300px)
              {photoUploadError && (
                <Alert severity="error">{photoUploadError}</Alert>
              )}
              <VisuallyHiddenInput
                type="file"
                name="photo"
                onChange={handleFileUpload}
              />
            </Button>
            <DownloadBtn image={previewProPhoto || ""} item_name="photo" />
          </Box>
          <Box sx={{ display: "flex", gap: "1rem" }} width={"100%"}>
            <Avatar variant="square" sx={{ width: "300px", height: "80px" }}>
              <img
                src={previewProSignature}
                alt=""
                width={"100%"}
                height={"100%"}
              />
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
              Upload Signature (must be 300px x 80px).
              {signatureUploadError && (
                <Alert severity="error">{signatureUploadError}</Alert>
              )}
              <VisuallyHiddenInput
                type="file"
                name="signature"
                onChange={handleFileUpload}
              />
            </Button>
            <DownloadBtn image={previewProSignature || ""} item_name="signature" />
          </Box>
        </Grid>
      </Box> */}

    </Box>
  );
}

export default Options