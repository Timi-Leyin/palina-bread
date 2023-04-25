import React, { useEffect, useState } from "react";
import { PaystackButton } from "react-paystack";
const CartItem = ({ item, carts, setCart }) => {

  const deleteFromCart = (product)=>{
    const filteredComponents = carts.filter((component) =>
      component.product.id != product.id
    );
    
    setCart(filteredComponents)
  }


  const addToCart = (product) => {
    const existingItem = carts.find((item) => item.product.id === product.id);
    console.log(existingItem);
    if (existingItem) {
      setCart(
        carts.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...carts, { product, quantity: 1 }]);
    }
  };

  const removeFromCart = (product) => {
    const existingItem = carts.find((citem) => citem.product.id === product.id);
    // console.log(existingItem);
    if (existingItem && existingItem.quantity === 1) {
      setCart(carts.filter((citem) => citem.product.id !== product.id));
    } else if (existingItem) {
      setCart(
        carts.map((citem) =>
          citem.product.id === product.id
            ? { ...citem, quantity: item.quantity - 1 }
            : citem
        )
      );
    }
  };

  return (
    <>
      <div className="cart-item">
        <div className="item-lt">
          <img src={item.product.files[0].path} width={60} height={30} alt="" />
          <div className="">
            <h4>{item.product.name}</h4>
            <h5>NGN {item.product.price / 100}</h5>
          </div>
        </div>

        <div className="item-rt">
          {/* Q: {item.quantity} */}
          <div className="quantity-btn">
            <span
              className="fa fa-minus"
              onClick={() => removeFromCart(item.product)}
            ></span>
            <span className="q">{item.quantity}</span>
            <span className="fa fa-plus" 
            onClick={()=> addToCart(item.product) }></span>
          </div>
          <div
            onClick={() => deleteFromCart(item.product)}
            className="fa fa-trash"
          />
        </div>
      </div>
    </>
  );
};

const Cart = ({ close, carts, setCart }) => {
  let [sum, setSum] = useState(0);
  const [checkout, setCheckout] = useState(false);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  useEffect(() => {
    // let eqsum = 0;
    const eqsum = carts.reduce((sum, current) => {
      sum += current.product.price * current.quantity;
      return sum;
    }, 0);
    setSum(eqsum);
    // console.log(eqsum)
  }, [carts]);
  const publicKey = "pk_live_148efb0d49265c558c5d40a42af53ffdb92b4d4b";

  const componentProps = {
    email,
    className: "checkout-btn",
    type: "submit",
    amount: sum,
    // ref: Math.floor(Math.random() * 1000000000) + 1,
    metadata: {
      custom_fields: [
        {
          display_name: "Email Address",
          variable_name: "email",
          value: email,
        },
        {
          display_name: "Delivery Address",
          variable_name: "delivery_Address",
          value: address,
        },
        {
          display_name: "Phone",
          variable_name: "phone_number",
          value: phone,
        },
        {
          display_name: "Products",
          variable_name: "products",
          value: carts,
        },
      ],
    },
    publicKey,
    text: "Pay Now",
    onSuccess: () =>
      alert("Thanks for doing business with us! Come back soon!!"),
    onClose: () => alert("Wait! Don't leave :("),
  };
  function payForProduct(carts, totalAmount = sum) {}

  return (
    <section id="cart">
      <div className="overlay" onClick={close}></div>
      {!checkout ? (
        <>
          <div className="content">
            <div className="summary_header">
              <div className="summary_cart">
                <span className="fa fa-shopping-bag"></span>
                <span>
                  {carts.reduce((sum, current) => {
                    sum += current.quantity;
                    return sum;
                  }, 0)}
                </span>
              </div>

              <div>
                <h2>
                  NGN{" "}
                  {carts.reduce((sum, current) => {
                    sum += (current.product.price / 100) * current.quantity;
                    return sum;
                  }, 0)}
                </h2>
                <h4>Shipping: NGN 0</h4>
              </div>
            </div>

            <hr />

            <div className="carts">
              {carts.map((cart, i) => (
                <CartItem carts={carts} setCart={setCart} item={cart} key={i} />
              ))}
            </div>

            {carts.length > 0 ? (
              <button
                className="checkout-btn"
                onClick={() => setCheckout(true)}
              >
                Checkout
              </button>
            ) : (
              <h4 className="no-item">No Items in Cart</h4>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="content">
            <div className="summary_header">
              <div className="summary_cart">
                <span className="fa fa-shopping-bag"></span>
                <span>
                  {carts.reduce((sum, current) => {
                    sum += current.quantity;
                    return sum;
                  }, 0)}
                </span>
              </div>

              <div>
                <h2>
                  NGN{" "}
                  {carts.reduce((sum, current) => {
                    sum += (current.product.price / 100) * current.quantity;
                    return sum;
                  }, 0)}
                </h2>
                <h4>Shipping: NGN 0</h4>
              </div>
            </div>

            <hr />

            <form
              onSubmit={(e: any) => {
                e.preventDefault();
                console.log("Submitted");
                console.log(address, email, phone);
                // setEmail(email.value)
                // setPhone(phone.value)
              }}
              className="input-groups"
            >
              <div className="input">
                <label htmlFor="">Full Delivery Address</label>
                <input
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Delivery Address"
                  name="address"
                  id="address"
                  required
                />
              </div>

              <div className="input">
                <label htmlFor="">Email</label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  required
                  name="email"
                  id="email"
                  type={"email"}
                />
              </div>

              <div className="input">
                <label htmlFor="">Phone Number</label>
                <input
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone Number"
                  required
                  name="phone"
                  id="phone"
                  type={"tel"}
                />
              </div>

              <div className="btn-groups">
                {email.length > 5 && address.length > 3 && phone.length > 6 && (
                  <PaystackButton {...componentProps} />
                )}
                {/* <button type="submit" className="checkout-btn">
                  Pay
                </button> */}
                <button className="back-btn" onClick={() => setCheckout(false)}>
                  Back
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </section>
  );
};

export default Cart;
