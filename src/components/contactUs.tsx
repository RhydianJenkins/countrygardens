import Map from "@/components/map";
import { AccessTimeFilled, Home, PhoneIphone  } from "@mui/icons-material";
import { Grid, Paper, Tooltip, Typography } from "@mui/material";
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
                        <Typography
                            variant="subtitle1"
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: '0.25em',
                                paddingBottom: '1em',
                            }}
                        >
                            <Tooltip title="Address"><Home /></Tooltip>
                        </Typography>

                        <Typography variant="body1">165 High Street</Typography>
                        <Typography variant="body1">Selsey</Typography>
                        <Typography variant="body1">Chichester</Typography>
                        <Typography variant="body1">PO20 0PZ</Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography
                            variant="subtitle1"
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: '0.25em',
                            }}
                        >
                            <Tooltip title="Opening Times"><AccessTimeFilled /></Tooltip>
                        </Typography>
                        <Typography
                            variant="caption"
                            sx={{
                                padding: '10px',
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
                    <Grid item xs={12} md={4}>
                        <Typography
                            variant="subtitle1"
                            sx={{
                                paddingBottom: '1em',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: '0.25em',
                            }}
                        >
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
