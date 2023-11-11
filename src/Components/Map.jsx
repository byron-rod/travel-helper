import React from "react";
import GoogleMapReact from "google-map-react";
import { GoLocation } from "react-icons/go";
import { AiOutlineStar } from "react-icons/ai";
import { useMediaQuery } from "react-responsive";

const Map = ({
  setCoordinates,
  setBounds,
  setChildClicked,
  coords,
  places,
}) => {
  const isMobile = useMediaQuery({ maxWidth: 600 });

  const Marker = ({ lat, lng, children }) => {
    return <div>{children}</div>;
  };

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyCV_LVLDjp_ei5ZwDxEkXAOoAhdPAQFtH0" }}
        defaultCenter={coords}
        center={coords}
        defaultZoom={16}
        margin={[50, 50, 50, 50]}
        options={""}
        onChange={(e) => {
          setCoordinates({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        onChildClick={(child) => setChildClicked(child)}
      >
        {/* Dynamic Markers */}
        {places &&
          Array.isArray(places) &&
          places.length > 0 &&
          places.map((place, i) => {
            return (
              <Marker
                lat={Number(place.latitude)}
                lng={Number(place.longitude)}
                key={i}
              >
                {isMobile ? (
                  <GoLocation className="text-blue-500 text-2xl" />
                ) : (
                  <div className="bg-white shadow rounded-lg p-6">
                    <h2 className="text-2xl font-semibold text-gray-800">
                      {place.name}
                    </h2>
                    <img
                      className="h-28 w-full object-cover mb-6 rounded"
                      src={
                        place.photo
                          ? place.photo.images.large.url
                          : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
                      }
                      alt={place.name}
                    />
                    <div className="flex items-center">
                      <AiOutlineStar className="text-yellow-500" />
                      {place.rating && (
                        <p className="text-gray-600 ml-2">{place.rating}</p>
                      )}
                    </div>
                  </div>
                )}
              </Marker>
            );
          })}
      </GoogleMapReact>
    </div>
  );
};
export default Map;
