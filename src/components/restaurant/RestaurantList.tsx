import { Link } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { RestaurantItem } from "type/restaurant";

interface RestaurantListProps {
  restaurants: RestaurantItem[];
  onLoadMore: () => void;
  canLoadMore: boolean;
}

const RestaurantList = ({ restaurants, onLoadMore, canLoadMore }: RestaurantListProps) => {
  const formatNumber = (value: number) => {
    return new Intl.NumberFormat("en-IN", { maximumSignificantDigits: 3 }).format(value);
  };

  return (
    <div className="my-10">
      <h3 className="text-2xl">All Restaurants</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-auto my-8 gap-6">
        {restaurants.map((resto) => (
          <div key={resto.id}>
            <img src={resto.images[0]} alt="produk-item" className="w-full h-64 object-cover rounded-sm mb-4" />
            <div className="px-2 pb-6">
              <p className="text-xl font-bold">{resto.name}</p>
              {Array(Math.floor(resto.rating))
                .fill(0)
                .map((_, i) => (
                  <AiFillStar key={i} className="text-yellow-400 inline-flex" />
                ))}
              <div className="flex items-end justify-between">
                <div>
                  <p>{resto.category.name}</p>
                  <p>Rp {formatNumber(resto.price)}</p>
                </div>
                <div className="flex items-center justify-between mx-1 ">
                  {resto.open ? (
                    <>
                      <p className="w-3 h-3 bg-green-500 border border-green-500 rounded-xl"></p>
                      <p className="mx-1">Open</p>
                    </>
                  ) : (
                    <>
                      <p className="w-3 h-3 bg-red-500 border border-red-bg-red-500 rounded-xl"></p>
                      <p className="mx-1">Closed</p>
                    </>
                  )}
                </div>
              </div>
            </div>
            <Link to={`/detail/${resto.id}`}>
              <button className="bg-[#16213E] text-white w-full py-2 my-2 rounded-sm">Learn More</button>
            </Link>
          </div>
        ))}
      </div>
      {canLoadMore && (
        <div className="w-full md:w-1/2 mx-auto">
          <button className="w-full border-2 border-[#16213E] rounded-md py-2" onClick={onLoadMore}>
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default RestaurantList;
