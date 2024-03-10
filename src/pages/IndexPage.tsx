import { useEffect, useState } from "react";

import { Beer } from "../types/globalTypes";
import Card from "../components/Card";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";

const IndexPage = () => {
    const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Beer[]>();
  const [searchQuery, setSearchQuery] = useState<string>();

  const fetchData = async () => {
    try {
        setLoading(true);
      const response = await fetch("https://api.punkapi.com/v2/beers");
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.log(error);
    }
    finally{
        setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Navbar/>
      <div className="mx-auto w-[80%] my-5 flex gap-4">
        <input type="text" className="w-[90%] p-5 rounded-md border-2 border-gray-300" placeholder="Search for beer" onChange={(e)=>{
            setSearchQuery(e.target.value);
        }}/>
        <Link to={"/search?query=" + searchQuery}>
        <button
        disabled={searchQuery ? false : true}
          className="cursor-pointer transition-all bg-blue-500 text-white px-6 py-5 rounded-lg border-blue-600 order-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
        >
          Search
        </button>
        </Link>
      </div>
      <h1 className="text-center text-red-800 text-4xl font-bold my-10">
        Top beers information.
      </h1>
      {
        loading ? <div className="flex h-[50vh] justify-center items-center"><Loader/></div> : (
            !data?.length ? <div><h5 className="text-center text-gray-500 text-2xl font-semibold">No information found</h5></div> : (
                <>
                    <div className="flex gap-5 flex-wrap">
        {data?.map((item, index) => {
          return <Card key={index} beer={item} />;
        })}
      </div>
                </>
            )
        )
      }
    </div>
  );
};

export default IndexPage;
