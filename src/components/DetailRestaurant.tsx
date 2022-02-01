import React from "react";
import axios from "axios";
import { AiFillStar } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { RestaurantItem } from "type/restaurant";

const DetailRestaurant = () => {
  const [restaurant, setRestaurant] = React.useState<RestaurantItem | null>(null);
  const [fetchError, setFetchError] = React.useState(null);

  let params = useParams();

  React.useEffect(() => {
    axios
      .get(`https://sekawan-restaurant.herokuapp.com/restaurants/${params.id}`)
      .then((res) => setRestaurant(res.data))
      .catch((err) => setFetchError(err.message));
  }, [params.id]);

  return restaurant !== null ? (
    <div className="bg-gray-50 min-h-screen h-full py-4 px-4 sm:px-8 md:px-12">
      <div className="flex flex-col lg:px-40 xl:px-60">
        <div className="flex items-center justify-center flex-col lg:flex-row">
          {restaurant.images.map((url, idx) => (
            <img key={url} src={url} alt={`restaurant${idx + 1}`} className="w-full h-60 object-cover" />
          ))}
        </div>
        <h3 className="text-2xl font-bold">{restaurant.name}</h3>
        <p className="flex">
          {Array(Math.floor(restaurant.rating))
            .fill(0)
            .map((_, i) => (
              <AiFillStar key={i} className="text-yellow-400" />
            ))}
        </p>
        <div className="w-full my-8 border-2 border-gray-500 rounded-md">
          <h1 className="text-4xl p-2">Reviews : </h1>
          {restaurant.reviews.map((review) => (
            <div key={review.id} className="py-2 px-2 sm:px-4 md:px-8 border-b-2 border-gray-500">
              <h4 className="text-xl font-medium">{review.name}</h4>
              <p className="flex">
                {Array(Math.floor(review.rating))
                  .fill(0)
                  .map((_, i) => (
                    <AiFillStar key={i} className="text-yellow-400" />
                  ))}
              </p>
              <p className="py-2">{review.text}</p>
              <div className="flex items-center">
                {review.images.map((url, idx) => (
                  <img key={url} src={url} alt={`restaurant-${idx + 1}`} className="w-20 h-20 mx-1 object-cover" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : fetchError ? (
    <h1 className="text-4xl">{fetchError}</h1>
  ) : (
    <h1 className="text-4xl">Loading.......</h1>
  );
};

export default DetailRestaurant;
