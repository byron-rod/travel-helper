import React from "react";
import { GoLocation } from "react-icons/go";
import { FaPhoneAlt } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";

const PlaceDetails = ({ place, selected, refProp }) => {
  if (selected) {
    refProp?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <img
        className="h-48 w-full object-cover mb-6 rounded"
        src={
          place.photo
            ? place.photo.images.large.url
            : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
        }
        alt={place.name}
      />
      <h2 className="text-2xl font-semibold text-gray-800">{place.name}</h2>
      <p className="text-gray-600">
        {place.num_reviews} review{place.num_reviews > 1 && "s"}
      </p>
      <p className="text-gray-600">
        {place.rating} Rating{place.rating > 1 && "s"}
      </p>
      <p className="text-gray-600">Price: {place.price_level}</p>
      <p className="text-gray-600">Ranking: {place.ranking}</p>
      {place?.awards?.map((award, index) => (
        <div className="flex items-center my-2" key={index}>
          <img src={award.images.small} alt={award.display_name} />
          <p className="text-gray-500 ml-2">{award.display_name}</p>
        </div>
      ))}
      {place?.cuisine?.map(({ name }, index) => (
        <span
          className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 mt-2"
          key={index}
        >
          {name}
        </span>
      ))}
      {place.address && (
        <p className="text-gray-600 mt-4 flex items-center">
          <GoLocation className="mr-2 text-xl" />
          {place.address}
        </p>
      )}
      {place.phone && (
        <p className="text-gray-600 mt-2 flex items-center">
          <FaPhoneAlt className="mr-2" /> {place.phone}
        </p>
      )}
      <div className="mt-4">
        <a
          href={place.web_url}
          target="_blank"
          rel="noreferrer"
          className="text-blue-500 hover:underline"
        >
          Trip Advisor
        </a>
        <a
          href={place.website}
          target="_blank"
          rel="noreferrer"
          className="ml-4 text-blue-500 hover:underline"
        >
          Website
        </a>
      </div>
    </div>
  );
};

export default PlaceDetails;
