import NextImage from 'next/image';
import { Box, Typography } from '@mui/material';

function CoverImage() {
    return (
        <NextImage
            priority
            fill
            src={'/img/oranges.jpg'}
            alt={'Country Gardens'}
            style={{
                objectFit: 'cover',
                objectPosition: 'top',
            }}
        />
    );
}

function Info() {
    return (
        <Box sx={{
            position: 'relative',
            padding: '2em',
            textAlign: 'center',
            borderRadius: '1em',
            backgroundColor: 'primary.main',
            boxShadow: '0 0 1em 0',
        }}>
            <Typography variant="h1" component="h1">Country Gardens</Typography>
        </Box>
    );
}

function WaveSeparator() {
    // TODO make this svg appear as it is currently invisible
    return (
        <Box sx={{
            width: '100%',
            zIndex: 1,
        }}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                preserveAspectRatio="none"
            >
                <path
                    d="M0 990L45.7 990.7C91.3 991.3 182.7 992.7 274.2 987.7C365.7 982.7 457.3 971.3 548.8 973.7C640.3 976 731.7 992 823 994.5C914.3 997 1005.7 986 1097 980.8C1188.3
                        975.7 1279.7 976.3 1371.2 981.8C1462.7 987.3 1554.3 997.7 1645.8 996.7C1737.3 995.7 1828.7 983.3 1874.3 977.2L1920 971L1920 1081L1874.3 1081C1828.7 1081 1737.3 1081 1645.8
                        1081C1554.3 1081 1462.7 1081 1371.2 1081C1279.7 1081 1188.3 1081 1097 1081C1005.7 1081 914.3 1081 823 1081C731.7 1081 640.3 1081 548.8 1081C457.3 1081 365.7 1081
                        274.2 1081C182.7 1081 91.3 1081 45.7 1081L0 1081Z"
                    fill="#ff0000"
                />
            </svg>

        </Box>
    );
}

export default function Cover() {
    return (
        <Box sx={{
            width: '100vw',
            minHeight: '60em',
            maxHeight: '80vh',
            spacing: 0,
            justify: 'space-around',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            position: 'relative',
        }}>
            <CoverImage />
            <Info />
            <WaveSeparator />
        </Box>
    );
}
