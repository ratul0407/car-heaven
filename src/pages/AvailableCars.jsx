import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { TfiViewListAlt } from "react-icons/tfi";
import { MdGridView } from "react-icons/md";
import GridCarCard from "../components/GridCarCard";
import ListCarCard from "../components/ListCarCard";
import { FaSearch } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";

function AvailableCars() {
  const sidebarRef = useRef(null);
  const [cars, setCars] = useState([]);
  const [gridView, setGridView] = useState(true);
  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState("");
  const [search, setSearch] = useState("");
  const [searchText, setSearchText] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  console.log(gridView);

  useEffect(() => {
    function handleClickOutside(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }

    // Add event listener when navbar is open
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);
  console.log(menuOpen);
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
      <div className="flex flex-row items-center justify-center gap-4 py-8 lg:flex-row">
        {/* search field */}
        <button className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          <IoMenu />
        </button>
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
          {/* filter date */}
          {/* <div>
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
          </div> */}
        </div>
      </div>

      {/* sidebar and products */}
      <div className="relative flex w-full gap-8 lg:items-start">
        <div
          ref={sidebarRef}
          className={`absolute z-20 w-[50vw] bg-white transition-all duration-500 lg:w-1/4 ${menuOpen ? "translate-x-0" : "-translate-x-[100vw]"} rounded-lg px-4 shadow-xl lg:static lg:translate-x-0 lg:bg-inherit lg:py-12`}
        >
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

          {/* filter price */}
          <div className="w-full space-y-2 border-b-2 py-4">
            <p className="font-semibold">Filter Price</p>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="price"
                  className="radio"
                  defaultChecked
                />
                <p>Default</p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  onChange={(e) => {
                    setOrder(e.target.value);
                    setSortBy("price");
                  }}
                  value="high"
                  type="radio"
                  name="price"
                  className="radio"
                />
                <p>High</p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  onChange={(e) => {
                    setOrder(e.target.value);
                    setSortBy("price");
                  }}
                  value="low"
                  type="radio"
                  name="price"
                  className="radio"
                />
                <p>Low</p>
              </div>
            </div>
          </div>

          {/* filter date */}
          <div className="w-full space-y-2 border-b-2 py-4">
            <p className="font-semibold">Filter Date</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="date"
                  className="radio"
                  defaultChecked
                />
                <p>Default</p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  onChange={(e) => {
                    setOrder(e.target.value);
                    setSortBy("date");
                  }}
                  value="asc"
                  name="date"
                  type="radio"
                  className="radio"
                />
                <p>Newest</p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  onChange={(e) => {
                    setOrder(e.target.value);
                    setSortBy("date");
                  }}
                  value="dsc"
                  name="date"
                  type="radio"
                  className="radio"
                />
                <p>Oldest</p>
              </div>
            </div>
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
