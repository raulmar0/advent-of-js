import { currencyFormat } from "../Cart";
import { toUSD } from "../utilities/toUSD";

function CartItem({ ...props }) {
  const imageMainPath = './cart-assets/img/';

  return (
    <li>
      <div className="plate">
        <img src={imageMainPath+props.image} alt={props.alt} className="plate" />
        <div className="quantity">{props.count}</div>
      </div>
      <div className="content">
        <p className="menu-item">{props.name}</p>
        <p className="price">{currencyFormat.format(toUSD(props.price))}</p>
      </div>
      <div className="quantity__wrapper">
        <button onClick={() => props.onMinusItem(props.name)} className="decrease">
          <img src={imageMainPath+'chevron.svg'} />
        </button>
        <div className="quantity">{props.count}</div>
        <button onClick={() => props.onPlusItem(props.name)} className="increase">
          <img src={imageMainPath+'chevron.svg'} />
        </button>
      </div>
      <div className="subtotal">
        {currencyFormat.format(toUSD(props.price) * props.count)}
      </div>
    </li>
  )
}

export default CartItem;