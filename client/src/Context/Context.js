import { createContext, useEffect, useState, useCallback } from "react"


export const CartContext = createContext({
    cart: [],
    totalQuantity: 0,
    total: 0,
    show: false
})

export const UserContext = createContext({
    userState: {}
});

export const UserProvider = ({children}) => {

    const [userState, setUserState] = useState({})

    const verifyUser = useCallback ( async () => {
        try {
          const verifyReq = {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
          };    
    
          const res = await fetch('/api/usuarios/refreshToken', verifyReq);
          if (res.ok) {
            const data = await res.json();
            
            setUserState( oldValues => {
              return {...oldValues, token: data.token}
            } )
          } else {
            
          setUserState( oldValues => {
            return {...oldValues, token: null}
          })
          }
    
          setTimeout(verifyUser, 5 * 60 * 1000);
        } catch(err) {
          console.log(err)
        } 
      }, [setUserState]);

      const fetchUser = useCallback( async () => {
        const userReq = {
            method: 'GET',
            credentials: 'include',
            headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userState.token}`    
            }
        };

        const resp = await fetch('/api/usuarios/yo', userReq);
        if (resp.ok) {
            const userData = await resp.json()
            setUserState( oldValues => {
                return {...oldValues, details: userData}
            })
        } else {
            if (resp.status === 401) {
                window.location.reload();
            }
            setUserState( oldValues => {
                return {...oldValues, details: null}
            })
        }
      }, [setUserState, userState.token])

      const handleLogOut = async () => {
        try {
            

            const logOutReq = {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userState.token}`
                }
            };

            const resp = await fetch('/api/usuarios/logout', logOutReq);
            if (resp) {
                setUserState( (oldValues) => {
                    return { ...oldValues, details: undefined, token: null}
                })
                window.localStorage.setItem("logout", Date.now())
            }
        } catch (err) {
            console.log(err)
        }
      }

      const syncLogout = useCallback( (event) => {
        if (event.key === "logout") {
          window.location.reload()
        }
      }, [])

    return ( 
        <UserContext.Provider value={{ userState, setUserState, verifyUser, fetchUser, handleLogOut, syncLogout}}>
            {children}
        </UserContext.Provider>
    )
};

export const CartProvider = ({children}) => {

    const [cart, setCart] = useState([])
    const [totalQuantity, setTotalQuantity] = useState(0)
    const [total, setTotal] = useState(0)
    const [show, setShow] = useState(false);
    
    

    const handleShow = () => {
        setShow(true)
    };
    const handleClose = () => {
        setShow(false)
    };


    useEffect(() => {
        const totalQty = getQuantity()
        setTotalQuantity(totalQty) //eslint-disable-next-line
    }, [cart]) 

    useEffect(() => {
        const total = getTotal()
        setTotal(total) //eslint-disable-next-line
    }, [cart]) 
    
    
    const addProduct = (productToAdd, cantidad) => {
        if(isInTheCart(productToAdd._id) === false){
            productToAdd.cantidad = cantidad
            setCart ([...cart, productToAdd])
        } else {
            const itemToUpdate = cart.map( prod => {
                if(prod._id === productToAdd._id) {
                    const productUpdated = {
                        ...prod, cantidad: cantidad
                    }
                    return productUpdated
                } else {
                    return prod
                }
            })
            setCart(itemToUpdate)
        }
    }
    
    const isInTheCart = (id) => {
        return cart.some(product => product._id === id)
    }

    const emptyCart = () => {
        setCart([])
    }

    const getQuantity = () => {
        let accu = 0

        cart.forEach(prod => {
            accu += prod.cantidad
        })

        return accu
    }

    const getTotal = () => {
        let accu = 0

        cart.forEach(prod => {
            accu += prod.cantidad * prod.precio
        })
        return accu
    }

    const getQuantityOfProduct = (id) => {
        const product = cart.find(prod => prod._id === id)

        return product?.cantidad
    }

    const removeItem = (id) => {
        const cartWhithoutProduct = cart.filter( prod => prod._id !== id )
            setCart(cartWhithoutProduct)
        }


    return (
        <CartContext.Provider value={{ show, handleClose, handleShow, cart, emptyCart, removeItem, addProduct, getQuantityOfProduct, totalQuantity, total }} >
            {children}
        </CartContext.Provider>
    )
}