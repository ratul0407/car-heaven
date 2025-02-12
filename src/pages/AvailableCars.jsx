import axios from "axios";
import { useEffect, useState } from "react";
import { TfiViewListAlt } from "react-icons/tfi";
import { MdGridView } from "react-icons/md";
import GridCarCard from "../components/GridCarCard";
import ListCarCard from "../components/ListCarCard";
import { FaSearch } from "react-icons/fa";

function AvailableCars() {
  const [cars, setCars] = useState([]);
  const [gridView, setGridView] = useState(true);
  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState("");
  const [search, setSearch] = useState("");
  const [searchText, setSearchText] = useState("");
  console.log(gridView);
  useEffect(() => {
    const fetchAllCars = async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/all-cars?search=${search}&sortBy=${sortBy}&order=${order}`,
      );

      setCars(data);
    };

    fetchAllCars();
  }, [search, sortBy, order]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(searchText);
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-around gap-4 py-8 lg:flex-row">
        {/* search field */}
        <form onSubmit={handleSubmit}>
          <div className="flex items-center gap-2">
            <input
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              type="text"
              placeholder="search"
              className="input input-bordered"
            />
            <button className="flex items-center gap-2 rounded-lg bg-black/80 px-8 py-3 font-bold text-white">
              <span>Search</span>
              <FaSearch />
            </button>
          </div>
        </form>
        <div className="flex gap-2">
          {/* filter price */}
          <div>
            <select
              onChange={(e) => {
                setOrder(e.target.value);
                setSortBy("price");
              }}
              className="rounded-lg p-2 shadow-xl outline-gray-300"
            >
              <option value="">Filter Price</option>
              <option value="high">High</option>
              <option value="low">Low</option>
            </select>
          </div>
          {/* filter date */}
          <div>
            <select
              onChange={(e) => {
                setOrder(e.target.value);
                setSortBy("date");
              }}
              className="rounded-lg p-2 shadow-xl outline-gray-300"
            >
              <option value="">Filter Date</option>
              <option value="asc">Oldest</option>
              <option value="dsc">Newest</option>
            </select>
          </div>
        </div>
      </div>

      {/* sidebar and products */}
      <div className="flex w-full gap-8">
        <div className="w-1/4 rounded-lg px-4 shadow-xl">
          {/* toggle grid and list view
           */}
          <div className="flex items-center gap-4 border-b-2 py-4">
            <p className="font-semibold">View as</p>

            <button onClick={() => setGridView(true)}>
              <MdGridView
                className={`${gridView && "text-slate-900"} h-8 w-8 border border-slate-300 p-1 text-slate-400`}
              />
            </button>
            <button onClick={() => setGridView(false)}>
              <TfiViewListAlt
                className={`${!gridView && "text-slate-900"} h-8 w-8 border border-slate-300 p-1 text-slate-400`}
              />
            </button>
          </div>

          {/* Filter price */}
          <div className="">
            <h3>Filter Price</h3>
            <input type="checkbox" />
          </div>
        </div>

        {!gridView ? (
          <div className="list-view">
            {cars.map((car) => (
              <ListCarCard key={car._id} car={car} />
            ))}
          </div>
        ) : (
          <div className="grid-view">
            {cars.map((car) => (
              <GridCarCard key={car._id} car={car} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AvailableCars;
