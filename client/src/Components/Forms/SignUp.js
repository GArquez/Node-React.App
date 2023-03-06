import { useState, useContext } from 'react';
import { UserContext } from '../../Context/Context';
import './SignUp.css'
import { useNavigate } from 'react-router-dom';

const SignUp = () => { 
    const  {setUserState} = useContext(UserContext);

    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        confirmPssw: ''   
    });

    const formSignUp = async (e) => {
        try {
            e.preventDefault()
    
            const postReq = {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                body: JSON.stringify(user)
            };
            const signUp = await fetch('/api/usuarios/registrarse', postReq)
            if (!signUp.ok) {
                if (signUp.status === 400) {
                    console.log('Please, put all the fields correctly')
                }
                if (signUp.status === 401) {
                    console.log('Invalid email and password combination')
                }
                if(signUp.status === 500) {
                    console.log('Server error')
                }
                console.log('Something was wrong. Try again later')
            }
            const data = await signUp.json()
            setUserState( oldValues => { return { ...oldValues, token: data.token } } )
            navigate('/portal')
        } catch (err) {
            console.log(err)
        }
    };
    
    return(
        <main className="signUp d-flex align-items-center">
            <div className="signUp__img col-lg-8"></div>
            <form className="col-lg-4 signUp__form" onSubmit={formSignUp}>
                <div className="mb-3">
                    <label htmlFor="exampleInputName" className="form-label">Nombre y apellido</label>
                    <input type="text" className="form-control" id="exampleInputName" value={user.name} onChange={e => setUser({...user, name: e.target.value})}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={user.email} onChange={e => setUser({...user, email: e.target.value})} />
                    <div id="emailHelp" className="form-text">Nunca compartiremos tu email con otros.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Contraseña</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" value={user.password} onChange={e => setUser({...user, password: e.target.value})} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword2" className="form-label">Repetir Contraseña</label>
                    <input type="password" className="form-control" id="exampleInputPassword2" value={user.confirmPssw} onChange={e => setUser({...user, confirmPssw: e.target.value})} />
                </div>
                <button type="submit" className="btn btn-primary">Registrarme</button>
            </form>
        </main>
    )
}

export default SignUp;