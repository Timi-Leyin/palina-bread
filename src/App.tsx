import { Fragment, useEffect, useState } from "react";
import Cart from "./Cart";
import Product from "./Product";

function App() {
  const PAYSTACK_API_KEY = "sk_live_17c4953617a34752fa8302e8952b5fba9fc05d83";
  const PAYSTACK_API_URL = "https://api.paystack.co/product";
  const [products, setProducts] = useState<any>([]);
  const [carts, setCart] = useState<any>([]);
  const [openCart, setOpenCart] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResult] = useState([])
  const Search = (value) => {
    const filteredComponents = products.filter((component) =>
      component.name.toLowerCase().includes(value.toLowerCase())
    );
    setResult(filteredComponents)
  };

  const removeFromCart = (product) => {
    const existingItem = carts.find((item) => item.id === product.id);

    if (existingItem && existingItem.quantity === 1) {
      setCart(carts.filter((item) => item.product.id !== product.id));
    } else if (existingItem) {
      setCart(
        carts.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    }
  };

  const total = carts.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const fetchProduct = () => {
    fetch(PAYSTACK_API_URL, {
      headers: {
        Authorization: `Bearer ${PAYSTACK_API_KEY}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.data);
      });
  };

  useEffect(() => {
    fetchProduct();
  }, []);
  return (
    <Fragment>
      <>
        <header id="main-header">
          <div>
            <a href="mailto:paliniabread101@gmail.com" className="contact">
              <h4>Contact Seller</h4>
              <span className="fa fa-envelope" />
            </a>
          </div>

          <div className="">
            <h1 className="h1">Palinia Bread</h1>
            <h3>BY PALINIA BREAD</h3>
            <h4>Welcome to Palinia Bread</h4>
          </div>

          <div className="cart-icon" onClick={() => setOpenCart(true)}>
            <div className="fa fa-shopping-bag"></div>
            <p>
              {carts.reduce((sum, current) => {
                sum += current.quantity;
                return sum;
              }, 0)}
            </p>
          </div>
        </header>

        <div className="search-wrapper">
          <div className="search-box">
            <label htmlFor="search" className="fa fa-search"></label>
            <input
              type="search"
              onChange={(e) => {
                // setSearchTerm(e.target.value)
                Search(e.target.value)
              }}
              name="search"
              placeholder="Search for a Product"
            />
          </div>
        </div>

        <ul id="products-list">
          {
            searchTerm.match(/$\s+/i) ? products.map((product: any, i: number) => {
              // console.log(carts)
              return (
                <Product
                  openCart={setOpenCart}
                  _product={product}
                  key={i}
                  setCart={setCart}
                  carts={carts}
                />
              );
            }) : results.length > 0 ? results.map((product: any, i: number) => {
              // console.log(carts)
              return (
                <Product
                  openCart={setOpenCart}
                  _product={product}
                  key={i}
                  setCart={setCart}
                  carts={carts}
                />
              );
            }) : "No Products Matched"
          }
        </ul>
      </>
      {openCart && (
        <Cart
          setCart={setCart}
          close={() => setOpenCart(false)}
          carts={carts}
        />
      )}
    </Fragment>
  );
}

export default App;
