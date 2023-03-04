import './Footer.css';


const Footer = () => {

    return(
        <footer className="foo__bckg d-flex justify-content-around align-items-center">
            <div>
                <p>Av. Manuel Belgrano 3500</p>
                <p>Telefóno: +54 9 381234567</p>
                <p>SMT - Tucumán - Argentina</p>
            </div>
            <div className="vr"></div>
            <img src='/images/logo.jpg' alt='Punto verde logo.'></img>
            <div className="vr"></div>
            <div className='foo__info-dev'>
                <p>Powered by: Arquez</p>
                <p>2023</p>
            </div>
        </footer>
    )
};

export default Footer;