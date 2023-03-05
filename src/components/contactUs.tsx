import Map from "@/components/map";
import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";

function ContactUs() {
    return (
        <section id='contact-us'>
            <Box
                sx={{
                    backgroundColor: 'secondary.main',
                    padding: '1em',
                    paddingTop: '10em',
                    textAlign: 'center',
                }}
            >
                <Typography variant="h3">Contact Us</Typography>
            </Box>

            <Box
                sx={{
                    backgroundColor: 'secondary.main',
                    width: '60vw',
                    padding: '1em',
                    textAlign: 'center',
                    margin: 'auto',
                }}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                        <Typography variant="subtitle1">Address</Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography variant="subtitle1">Business Hours</Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography variant="subtitle1">Mobile</Typography>
                    </Grid>
                </Grid>
            </Box>

            <Map />
        </section>
    );
}

export default ContactUs;
