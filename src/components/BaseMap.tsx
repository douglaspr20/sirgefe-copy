import React, { useEffect, useRef } from 'react';
import mapboxgl, { Map } from 'mapbox-gl';

type BaseMapProps = {
  geolocation: {
    lat: number;
    long: number;
    city: string;
    province: string;
    country: string;
  };
};

const BaseMap = (props: BaseMapProps) => {
  const geolocation = props.geolocation;

  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_KEY || '';

  const map = useRef<Map | null>(null);

  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: 'mapContainer',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [geolocation.long, geolocation.lat],
      zoom: 9,
    });

    const nav = new mapboxgl.NavigationControl();

    map.current.addControl(nav, 'top-right');

    const popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnMove: false,
      closeOnClick: false,
    })
      .setLngLat([geolocation.long, geolocation.lat])
      .setHTML(
        `<div style="text-align:center"><h4>Location:</h4><p>
          ${geolocation.city} ${geolocation.province} ${geolocation.country}
        </p></div>`,
      )
      .addTo(map.current);
  }, [
    geolocation.city,
    geolocation.country,
    geolocation.lat,
    geolocation.long,
    geolocation.province,
  ]);
  if (geolocation.lat === null || geolocation.long === null) {
    return <>Could not load location at this time.</>;
  } else {
    return <div id="mapContainer" className="map"></div>;
  }
};

export default BaseMap;
