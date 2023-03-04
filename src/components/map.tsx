import React from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { Box, CircularProgress } from '@mui/material';

function Map() {
    const { isLoaded, loadError } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    })

    if (loadError) {
        // eslint-disable-next-line no-console
        console.error('Error loading Google Maps API');
        return <></>;
    }

    const center = {
        lat: 50.73096646682943,
        lng: -0.7930198428999052,
    };

    if (isLoaded) {
        return (
            <GoogleMap
                mapContainerStyle={{
                    width: '100%',
                    height: '1024px',
                }}
                center={center}
                zoom={17}
            >
                <Marker
                    position={center}
                    title="Country Gardens"
                />
            </GoogleMap>
        );
    }

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '1024px'
        }}>
            <CircularProgress />
        </Box>
    )
}

export default React.memo(Map);
