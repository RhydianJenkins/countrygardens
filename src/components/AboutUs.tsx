import Map from "@/components/map";
import { Box } from "@mui/system";

function AboutUs() {
    return (
        <section id='About Us'>
            <Box
                sx={{
                    backgroundColor: 'secondary.main',
                    padding: '16px',
                    paddingTop: '128px',
                    textAlign: 'center',
                }}
            >
                <h2>About Us</h2>
            </Box>

            <Box sx={{
                backgroundColor: 'secondary.main',
                margin: 'auto',
                gap: '16px',
                padding: '16px',
                paddingBottom: '128px',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
            }}>
                Opening times
                Location
            </Box>

            <Map />
        </section>
    );
}

export default AboutUs;
