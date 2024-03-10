import { useState } from "react";
import { Beer } from "../types/globalTypes";

interface propType{
    beer: Beer;
}


const Card = ({beer}: propType) => {



 const [showDetails, setShowDetails] = useState(false);


 const toggleDetails = () => {
    setShowDetails(!showDetails);
 };

 return (
    <div className="md:w-[500px] mx-auto bg-white rounded-xl shadow-md overflow-hidden w-[350px] m-4 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105">
      <div className="md:flex md:flex-col">
        <div className="md:flex-shrink-0">
          <img className="h-48 w-full object-cover md:w-full" src={beer?.image_url} alt={beer?.name} />
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{beer?.tagline}</div>
          <h2 className="block mt-1 text-lg leading-tight font-medium text-black">{beer?.name}</h2>
          <p className="mt-2 text-gray-500">{beer?.description}</p>
          <div className="mt-2">
            <span className="text-gray-500">ABV: {beer?.abv}%</span>
            <span className="ml-2 text-gray-500">IBU: {beer?.ibu}</span>
          </div>
          <div className="mt-2">
            <span className="text-gray-500">Target OG: {beer?.target_og}</span>
            <span className="ml-2 text-gray-500">Target FG: {beer?.target_fg}</span>
          </div>
          <div className="mt-2">
            <span className="text-gray-500">Volume: {beer?.volume?.value} {beer?.volume?.unit}</span>
          </div>
          <div className="mt-2">
            <span className="text-gray-500">Boil Volume: {beer?.boil_volume?.value} {beer?.boil_volume?.unit}</span>
          </div>
          <div className="mt-2">
            <span className="text-gray-500">Mash Temp: {beer?.method?.mash_temp[0]?.temp?.value}°C for {beer?.method?.mash_temp[0]?.duration} minutes</span>
          </div>
          <div className="mt-2">
            <span className="text-gray-500">Fermentation Temp: {beer?.method?.fermentation.temp.value}°C</span>
          </div>
          <div className="mt-2">
            <span className="text-gray-500">Yeast: {beer?.ingredients?.yeast}</span>
          </div>
          {showDetails ? (
            <>
              <div className="mt-2">
                <h3 className="text-gray-500 font-bold">Ingredients</h3>
                <ul className="list-disc list-inside">
                 {beer?.ingredients?.malt.map((malt, index) => (
                    <li key={index} className="hover:text-indigo-500">{malt?.name}: {malt?.amount?.value} {malt?.amount?.unit}</li>
                  ))}
                 {beer?.ingredients?.hops.map((hop, index) => (
                    <li key={index} className="hover:text-indigo-500">{hop?.name}: {hop?.amount?.value} {hop?.amount?.unit} - {hop?.add} - {hop?.attribute}</li>
                  ))}
                </ul>
              </div>
              <div className="mt-2">
                <h3 className="text-gray-500 font-bold">Food Pairing</h3>
                <ul className="list-disc list-inside">
                 {beer?.food_pairing?.map((pairing, index) => (
                    <li key={index} className="hover:text-indigo-500">{pairing}</li>
                  ))}
                </ul>
              </div>
              <div className="mt-2">
                <h3 className="text-gray-500 font-bold">Brewers Tips</h3>
                <p className="hover:text-indigo-500">{beer?.brewers_tips}</p>
              </div>
              <button onClick={toggleDetails} className="mt-2 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
                Read Less
              </button>
            </>
          ) : (
            <button onClick={toggleDetails} className="mt-2 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
              Read More
            </button>
          )}
        </div>
      </div>
    </div>
 );
};

export default Card;
