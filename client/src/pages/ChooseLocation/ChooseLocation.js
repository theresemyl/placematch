import React, { useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  Circle,
  InfoWindow,
} from "@react-google-maps/api";
import mapStyles from "../../styles/mapStyles";

const libraries = ["places"];

const mapContainerStyle = {
  //   width: "23.5vw"
  width: "50vw",
  //   height: "50vh",
  height: "80vh",
};

let center = {
  lat: 49.246292,
  lng: -123.116226,
};

const options = {
  //   styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
  strokeColor: "#FF0000",
  strokeOpacity: 0.8,
  strokeWeight: 2,
  fillColor: "#FF0000",
  fillOpacity: 0.35,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
  radius: 1000,
  //   zIndex: 1,
};

const onLoad = (circle) => {
  console.log("Circle onLoad circle: ", circle);
};

const onUnmount = (circle) => {
  console.log("Circle onUnmount circle: ", circle);
};

function ChooseLocation() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyD5EhTL5WqCF5ZD56zQD5WJsNRGA_0CzV0",
    libraries,
  });

  const [marker, setMarker] = useState([]);

  if (loadError) {
    return "Sorry, error loading map!";
  }

  if (!isLoaded) {
    return "Loading map...";
  }

  return (
    <div>
      <h1>location</h1>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={center}
        options={options}
        onClick={(event) => {
          //   console.log(event);
          setMarker(() => [
            {
              lat: event.latLng.lat(),
              lng: event.latLng.lng(),
              time: new Date(),
            },
            // console.log(event.latLng.lat()),
          ]);

          center = { lat: event.latLng.lat(), lng: event.latLng.lng() };
        }}
      >
        <Circle
          // optional
          onLoad={onLoad}
          // optional
          onUnmount={onUnmount}
          // required
          center={center}
          // required
          options={options}
        />
        <Marker
          //   position={{ lat: Number(marker.lat), lng: Number(marker.lng) }}
          //   position={{ lat: 49.24715346952308, lng: -123.10252661745643 }}

          position={center}
          key={"mark"}
          visible={true}
          title={"marker"}
          name={"marker"}
        />
        <Marker
          key={marker.time}
          position={{ lat: Number(marker.lat), lng: Number(marker.lng) }}
          //   icon="🍽️"
          //   icon={{
          //     url: "https://w7.pngwing.com/pngs/731/25/png-transparent-location-icon-computer-icons-google-map-maker-marker-pen-cartodb-map-marker-heart-logo-color-thumbnail.png",
          //     scaledSize: new window.google.maps.Size(30, 30),
          //   }}
          visible={true}
          title={"marker"}
        />
      </GoogleMap>
    </div>
  );
}

export default ChooseLocation;
