import { useEffect, useState } from "react";
import './ItemsContainer.css';
import ItemList from '../ItemList/ItemList'
import { useParams } from "react-router-dom";


const ItemsContainer = () => {

    const [ products, setProducts] = useState([]);
    const [ loader, setLoader] = useState(true);

    const { category } = useParams();
    useEffect( () => {
        async function fetchData () {
            try {
                setLoader(true)
            
                const response = await fetch('/api/productos');
                const data = await response.json()

                if(category){
                    const productsFilter = data.filter( el => el.categoria === category);
                    setProducts(productsFilter);
                } else {
                    setProducts(data)
                }
            } catch(err) {
                console.log(err)
            }
            finally {
                setLoader(false)
            }
        };
        fetchData();
    }, [category]);


    if (loader) {
        return <div className="d-flex justify-content-center align-items-center" style={{ "height": "650px" }}>
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
    };

    return(
        <main className="itemsContainer">
            <ItemList products={products} />
        </main>
    )
}

export default ItemsContainer;