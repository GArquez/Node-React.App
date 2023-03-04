import { useContext, useState, useEffect } from "react";
import { CartContext, UserContext } from "../../Context/Context";

const Checkout = () => {
    const {cart, total, emptyCart} = useContext(CartContext);
    const {userState} = useContext(UserContext);
    const [productsToCompare, setProductsToCompare] = useState([])

    useEffect(() => {
        async function productsCompare () {
            try{

                const responseProducts = await fetch('api/productos');
                const productsDb = await responseProducts.json()

                const itemsIds = cart.map( prod => prod._id);
                productsDb.map( prod => prod._id === itemsIds)
                
                setProductsToCompare(productsDb);
            } catch (err) {
                console.log(err)
            } finally {

            }
        }
        productsCompare()
    }, [cart]);

    const createOrder = async () => {
        try {

            const order = {
                comprador: {
                    nombre: userState.details.nombre,
                    email: userState.details.email,
                },
                items: cart,
                total
            }

            let noStock = []

            productsToCompare.forEach( doc => {

                const stockDb = doc.stock

                const productsAddedCart = cart.find( prod => prod._id === doc._id)
                const quantityProducts = productsAddedCart?.cantidad
                if(stockDb >= quantityProducts) {
                    doc.stock = stockDb - quantityProducts
                } else {
                    noStock.push({ id: doc._id, ...doc})
                }
            });
            if(noStock.length === 0) {
                const postReq = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(order)
                };

                await fetch('/api/ordenes', postReq)                

                emptyCart()
                alert(`Listo! el ID de su orden es: `)
            } else {
                alert('Hay productos fuera de stock')
            }

        } catch (error) {
            console.log(error)
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