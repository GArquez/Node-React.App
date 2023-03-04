import { Link } from "react-router-dom";
import './Item.css'

const Item = ({_id, producto, precio, img}) => {

    return(
        <div className="card" style={{"width": "18rem"}}>
            <div className="card__container-img">
                <img src={img} className="card-img-top" alt={img} />
            </div>
            <div className="card-body">
                <h5 className="card-title">{producto}</h5>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">${precio}</li>
            </ul>
            <div className="card-body">
                <Link to={`/detalle/${_id}`} className="card-link" style={{ textDecoration: "none" }}>Ver producto</Link>
            </div>
        </div>
    )
}

export default Item;