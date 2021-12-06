import React, { useState, useEffect, useCallback, useRef } from "react";
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

function ChooseLocation(props, { lat, lng, setLat, setLng }) {
  const isInitialMount = useRef(true);

  //   useEffect((map) => {
  //     if (isInitialMount.current) {
  //       isInitialMount.current = false;
  //     } else {
  //       onMapChange();
  //     }
  //   });
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyD5EhTL5WqCF5ZD56zQD5WJsNRGA_0CzV0",
    libraries,
  });

  const [marker, setMarker] = useState([]);
  const [restaurantList, setRestaurantList] = useState([]);
  const [newRestaurantList, setNewRestaurantList] = useState([]);

  if (loadError) {
    return "Sorry, error loading map!";
  }

  if (!isLoaded) {
    return "Loading map...";
  }

  const onMapLoad = (map) => {
    new window.google.maps.LatLng(center.lat, center.lng);
    // let getLocation = new window.google.maps.LatLng(49.246292, -123.116226);

    // map = new window.google.maps.Map(document.getElementById("map"), {
    //   center: pyrmont,
    //   zoom: 15,
    // });
  };

  const onMapChange = (map) => {
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
      console.log(res);

      // this one gets saved everytime i click onto another page then click back into location
      setRestaurantList(res);

      // this one resets everytime i click on location
      resList.push(res);
      console.log(resList[0]);
    });
  };

  const handleClick = (map) => {
    console.log(restaurantList);
    // console.log("handle click run");
    // let getLocation = new window.google.maps.LatLng(center.lat, center.lng);
    // let request = {
    //   location: getLocation,
    //   radius: "2000",
    //   type: ["restaurant"],
    // };
    // const callback = (res) => {
    //   console.log(res);
    //   setNewRestaurantList(res);
    // };
    // const service = new window.google.maps.places.PlacesService(map);
    // service.nearbySearch(request, callback);
    // // props.history.push("./swipenow");
    // console.log(newRestaurantList);
  };

  return (
    <div>
      <h1>Choose location</h1>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        onLoad={(map) => onMapChange(map)}
        // onCenterChanged={(map) => onMapChange(map)}
        center={center}
        options={options}
        // nearbySearch={request}
        // onMapChange={(map) => {
        //   console.log(map);
        // }}
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

          //   onMapChange();
          //   handleChange();
          //   const newLat = Number(event.latLng.lat());
          //   const newLng = Number(event.latLng.lng());

          //   newCoords = {
          //     lat: event.latLng.lat(),
          //     lng: event.latLng.lng(),
          //   };

          //   setLat(center.lat);
          //   setLng(center.lng);
        }}
      >
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD5EhTL5WqCF5ZD56zQD5WJsNRGA_0CzV0&libraries=places"></script>

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
      <button onClick={onMapChange}>Click to start swiping!</button>
      <br />
      {resList.map((restaurant) => (
        <p key={restaurant.name}>{restaurant.name}</p>
      ))}
    </div>
  );
}

export default ChooseLocation;
