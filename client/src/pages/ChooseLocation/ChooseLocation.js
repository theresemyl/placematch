import React, { useState, useEffect } from "react";
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

let newCoords = {
  lat: 49.246292,
  lng: -123.116226,
};

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
  strokeColor: "#FF0000",
  strokeOpacity: 0.8,
  strokeWeight: 2,
  fillColor: "#FF0000",
  fillOpacity: 0.35,
  clickable: false,
  draggable: true,
  editable: false,
  visible: true,
  radius: 3000,
  zIndex: 1,
};

function ChooseLocation(props, { lat, lng, setLat, setLng }) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyD5EhTL5WqCF5ZD56zQD5WJsNRGA_0CzV0",
    libraries,
  });

  const [marker, setMarker] = useState([]);

  const handleClick = () => {
    props.history.push("./swipenow");
  };

  //   useEffect(() => {

  //   }, []);

  console.log(lat, lng);

  //   const handleChange = (event) => {
  //     console.log(event);
  //   };

  if (loadError) {
    return "Sorry, error loading map!";
  }

  if (!isLoaded) {
    return "Loading map...";
  }

  return (
    <div>
      <h1>Choose location</h1>
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
          //   handleChange();
          //   const newLat = Number(event.latLng.lat());
          //   const newLng = Number(event.latLng.lng());

          newCoords = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
          };

          //   setLat(center.lat);
          //   setLng(center.lng);
          //   console.log(lat, lng);
          center = { lat: event.latLng.lat(), lng: event.latLng.lng() };
          //   console.log(center);
        }}
      >
        <Circle center={center} options={options} />
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
          visible={true}
          title={"marker"}
        />
      </GoogleMap>
      <br />
      <button onClick={handleClick}>Click to start swiping!</button>
      <br />
      <p>
        {lat}, {lng}
      </p>
    </div>
  );
}

export default ChooseLocation;
