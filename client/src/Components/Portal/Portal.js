import { useEffect, useContext } from "react";
import { UserContext } from "../../Context/Context";
import { Link, useNavigate } from "react-router-dom";
import './Portal.css'

const Portal = () => {
    const {userState, fetchUser, handleLogOut} = useContext(UserContext);
    const navigation = useNavigate()

    useEffect( () => {
        if(!userState.details) {
            fetchUser()
        }
    }, [userState.details, fetchUser]);

    const logOut = () => {
        handleLogOut()
        navigation('/')
    }

    return userState.details === null ? 
    (
        <h1>"Error loading user details."</h1>
    ) : !userState.details ?
    (
        
        <div className="d-flex justify-content-center align-items-center" style={{ "height": "650px" }}>
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    ) : 
    (
        <div className="user-details">
            <div className="user-details--user">
                <p>¡Bienvenido, <br/><strong>{userState.details.name}</strong>!</p>
            </div>
            <div className="vr"></div>
            <div className="user-actions">    
                <h2>¿Qué queres hacer?</h2>          
                <button onClick={logOut} intent="primary"className="btn btn-outline-light">
                    Cerrar sesion
                </button>
                <Link to={'/productos'} className="btn btn-outline-success">Ir a la tienda</Link>
                { 
                userState.details.isAdmin ? 
                <Link to={'/portal/dashboard'} className="btn btn-outline-success">
                    Dashboard
                </Link>
                :
                <Link to={'/portal/ordenes'} className="btn btn-outline-success">
                    Ver tus ordenes
                </Link>
                }
            </div>
        </div>
    )
};

export default Portal;