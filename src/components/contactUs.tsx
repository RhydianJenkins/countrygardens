import Map from "@/components/map";
import AccessTimeFilled from "@mui/icons-material/AccessTimeFilled";
import Home from "@mui/icons-material/Home";
import PhoneIphone from "@mui/icons-material/PhoneIphone";
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function ContactUs() {
    return (
        <section id='contact'>
            <Box
                sx={{
                    padding: '1em',
                    marginTop: '10em',
                    paddingTop: '10em',
                    textAlign: 'center',
                    backgroundColor: 'primary.main',
                }}
            >
                <Typography variant="h3">Contact</Typography>
            </Box>

            <Box
                sx={{
                    padding: '1em',
                    textAlign: 'center',
                    paddingBottom: '10em',
                    backgroundColor: 'primary.main',
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
