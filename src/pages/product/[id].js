import { useState } from "react";
import { StarIcon } from "@heroicons/react/solid";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { addToBasket } from "../../slices/basketSlice";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

const MAX_RATING = 5;
const MIN_RATING = 1;

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

function Details({ products }) {
  const { id, title, price, description, category, image } = products;
  const dispatch = useDispatch();
  const [hasPrime] = useState(Math.random() < 0.5);
  const [clicked, setClicked] = useState(false);
  const [open, setOpen] = useState(false);

  const [rating] = useState(
    Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
  );

  const addItemToBasket = () => {
    const product = {
      id,
      title,
      price,
      description,
      category,
      image,
      hasPrime,
      rating,
    };
    setClicked(true);
    setOpen(true);
    setTimeout(() => setClicked(false), 2000);
    //sending the product as an action to the Redux store ...[basketSlice]
    dispatch(addToBasket(product));
  };

  return (
    <div>
      <Header />
      <main className="max-w-screen-2xl mx-auto">
        <div className="m-5 flex flex-col md:flex-row">
          <div className="flex justify-center md:inline-block mr-8 max-w-xl mb-2">
            <img
              className="h-[400px] sm:h-[500px] md:h-[650px] object-contain py-6 px-4 border rounded-2xl"
              src={image}
            />
          </div>
          <div className="flex flex-col">
            <div>
              <h1 className="text-3xl font-bold">{title}</h1>
              <p className="text-xl font-lg mt-4">Category : {category}</p>
              <div className="flex mt-3">
                {Array(rating)
                  .fill()
                  .map((_, i) => (
                    <StarIcon className="h-5 text-yellow-500" />
                  ))}
              </div>

              <div>
                <div className="flex  items-center space-x-6">
                  <img
                    className=" w-12"
                    loading="lazy"
                    src="/assets/images/prime.png"
                    alt="prime logo"
                  />
                  <p className="text-xs text-gray-500">
                    FREE Next-day Delivery
                  </p>
                </div>
              </div>
            </div>
            <div className="max-w-2xl h-[200px]  mb-3">
              <h1 className="text-2xl font-lg mt-5 mb-3">Description:</h1>
              <h2 className="text-xl">{description}</h2>
            </div>
            <div className="flex   justify-between mx-4 mt-8 border p-5 rounded-2xl">
              <span className="flex  items-center  texl-3xl font-semibold text-red-500 mt-6">
                Price :
                <p className="text-3xl ml-3">
                  <Currency quantity={price} currency="GBP" />
                </p>
              </span>
              <button
                className=" mt-5 button w-[300px] p-3 text-xl"
                onClick={addItemToBasket}
              >
                {clicked ? "Go to Cart" : "Add to Cart"}
                {clicked === "Go to Cart"}
              </button>
            </div>
            <Snackbar
              className="mt-[100px]"
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              open={open}
              autoHideDuration={2000}
            >
              <Alert
                onClose={() => setOpen(false)}
                severity="success"
                style={{
                  fontSize: "20px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                Successfully added to Cart
              </Alert>
            </Snackbar>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Details;

//getting the id's of each product
export const getStaticPaths = async () => {
  const products = await fetch("https://fakestoreapi.com/products").then(
    (res) => res.json()
  );
  const paths = products.map((product) => {
    return {
      params: { id: product.id.toString() },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

//fetch the product data into each page
export const getStaticProps = async (context) => {
  const id = context.params.id;
  const products = await fetch("https://fakestoreapi.com/products/" + id).then(
    (res) => res.json()
  );

  return {
    props: { products },
  };
};
