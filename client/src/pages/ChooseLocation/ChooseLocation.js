import React from "react";
import {
  GoogleMap,
  useLoadScript,
  Market,
  InfoWindow,
} from "@react-google-maps/api";
import mapStyles from "../../styles/mapStyles";

const libraries = ["places"];

const mapContainerStyle = {
  width: "23.5vw",
  height: "50vh",
};

const center = {
  lat: 49.246292,
  lng: -123.116226,
};

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

function ChooseLocation() {
  console.log(process.env.REACT_APP_GOOGLE_API_KEY);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyD5EhTL5WqCF5ZD56zQD5WJsNRGA_0CzV0",
    libraries,
  });

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
      ></GoogleMap>
    </div>
  );
}
export default ChooseLocation;
