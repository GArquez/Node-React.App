import { Link } from 'react-router-dom';
import './Main.css';

const Main = () => {

    return (
        <div className="main__hero">
            <div className='main__title'>
                <strong> Punto Verde, <br></br> calidad directo desde el campo...</strong>
                <Link to={'/productos'} className="goToAction btn btn-outline-light">Ir a la tienda</Link>
            </div>
            <div className='main__img'>
                <img src='/images/logo.jpg' alt='Punto verde logo.' />
            </div>
        </div>
    )
};

export default Main;