import { currencyFormat } from "../Cart";
import { toUSD } from "../utilities/toUSD";

function MenuItem({...props }) {
  const imageMainPath = './cart-assets/img/';
  return (
    <li>
    <div className="plate">
      <img src={imageMainPath+props.image} alt={props.alt} className="plate" />
    </div>
    <div className="content">
      <p className="menu-item">{props.name}</p>
      <p className="price">{currencyFormat.format(toUSD(props.price))}</p>
      {props.count > 0 ? (
        <button className="in-cart">
          <img src={imageMainPath+'check.svg'} alt="Check" />
          In Cart
        </button>
      ) : (
        <button onClick={() => props.onAddToCart(props.name)} className="add">Add to Cart</button>
      )}
    </div>
  </li>
  );
}

export default MenuItem;