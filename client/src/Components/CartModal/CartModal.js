import { useContext } from "react";
import { CartContext, UserContext } from "../../Context/Context";
import ItemCart from "../ItemCart/ItemCart";
import { Link } from "react-router-dom";


const Cart = () => {

    const { show, handleClose, cart, total, emptyCart, totalQuantity } = useContext(CartContext)
    const {userState} = useContext(UserContext)

    
    if (show) {
        document.body.style.overflow = 'hidden';
        if (totalQuantity === 0) {
            return ( 
                <>
                <div className="modal-backdrop show"></div>
                    <div className="modal show" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ display: "block" }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">      
                                <img 
                                src = '/images/Cart.svg'
                                alt = 'CartWidget'
                                />
                                <button type="button" className="btn-close" onClick={ handleClose }></button>
                            </div>
                            <div className="modal-body">
                                <h1>Carrito vacío</h1>
                            </div>
                            <div className="modal-footer">
                            </div>
                        </div>
                    </div>
                </div>
                </>
             )
            }
        return (
            <>
            <div className="modal-backdrop show"></div>
            <div className="modal show" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ display: "block" }}>
                <div className="modal-dialog modal-dialog-scrollable">
                        <div className="modal-content">
                            <div className="modal-header">
                                <img 
                                    src = '/images/Cart.svg'
                                    alt = 'CartWidget'
                                />
                                <button type="button" className="btn-close" onClick={ handleClose }></button>
                            </div>
                            <div className="modal-body">
                                { cart.map( prod => 
                                    <ItemCart {...prod} key={prod._id} />
                                ) }
                                <h6 style={{ alignSelf: "center" }}>Total: ${total}</h6>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={ () => {emptyCart()} }>Vaciar carrito</button>
                                { cart.length > 0 && userState.token && <Link to={'/checkout'} className="btn btn-secondary">Confirmar orden</Link>}               
                            </div>
                        </div>
                </div>
            </div>
            </>
        )
    }
    document.body.style.overflow = 'unset';
};

export default Cart;