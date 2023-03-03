import React from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';


function MyComponent() {
    const { isLoaded, loadError } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    })

    if (loadError) {
        console.error(loadError)
        return <div>Map cannot be loaded right now, sorry.</div>
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

    return <></>;
}

export default React.memo(MyComponent)
