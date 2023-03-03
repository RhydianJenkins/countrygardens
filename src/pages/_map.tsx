import React, { useEffect, useRef, ReactElement, ReactNode, useState } from "react";
import { Loader, LoaderOptions } from '@googlemaps/js-api-loader';

enum Status {
  LOADING = 'LOADING',
  FAILURE = 'FAILURE',
  SUCCESS = 'SUCCESS',
}

export interface WrapperProps extends LoaderOptions {
  children?: ReactNode;
  render?: (status: Status) => ReactElement;
  callback?: (status: Status, loader: Loader) => void;
}

const render = (status: Status) => {
  if (status === Status.LOADING) return <h3>{status} ..</h3>;
  if (status === Status.FAILURE) return <h3>{status} ...</h3>;
};

function MyMapComponent({
  center,
  zoom,
}: {
  center: google.maps.LatLngLiteral;
  zoom: number;
}) {
  const ref = useRef<HTMLElement>();

  useEffect(() => {
    new window.google.maps.Map(ref.current!, {
      center,
      zoom,
    });
  });

  return <div ref={ref} id="map" />;
}

const Wrapper = ({
  children,
  render,
  callback,
  ...options
}: WrapperProps): ReactElement => {
  const [status, setStatus] = useState(Status.LOADING);

  useEffect(() => {
    const loader = new Loader(options);

    const setStatusAndExecuteCallback = (status: Status) => {
      if (callback) callback(status, loader);
      setStatus(status);
    };

    setStatusAndExecuteCallback(Status.LOADING);

    loader.load().then(
      () => setStatusAndExecuteCallback(Status.SUCCESS),
      () => setStatusAndExecuteCallback(Status.FAILURE)
    );
  }, [callback, options]);

  if (status === Status.SUCCESS && children) return <>{children}</>;

  if (render) return render(status);

  return <></>;
};

export default function SimpleMap(){
  const center = { lat: -34.397, lng: 150.644 };
  const zoom = 4;

  return (
    <Wrapper apiKey={process.env.GOOGLE_MAPS_API_KEY || ''} render={render}>
      <MyMapComponent center={center} zoom={zoom} />
    </Wrapper>
  );
}
