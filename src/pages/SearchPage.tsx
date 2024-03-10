import { useEffect, useState } from "react";
import { Beer } from "../types/globalTypes";
import Fuse from "fuse.js";
import Loader from "../components/Loader";
import Card from "../components/Card";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

interface resultType {
  item: Beer;
  refIndex: number;
}

const SearchPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<resultType[]>([]);

  const [searchQuery, setSearchQuery] = useState<string>();

  const fetchData = async (query: string) => {
    try {
      setLoading(true);
      const options = {
        keys: ["name", "tagline"],
      };
      const response = await fetch("https://api.punkapi.com/v2/beers");
      const data = await response.json();
      const search = new Fuse(data, options);
      if (query) {
        const result = search.search(query);
        setData(result as any);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query");
  useEffect(() => {
    fetchData(query as string);
  }, []);

  //   console.log(data)
  return (
    <div>
      <Navbar/>
      <div className="mx-auto w-[80%] my-5 flex gap-4">
        <input
          type="text"
          className="w-[90%] p-5 rounded-md border-2 border-gray-300"
          placeholder="Search for beer"
          onChange={(e) => {
            setSearchQuery(e.target?.value);
          }}
        />
        <Link to={"/search?query=" + searchQuery}>
          <button className="cursor-pointer transition-all bg-blue-500 text-white px-6 py-5 rounded-lg border-blue-600 order-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]">
            Search
          </button>
        </Link>
      </div>

      {
        !query ? <h1 className="text-center text-red-800 text-4xl font-bold my-10">Search For Beer Infromation here!!!!!!</h1> : (
            <div>
        <h1 className="text-center text-red-800 text-4xl font-bold my-10">
          Search Result for: {query}
        </h1>
        {loading ? (
          <div className="flex h-[50vh] justify-center items-center">
            <Loader />
          </div>
        ) : !data?.length ? (
          <div>
            <h5 className="text-center text-gray-500 text-2xl font-semibold">
              No information found for: {query}
            </h5>
          </div>
        ) : (
          <>
            <div className="flex gap-5 flex-wrap">
              {data?.map((item, index) => {
                return <Card key={index} beer={item.item} />;
              })}
            </div>
          </>
        )}
      </div>
        ) 
      }
    </div>
  );
};

export default SearchPage;
