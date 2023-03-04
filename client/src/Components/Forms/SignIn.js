import { useState, useContext } from 'react';
import './SignIn.css';
import { UserContext } from '../../Context/Context';
import { useNavigate } from "react-router-dom";

const SignIn = () => {

    const  {setUserState}  = useContext(UserContext);
    const navigate = useNavigate();

    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    
    const formSignIn = async (e) => {
        try {
            
            e.preventDefault()
            
            const postReq = {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                body: JSON.stringify(
                    user
                )
            };
            
            const logIn = await fetch('/api/usuarios/login', postReq)
            if (!logIn.ok) {
                if (logIn.status === 400) {
                    console.log('Please, put all the fields correctly')
                }
                if (logIn.status === 401) {
                    console.log('Invalid email and password combination')
                }
                console.log('Something was wrong. Try again later')
            }
            const data = await logIn.json()
            setUserState( oldValues => { return { ...oldValues, token: data.token } } )
            navigate('/portal')
            
        } catch (err) {
            console.log(err)
        }
    };

    return(
        <main className="signIn d-flex align-items-center">
            <form className="col-lg-4 signIn__form" onSubmit={formSignIn}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"  value={user.email} onChange={e => setUser({...user, email: e.target.value})} />
                    <div id="emailHelp" className="form-text">Nunca compartiremos tu email con otros.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Contraseña</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" value={user.password} onChange={e => setUser({...user, password: e.target.value})}/>
                </div>
                <button type="submit" className="btn btn-primary">Ingresar</button>
            </form>
            <div className="signIn__img col-lg-8" ></div>
        </main>
    )
}

export default SignIn;