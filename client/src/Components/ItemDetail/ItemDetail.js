import './ItemDetail.css';
import Counter from '../Counter/Counter';
import { CartContext, UserContext } from '../../Context/Context';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

const ItemDetail = ({ _id, producto, stock, categoria, descripcion, precio, img }) => {

    const { addProduct, getQuantityOfProduct } = useContext(CartContext)
    const {userState} = useContext(UserContext)

    const quantitySelected = getQuantityOfProduct(_id)

    const handleAdd = (cantidad) => {
        const productToAdd = {
            _id, producto, precio, cantidad
        }

        addProduct(productToAdd, cantidad)
    }

    return (
        <div className="detailContainer">
            <div className="detailContainer-img"> <img src={img} alt={img} /> </div>
            <div className="detailContainer-info">
                <div>
                    <div className='detailContainer-info--tag1'><h1>Producto</h1><p>{categoria}</p></div>
                    <hr></hr>
                    <strong>{producto}</strong>
                </div>
                <div>
                    <h2>Descripcion</h2>
                    <hr></hr>
                    <strong>{descripcion}</strong>
                </div>
                <div>
                    <h5>Precio</h5>
                    <hr></hr>
                    <p>${precio}</p>
                </div>
                <Counter stock={stock} onAdd={handleAdd} initial={quantitySelected} />
                { userState.token && <Link to={'/checkout'} style={{alignSelf: 'center'}} className="btn btn-outline-success">Confirmar orden</Link>}
            </div>
        </div>
    )
};

export default ItemDetail;