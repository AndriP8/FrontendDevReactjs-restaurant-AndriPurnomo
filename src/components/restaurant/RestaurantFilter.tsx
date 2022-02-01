import axios from "axios";
import React from "react";
import { AiOutlineUp } from "react-icons/ai";
import { RestaurantItem } from "type/restaurant";

interface RestaurantFilterProps {
  isOpen: boolean;
  onToggleOpen: () => void;
  onClearFilter: () => void;
  minPrice: number;
  onChangeMinPrice: (price: number) => void;
  maxPrice: number;
  onChangeMaxPrice: (price: number) => void;
  categoryId: string;
  onChangeCategoryId: (categoryId: string) => void;
}

const RestaurantFilter = ({
  isOpen,
  onClearFilter,
  onToggleOpen,
  minPrice,
  onChangeMinPrice,
  maxPrice,
  onChangeMaxPrice,
  categoryId,
  onChangeCategoryId,
}: RestaurantFilterProps) => {
  const [isModalPriceOpen, setIsModalPriceOpen] = React.useState(false);
  const [restaurants, setRestaurants] = React.useState<RestaurantItem[] | null>(null);
  const [fetchError, setFetchError] = React.useState(null);

  React.useEffect(() => {
    axios
      .get("http://localhost:5000/restaurants")
      .then((res) => setRestaurants(res.data))
      .catch((err) => setFetchError(err.message));
  }, []);

  return (
    <div className="py-4 px-2 border-t border-b border-gray-400 flex items-start md:items-center md:justify-between flex-col md:flex-row">
      <div className="flex flex-start md:items-center justify-center flex-col md:flex-row">
        <h4 className="text-2xl mr-2">Filter By</h4>
        <div className="flex items-center justify-center flex-wrap">
          <button
            className="p-1 my-1 md:px-2 mr-2 flex justify-between items-center border rounded-sm border-gray-400 cursor-pointer"
            onClick={onToggleOpen}
          >
            {isOpen ? (
              <p className="w-5 h-5 mr-2 inline-flex border border-gray-400 bg-green-500 rounded-full"></p>
            ) : (
              <p className="w-5 h-5 mr-2 inline-flex border border-gray-400 rounded-full"></p>
            )}
            Open Now
          </button>
          <div className="relative">
            <button
              className="p-1 my-1 md:px-2 mr-2 flex justify-between items-center border rounded-sm border-gray-400 cursor-pointer"
              onClick={() => setIsModalPriceOpen(!isModalPriceOpen)}
            >
              <p className="px-1">Price</p>
              <AiOutlineUp className="px-1 text-xl" />
            </button>
            {isModalPriceOpen && (
              <div className="absolute top-10 w-full bg-gray-400 border-2 rounded-md p-1">
                <div>
                  <p>Min</p>
                  <input
                    type="number"
                    className="w-full border border-gray-400"
                    value={minPrice}
                    onChange={(e) => onChangeMinPrice(e.target.valueAsNumber)}
                  />
                </div>
                <div>
                  <p>Max</p>
                  <input
                    type="number"
                    className="w-full border border-gray-400"
                    value={maxPrice}
                    onChange={(e) => onChangeMaxPrice(e.target.valueAsNumber)}
                  />
                </div>
              </div>
            )}
          </div>
          <select
            className="p-1 md: px-2 my-1 mr-2 flex justify-between items-center border rounded-sm border-gray-400 cursor-pointer bg-transparent"
            value={categoryId}
            onChange={(e) => onChangeCategoryId(e.target.value)}
          >
            {restaurants?.map((resto) => (
              <option value={resto.category.id}>{resto.category.name}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="my-2 md:my-0">
        <button className="py-1 px-3 border rounded-md border-gray-400 cursor-pointer" onClick={onClearFilter}>
          Clear All
        </button>
      </div>
    </div>
  );
};

export default RestaurantFilter;
