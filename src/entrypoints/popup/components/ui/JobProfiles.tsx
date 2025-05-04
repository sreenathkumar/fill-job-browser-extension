import { Button } from "@mui/material";
import ProfileCard from "./ProfileCard";
import { Link } from "react-router-dom";

interface ProfileItemType {
    name: string,
    username: string;
}

function JobProfiles({ profiles }: { profiles: ProfileItemType[] }) {
    //function to handle job profile edit button
    const handleJobEdit = (username: string) => {
        const url = browser.runtime.getURL(`/options.html?username=${username}`);

        //create a new tab to edit the job profile.
        browser.tabs.create({ url });
    }

    //function which will fill the form
    const handleFill = (username: string) => {

    }
    return (
        <>
            {
                profiles.length > 0 ? profiles.map((item: ProfileItemType) => {
                    return <ProfileCard key={item.username} profile={'Job Profile'} data={item}>
                        <Button onClick={() => handleJobEdit(item.username)} variant="contained" sx={{ borderRadius: '50px', fontSize: '12px', padding: '5px 16px', lineHeight: '1.5' }}>
                            Edit job data
                        </Button>
                        <Button onClick={() => handleFill(item.username)} variant="contained" sx={{ borderRadius: '50px', fontSize: '12px', padding: '5px 16px', lineHeight: '1.5' }}>
                            Fill form
                        </Button>
                    </ProfileCard>
                }) : <Button LinkComponent={Link} variant="text">Create profiles</Button>

            }
        </>
    )
}

export default JobProfiles