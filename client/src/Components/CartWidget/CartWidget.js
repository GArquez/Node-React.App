import { useContext } from 'react';
import { CartContext } from '../../Context/Context';

const CartWidget = () => {

    const { totalQuantity, handleShow } = useContext(CartContext);

    return (
        
        <button
        style = {{
            display: "flex",
            alignItems: "center",
            color: "black",
            textDecoration: "none",
            border: "none",
            backgroundColor: "rgba(var(--bs-light-rgb),var(--bs-bg-opacity))"
        }}
        onClick={ handleShow }
        >
            <img 
            src = '/images/Cart.svg'
            alt = 'CartWidget'
            />
            {totalQuantity}
        </button>
        
    )
}

export default CartWidget;