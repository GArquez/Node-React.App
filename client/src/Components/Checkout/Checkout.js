import { useContext, useState } from "react";
import { CartContext, UserContext } from "../../Context/Context";

const Checkout = () => {
    const {cart, total, emptyCart} = useContext(CartContext);
    const {userState} = useContext(UserContext);
    console.log(userState)

    const createOrder = async () => {
        try {

            const order = {
                nombre: userState.details.name,
                email: userState.details.email,
                items: cart,
                total
            }
            const postReq = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json',
                            Authorization: `Bearer ${userState.token}`  
                        },
                body: JSON.stringify(order)
            };

            const postOrder = await fetch('/api/ordenes/ordenar', postReq)                 
            if (postOrder.status === 200) {
                const resp = await postOrder.json()
                emptyCart()
                alert(`Listo! el ID de su orden es: ${resp._id} `)
            } else if (postOrder.status === 403) {
                const productsNoStock = postOrder.body.map(item => item.producto)
                alert('Hay productos fuera de stock', `${productsNoStock}`)
            } else {
                alert('Intente de nuevo.')
            }
        } catch (error) {
            console.log(error)
            alert('Intente de nuevo.')
        }
    };

    return(
        <div className='containerCheck d-flex flex-direction-column align-items-center justify-content-evenly' style={{ height:"650px" }} >
            <h1>Checkout</h1>
            <button className="containerCheck__bt" onClick={createOrder}>Enviar Orden</button>
        </div>
    )
}

export default Checkout;