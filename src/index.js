const express = require("express");
const fs = require("fs");
const cors = require("cors");
const {restaurants} = require("./restaurants");
const {hotels} = require("./hotels");
const app = express();
app.use(cors());
const port = 3000;

// function to encode file data to base64 encoded string
function base64_encode(file) {
  // read binary data
  var bitmap = fs.readFileSync(file);
  // convert binary data to base64 encoded string
  const b64 = new Buffer(bitmap).toString("base64");
  return `data:image/png;base64,${b64}`;
}

const COMMON_BASE_ROUTE = "/api";
const RESTAURANTS_ROUTE = "restaurants";
const HOTELS_ROUTE = "hotels";


app.get("/", (req, res) => {
  res.send("Hello Kaizeners!");
});

app.get(`${COMMON_BASE_ROUTE}/${RESTAURANTS_ROUTE}`, (req, res) => {
    if(req?.query?.urgent === 'true'){
       return res.status(417).send('Error, urgent things always fail!');
    }
  const _restaurants = restaurants
    .filter(
      (r) =>
        !req?.query?.search || r.name.toLowerCase().includes(req?.query?.search)
    )
    .map((r) => ({
      ...r,
      image: base64_encode(`src/images/restaurants/${r.id}.jpg`),
    }));
  res.send(_restaurants);
});

app.get(`${COMMON_BASE_ROUTE}/${RESTAURANTS_ROUTE}/:id`, (req, res) => {
    if(req?.query?.urgent === 'true'){
       return res.status(417).send('Error, urgent things always fail!');
    }
  const _restaurant = {
    ...restaurants.find((r) => r.id === req.params.id),
    image: base64_encode(`src/images/restaurants/${req.params.id}.jpg`),
  };
  res.send(_restaurant);
});

app.get(`${COMMON_BASE_ROUTE}/${HOTELS_ROUTE}`, (req, res) => {
    if(req?.query?.urgent === 'true'){
       return res.status(417).send('Error, urgent things always fail!');
    }
  const _hotels = hotels
    .filter(
      (r) =>
        !req?.query?.search || r.name.toLowerCase().includes(req?.query?.search)
    )
    .map((r) => ({
      ...r,
      image: base64_encode(`src/images/hotels/${r.id}.jpg`),
    }));
  res.send(_hotels);
});

app.get(`${COMMON_BASE_ROUTE}/${HOTELS_ROUTE}/:id`, (req, res) => {
    if(req?.query?.urgent === 'true'){
       return res.status(417).send('Error, urgent things always fail!');
    }
  const _hotels = {
    ...restaurants.find((r) => r.id === req.params.id),
    image: base64_encode(`src/images/hotels/${req.params.id}.jpg`),
  };
  res.send(_hotels);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
