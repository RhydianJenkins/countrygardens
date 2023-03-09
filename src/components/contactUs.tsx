import Map from "@/components/map";
import { AccessTimeFilled, Home, PhoneIphone  } from "@mui/icons-material";
import { Grid, Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/system";

function ContactUs() {
    return (
        <section id='contact-us'>
            <Box
                sx={{
                    padding: '1em',
                    marginTop: '10em',
                    textAlign: 'center',
                }}
            >
                <Typography variant="h3">Contact Us</Typography>
            </Box>

            <Box
                sx={{
                    padding: '1em',
                    textAlign: 'center',
                    marginBottom: '10em',
                }}
            >
                <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={12} md={2}>
                        <Typography variant="subtitle1">
                            <Tooltip title="Address"><Home /></Tooltip>
                        </Typography>

                        <Typography variant="body1">165 High Street</Typography>
                        <Typography variant="body1">Selsey</Typography>
                        <Typography variant="body1">Chichester</Typography>
                        <Typography variant="body1">PO20 0PZ</Typography>
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <Typography variant="subtitle1">
                            <Tooltip title="Opening Times"><AccessTimeFilled /></Tooltip>
                        </Typography>
                        <Typography
                            variant="caption"
                            sx={{
                                padding: '1em',
                            }}
                        >
                            (Bank holidays may vary)
                        </Typography>

                        <Typography variant="body1">Monday: 8-4</Typography>
                        <Typography variant="body1">Tuesday: 8-4</Typography>
                        <Typography variant="body1">Wednesday: 8-4</Typography>
                        <Typography variant="body1">Thursday: 8-4</Typography>
                        <Typography variant="body1">Friday: 8-4</Typography>
                        <Typography variant="body1">Saturday: 8-4</Typography>
                        <Typography variant="body1">Sunday: Closed</Typography>
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <Typography variant="subtitle1">
                            <Tooltip title="Mobile"><PhoneIphone /></Tooltip>
                        </Typography>
                        <Typography variant="body1">01243 607400</Typography>
                    </Grid>
                </Grid>
            </Box>

            <Map />
        </section>
    );
}

export default ContactUs;
