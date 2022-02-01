import axios from "axios";
import React from "react";
import { RestaurantItem } from "type/restaurant";
import RestaurantFilter from "./RestaurantFilter";
import RestaurantList from "./RestaurantList";

const Restaurants = () => {
  const [restaurants, setRestaurants] = React.useState<RestaurantItem[]>([]);
  const [fetchError, setFetchError] = React.useState(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const [minPrice, setMinPrice] = React.useState<number>(0);
  const [maxPrice, setMaxPrice] = React.useState<number>(0);
  const [page, setPage] = React.useState(1);
  const [categoryId, setCategoryId] = React.useState("");

  React.useEffect(() => {
    const url =
      categoryId !== ""
        ? `https://sekawan-restaurant.herokuapp.com/restaurants?category.id=${categoryId}`
        : "https://sekawan-restaurant.herokuapp.com/restaurants";

    axios
      .get(url)
      .then((res) => setRestaurants(res.data))
      .catch((err) => setFetchError(err.message));
  }, [categoryId]);

  const itemPerPage = 8;

  const filteredRestaurents = restaurants
    .filter((resto) => (isOpen ? resto.open : true))
    .filter((resto) => {
      if (minPrice > 0 && maxPrice > 0) {
        return resto.price >= minPrice && resto.price <= maxPrice;
      } else if (minPrice > 0) {
        return resto.price >= minPrice;
      } else if (maxPrice > 0) {
        return resto.price <= maxPrice;
      } else {
        return true;
      }
    });

  const totalPage = Math.ceil(filteredRestaurents.length / itemPerPage);
  const canLoadMore = page < totalPage;

  const paginatedRestaurants = filteredRestaurents.slice(0, page * itemPerPage);

  const toggleOpen = () => {
    setIsOpen((prevOpen) => !prevOpen);
  };

  const clearFilter = () => {
    setIsOpen(false);
    setMinPrice(0);
    setMaxPrice(0);
    setCategoryId("");
  };

  const onLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div className="bg-gray-50 min-h-screen h-full py-4 px-4 sm:px-8 md:px-12">
      <div className="mb-6">
        <h1 className="text-2xl md:text-4xl">Restaurants</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit officia ipsum est, natus quia esse.</p>
        {paginatedRestaurants.length >= 0 ? (
          <>
            <RestaurantFilter
              isOpen={isOpen}
              onToggleOpen={toggleOpen}
              onClearFilter={clearFilter}
              minPrice={minPrice}
              onChangeMinPrice={setMinPrice}
              maxPrice={maxPrice}
              onChangeMaxPrice={setMaxPrice}
              categoryId={categoryId}
              onChangeCategoryId={setCategoryId}
            />
            <RestaurantList restaurants={paginatedRestaurants} onLoadMore={onLoadMore} canLoadMore={canLoadMore} />
          </>
        ) : fetchError ? (
          <h1 className="text-4xl mx-auto">{fetchError}</h1>
        ) : (
          <h1 className="text-4xl mx-auto">Loading.......</h1>
        )}
      </div>
    </div>
  );
};

export default Restaurants;
