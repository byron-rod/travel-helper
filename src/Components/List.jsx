import React, { useState, useEffect, createRef } from "react";
import { Blocks } from "react-loader-spinner";
import PlaceDetails from "./PlaceDetails";

const List = ({
  places,
  childClicked,
  isLoading,
  type,
  setType,
  rating,
  setRating,
}) => {
  const [elRefs, setElRefs] = useState([]);

  useEffect(() => {
    setElRefs((refs) =>
      Array(places?.length)
        .fill()
        .map((_, i) => refs[i] || createRef())
    );
  }, [places]);

  return (
    <div className="flex flex-col px-2">
      <h4 className="text-2xl lg:text-3xl font-thin mb-4">
        Restaurants, Hotels & Attractions
      </h4>

      {isLoading && (
        <div className="flex justify-center align-middle">
          <Blocks
            visible={true}
            height={160}
            width={160}
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
          />
        </div>
      )}

      {!isLoading && (
        <>
          <div className="flex flex-col">
            <label
              htmlFor="type"
              className="mb-2 font-semibold text-lg text-gray-900"
            >
              Type
            </label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="border-2 rounded-md p-2 text-lg text-gray-900"
            >
              <option value="restaurants">Restaurants</option>
              <option value="hotels">Hotels</option>
              <option value="attractions">Attractions</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="rating"
              className="mb-2 font-semibold text-lg text-gray-900"
            >
              Rating
            </label>
            <select
              id="rating"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="border-2 rounded-md p-2 text-lg text-gray-900 mb-2"
            >
              <option value={0}>All</option>
              <option value={3}>Above 3.0</option>
              <option value={4}>Above 4.0</option>
              <option value={4.5}>Above 4.5</option>
            </select>

            <div className="flex flex-col gap-y-3 w-full overflow-y-auto h-[100vh] mb-4">
              {places?.map((place, i) => (
                <div key={i}>
                  <PlaceDetails
                    place={place}
                    selected={Number(childClicked) === i}
                    refProp={elRefs[i]}
                  />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default List;
