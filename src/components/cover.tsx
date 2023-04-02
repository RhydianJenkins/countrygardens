import NextImage from 'next/image';
import { Box, Typography } from '@mui/material';

type FillProps = { fill: string };

function CoverImage() {
    return (
        <NextImage
            priority
            fill
            src={'/static/img/cover.jpg'}
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
            textAlign: 'center',
            padding: '2em',
            border: '.3em solid',
            borderColor: 'secondary.main',
        }}>
            <Typography
                variant="h1"
                component="h1"
                color="secondary.main"
                sx={{
                    textShadow: "-2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff, 2px 2px 0 #fff",
                    fontWeight: 'bold',
                }}
            >
                Country Gardens
            </Typography>
        </Box>
    );
}

function WaveSeparator({ fill }: FillProps) {
    return (
        <Box sx={{
            position: 'absolute',
            bottom: '0',
            left: '0',
            width: '100%',
            overflow: 'hidden',
            lineHeight: '0',
            transform: 'rotate(180deg)',
            fill,
        }}>
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
            </svg>
        </Box>
    );
}

export default function Cover({ fill }: FillProps) {
    return (
        <Box sx={{
            width: '100vw',
            minHeight: '50em',
            spacing: 0,
            justify: 'space-around',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            position: 'relative',
            background: 'pimary.main',
        }}>
            <CoverImage />
            <Info />
            <WaveSeparator fill={fill} />
        </Box>
    );
}
