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
  console.log(restaurantList);
  const [marker, setMarker] = useState([]);

  const isInitialMount = useRef(true);

  const prevAmount = usePrevious({ restaurantList, setRestaurantList });

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyD5EhTL5WqCF5ZD56zQD5WJsNRGA_0CzV0",
    libraries,
  });
  const onMapChange = (map) => {
    console.log("on map change map", map);
    let getLocation = new window.google.maps.LatLng(center.lat, center.lng);
    let request = {
      location: getLocation,
      radius: "2000",
      type: ["restaurant"],
    };

    // const callback = (res) => {
    //   console.log(res);
    //   setRestaurantList(res);
    // };

    console.log(
      "on click coords change:",
      getLocation.lat(),
      getLocation.lng()
    );
    // console.log(service);

    const service = new window.google.maps.places.PlacesService(map);
    service.nearbySearch(request, (res) => {
      console.log("result from nearby search", res);
      props.setRestaurantList(res);
    });
  };
  console.log(
    "setRestaurantList state update outside function: ",
    props.restaurantList
  );

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      // return props.restaurantList;
      setTimeout((map) => {
        onMapChange(map);
      }, 3000);
    }
  }, [props.restaurantList]);

  if (loadError) {
    return "Sorry, error loading map!";
  }

  if (!isLoaded) {
    return "Loading map...";
  }

  // const onMapLoad = (map) => {
  //   new window.google.maps.LatLng(center.lat, center.lng);
  // };

  const handleClick = (map) => {
    props.history.push("./swipenow");
  };

  return (
    <div>
      <h1>Choose location</h1>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        onLoad={(map) => onMapChange(map)}
        onCenterChanged={(map) => onMapChange(map)}
        // onCenterChanged={() => onMapChange}
        center={center}
        options={options}
        onClick={(event) => {
          center = { lat: event.latLng.lat(), lng: event.latLng.lng() };
          //   onMapChange();
          setMarker(() => [
            {
              lat: event.latLng.lat(),
              lng: event.latLng.lng(),
              time: new Date(),
            },
            // console.log(event.latLng.lat(), event.latLng.lng()),
            console.log(center),
          ]);

          //   setRestaurantList();
          //   onMapChange(event);
        }}
      >
        {/* <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD5EhTL5WqCF5ZD56zQD5WJsNRGA_0CzV0&libraries=places"></script> */}

        <Circle center={center} options={options} />
        <Marker
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
      {/* {restaurantList.map((restaurant) => (
        <p key={restaurant.name}>{restaurant.name}</p>
      ))} */}
    </div>
  );
}

export default ChooseLocation;
