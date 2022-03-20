import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  Circle,
} from "@react-google-maps/api";
import mapStyles from "../../styles/mapStyles";

const libraries = ["places"];

const mapContainerStyle = {
  width: "420px",
  height: "550px",
};

let center = {
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

let resList = [];

function ChooseLocation(props, { restaurantList, setRestaurantList }) {
  const [marker, setMarker] = useState([]);
  const [newList, setNewList] = useState([]);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries,
  });

  if (loadError) {
    return "Sorry, error loading map!";
  }

  if (!isLoaded) {
    return "Loading map...";
  }

  const handleMarker = (event) => {
    center = { lat: event.latLng.lat(), lng: event.latLng.lng() };
    setMarker(center);
  };

  const onMapChange = (map) => {
    let getLocation = new window.google.maps.LatLng(center.lat, center.lng);
    let request = {
      location: getLocation,
      radius: "2000",
      type: ["restaurant"],
    };

    // const callback = (res) => {
    //   console.log("callback: ", res);
    //   props.setRestaurantList(res);
    // };

    const service = new window.google.maps.places.PlacesService(map);
    service.nearbySearch(request, (res, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        console.log("res inside nearby search", res);
        console.log(status);
        // props.setNewList(res);
        // console.log("new list: ", newList);
      }
      props.setRestaurantList(res);
    });
  };

  function callback(results, status) {
    if (status === window.google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        setMarker(results[i]);
        console.log("callback fn results:", results[i]);
      }
    }
    props.setRestaurantList(results);
  }

  const handleClick = (map) => {
    props.history.push("./swipenow");
    console.log(props);
  };

  return (
    <div>
      <h1>Choose location</h1>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        onLoad={(map) => onMapChange(map)}
        onCenterChanged={(map) => onMapChange(map)}
        center={center}
        options={options}
        onClick={(event) => handleMarker(event)}
      >
        <Circle center={center} options={options} />
        <Marker
          position={center}
          key={"mark"}
          visible={true}
          title={"marker"}
          name={"marker"}
        />
      </GoogleMap>
      <br />
      <button onClick={handleClick}>Click to start swiping!</button>
      <br />
    </div>
  );
}

export default ChooseLocation;
