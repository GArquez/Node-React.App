import { useContext, useState } from "react"
import { UserContext } from "../../Context/Context"
import './Counter.css'

const Counter = ({ stock, onAdd, initial = 1 }) => {

    
    const [cantidad, setCantidad] = useState(initial)
    const {userState} = useContext(UserContext)

    const sumar = () => {
        if (cantidad < stock) {
            setCantidad(cantidad + 1)
        }
    }

    const restar = () => {
        if (cantidad > 1) {
            setCantidad(cantidad - 1)
        }
    }

    return userState.token ? (
        <div className='Counter'>          
            <div className='Controls'>
                <button className="Button" onClick={restar}>-</button>
                <h4 className='Number'>{cantidad}</h4>
                <button className="Button" onClick={sumar}>+</button>
            </div>
            <div>
                <button className="Button" onClick={() => onAdd(cantidad)}>Agregar al carrito</button>
            </div>
       </div>
    )
    :
    (
        <div>
            <p>Necesitas iniciar sesion para comprar.</p>
        </div>
    )
}

export default Counter;