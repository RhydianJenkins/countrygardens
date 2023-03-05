import Map from "@/components/map";
import { Box } from "@mui/system";

function AboutUs() {
    return (
        <section id='about-us'>
            <Box
                sx={{
                    backgroundColor: 'secondary.main',
                    padding: '1em',
                    paddingTop: '10em',
                    textAlign: 'center',
                }}
            >
                <h2>About Us</h2>
            </Box>

            <Box sx={{
                backgroundColor: 'secondary.main',
                margin: 'auto',
                gap: '16px',
                padding: '1em',
                paddingBottom: '1em',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
            }}>
                Opening times, etc?
            </Box>

            <Map />
        </section>
    );
}

export default AboutUs;
