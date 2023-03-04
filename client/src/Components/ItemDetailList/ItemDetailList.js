import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ItemDetail from '../ItemDetail/ItemDetail';

const ItemDetailList = () => {
    const [productId, setProductId] = useState([])
    const [loader, setLoader] = useState(true)
    
    const {productForId} = useParams()

    useEffect( () => {
        async function fetchData () {
            try {
                setLoader(true)
            
                const response = await fetch('/api/productos');
                const data = await response.json()
                
                const productIdFound = data.find( el => el._id === productForId);
                setProductId(productIdFound);
                
            } catch(err) {
                console.log(err)
            }
            finally {
                setLoader(false)
            }
        };
        fetchData();
    }, [productForId]);


    if (loader) {
        return <div className="d-flex justify-content-center align-items-center" style={{ "height": "650px" }}>
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
    }

    return(
        <main>
            <ItemDetail {...productId} />
        </main>
    )
}

export default ItemDetailList;