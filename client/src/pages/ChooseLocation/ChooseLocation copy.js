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

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

function ChooseLocation(props, { restaurantList, setRestaurantList }) {
  const [marker, setMarker] = useState([]);

  const isInitialMount = useRef(true);

  const prevAmount = usePrevious({ restaurantList, setRestaurantList });

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries,
  });

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    }
  }, [props.restaurantList, marker]);

  if (loadError) {
    return "Sorry, error loading map!";
  }

  if (!isLoaded) {
    return "Loading map...";
  }
  const onMapChange = (map) => {
    console.log("on map change map", map);
    let defaultLocation = new window.google.maps.LatLng(49.2827, 123.1207);
    let getLocation = new window.google.maps.LatLng(center.lat, center.lng);
    let request = {
      location: getLocation,
      radius: "2000",
      type: ["restaurant"],
    };

    console.log("get location: ", getLocation.lat());

    const callback = (res) => {
      console.log("callback: ", res);
      props.setRestaurantList(res);
    };

    const service = new window.google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);
    //   (res) => {
    //   props.setRestaurantList(res);
    // }
  };
  // const onMapLoad = (map) => {
  //   new window.google.maps.LatLng(center.lat, center.lng);
  // };

  // const handleMarker = useCallback(event => {
  //   center = { lat: event.latLng.lat(), lng: event.latLng.lng() };
  //   setMarker(() => [
  //     {
  //       lat: event.latLng.lat(),
  //       lng: event.latLng.lng(),
  //       time: new Date(),
  //     },
  //   ])});

  const handleMarker = (event) => {
    center = { lat: event.latLng.lat(), lng: event.latLng.lng() };
    // setMarker(() => [
    //   {
    //     lat: event.latLng.lat(),
    //     lng: event.latLng.lng(),
    //     time: new Date(),
    //   },
    // ]);
    let newCenter = { lat: event.latLng.lat(), lng: event.latLng.lng() };

    setMarker(newCenter);
    console.log(center);
  };

  const handleClick = (map) => {
    props.history.push("./swipenow");
  };

  return (
    <main>
      {/* first time choosing location */}
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
