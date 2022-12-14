import { useEffect, useState } from 'react'
import MenuItem from './components/MenuItem'
import './Cart.css'
import CartItem from './components/CartItem'
import { toUSD } from './utilities/toUSD'

const currencySettings = { style: 'currency', currency: 'USD', maximumSignificantDigits: 3}
export const currencyFormat = new Intl.NumberFormat('en-US', currencySettings)


function Cart() {
  const [menuItems, setMenuItems] = useState([
    {
      name: 'French Fries with Ketchup',
      price: 223,
      image: 'plate__french-fries.png',
      alt: 'French Fries',
      count: 2
    },
    {
        name: 'Salmon and Vegetables',
        price: 512,
        image: 'plate__salmon-vegetables.png',
        alt: 'Salmon and Vegetables',
        count: 0
    },
    {
        name: 'Spaghetti Meat Sauce',
        price: 782,
        image: 'plate__spaghetti-meat-sauce.png',
        alt: 'Spaghetti with Meat Sauce',
        count: 0
    },
    {
        name: 'Bacon, Eggs, and Toast',
        price: 599,
        image: 'plate__bacon-eggs.png',
        alt: 'Bacon, Eggs, and Toast',
        count: 0
    },
    {
        name: 'Chicken Salad with Parmesan',
        price: 698,
        image: 'plate__chicken-salad.png',
        alt: 'Chicken Salad with Parmesan',
        count: 0
    },
    {
        name: 'Fish Sticks and Fries',
        price: 634,
        image: 'plate__fish-sticks-fries.png',
        alt: 'Fish Sticks and Fries',
        count: 1
    }
  ])


  const addToCartFn = (name :string) => {
    setMenuItems(menuItems.map((item) => {
      if (item.name === name) {
        return {
          ...item,
          count: item.count + 1
        }
      }
      return item
    }))
  }

  const minusItemFn = (name :string) => {
    setMenuItems(menuItems.map((item) => {
      if (item.name === name) {
        return {
          ...item,
          count: item.count - 1
        }
      }
      return item
    }))
  }

  const plusItemFn = (name :string) => {
    setMenuItems(menuItems.map((item) => {
      if (item.name === name) {
        return {
          ...item,
          count: item.count + 1
        }
      }
      return item
    }))
  }

  const [subtotal, setSubtotal] = useState(0)
  const [tax, setTax] = useState(0)
  const taxRate = 0.16
  
  useEffect(() => {
    setSubtotal(menuItems.reduce((acc, current) => {
      return acc + (toUSD(current.price) * current.count)
    }, 0))
    setTax(subtotal * taxRate)
  })


  return (
    <body>
      <div className="wrapper menu"> 
        <div className="panel">
          <h1>To Go Menu</h1>
          <ul className="menu">
            {menuItems.map((item) => (
              <MenuItem name={item.name} price={item.price} image={item.image} alt={item.alt} count={item.count} onAddToCart={addToCartFn} />
            ))}
          </ul>
        </div>

        <div className="panel cart">
          <h1>Your Cart</h1>
          {
            menuItems.reduce((acc, current) => {
              return acc + current.count
            }, 0) === 0 ? (
              <p className="empty">Your cart is empty.</p>
            ) : (
              null
            )
          }

          <ul className="cart-summary">

            {/* <!-- cart --> */}
            {
              menuItems.map((item) => (
                item.count > 0 ? (
                <CartItem name={item.name} price={item.price} image={item.image} alt={item.alt} count={item.count} onMinusItem={minusItemFn} onPlusItem={plusItemFn}/>
                ) : (
                  null
                )
              ))
            }
          </ul>

          <div className="totals">
            <div className="line-item">
              <div className="label">Subtotal:</div>
              <div className="amount price subtotal">{currencyFormat.format(subtotal)}</div>
            </div>
            <div className="line-item">
              <div className="label">Tax:</div>
              <div className="amount price tax">{currencyFormat.format(tax)}</div>
            </div>
            <div className="line-item total">
              <div className="label">Total:</div>
              <div className="amount price total">{currencyFormat.format(subtotal + tax)}</div>
            </div>
          </div>
        </div>
      </div>
    </body>
  )
}

export default Cart
