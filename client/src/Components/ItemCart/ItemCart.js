import { useContext } from "react";
import { CartContext } from "../../Context/Context";


const ItemCart = ({ _id, producto, cantidad, precio }) => {

    const { removeItem } = useContext(CartContext);


    return (
        <div className='cartItem d-flex justify-content-between align-items-center' style={{ widh:"100%", height:"100px" }}>
            <header className="cartItem__header">
                <h2>{producto}</h2>
            </header>
            <article className="cartItem__info">
                <section>
                    <p>Cantidad:{cantidad}</p>
                </section>
                <section>
                    <p>Subotal: ${precio * cantidad}</p>
                </section>
            </article>
            <footer>
                <button className="buttonCartItem" onClick={() => {removeItem(_id)}}>Quitar</button>
            </footer>
        </div>
    )
}

export default ItemCart;