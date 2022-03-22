import React, { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";

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

function ChooseLocation(
  props,
  { restaurantList, setRestaurantList, foundUserName }
) {
  const [marker, setMarker] = useState([]);
  const [newUser, setNewUser] = useState(props.foundUserName);
  console.log("newuser", newUser);
  useEffect(() => {
    // if (restaurantList !== null) {
    //   console.log("not null", restaurantList);
    // }

    // if (props.foundUserName !== undefined) {
    //   let newFoundUserName = foundUserName;
    //   console.log(newFoundUserName);
    // }

    setTimeout(function () {
      console.log("found username inside useeffect", props.foundUserName);
    }, 2000);
  }, []);

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

    const service = new window.google.maps.places.PlacesService(map);
    service.nearbySearch(request, (res, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        console.log("res inside nearby search", res);
        console.log(status);
      }
      props.setRestaurantList(res);
    });
  };

  console.log("found username in choose location", foundUserName);
  console.log(props);
  // props.setFoundUserName((prevState) => {
  //   // prevState,
  //   return prevState;
  // });

  return (
    <main>
      {/* first time choosing location */}

      {props.foundUserName === undefined ? (
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
            // onClick={(map) => onMapChange(map)}
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
          {/* <button onClick={handleClick}>Click to start swiping!</button> */}
          <Link to="./choosefriend">Click to start swiping!</Link>
          <br />
        </div>
      ) : (
        <h1>null</h1>
      )}

      {/* second time choosing location with rerender with classes */}
      {/* <div>
    <h1>You have chosen the following location: </h1>
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
    <h1>You are swiping with: </h1>
    <button onClick={handleClick}>Click to start swiping!</button>
    <br />
    </div> */}
    </main>
  );
}

export default ChooseLocation;
