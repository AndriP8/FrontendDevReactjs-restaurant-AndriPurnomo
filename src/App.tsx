import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Restaurants from "components/restaurant";
import DetailRestaurant from "components/DetailRestaurant";

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<Restaurants />} />
        <Route path="detail/:id" element={<DetailRestaurant />} />
      </Routes>
    </Router>
  );
}

export default App;
