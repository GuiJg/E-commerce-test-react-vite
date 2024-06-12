import { Link } from "react-router-dom";
import { useShopCartContext } from "../../hooks/useShopCartContext";
import toast from "react-hot-toast";

const ShopCart = () => {
    const { shopCartProducts, setShopCartProducts } = useShopCartContext();

    const removeFromCart = (id) => {
        const index = shopCartProducts.findIndex(product => product._id === id);
        if (index !== -1) {
            const newCart = [...shopCartProducts.slice(0, index), ...shopCartProducts.slice(index + 1)];
            setShopCartProducts(newCart);
            toast.success("Item removido do carrinho");
        }
    };

    if (shopCartProducts.length === 0) {
        return (
            <div className="empty-cart">
                <h1>O seu carrinho está vazio.</h1>
                <Link to="/" className="button-homepage">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="#fff" d="M17 18c-1.11 0-2 .89-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2M1 2v2h2l3.6 7.59l-1.36 2.45c-.15.28-.24.61-.24.96a2 2 0 0 0 2 2h12v-2H7.42a.25.25 0 0 1-.25-.25q0-.075.03-.12L8.1 13h7.45c.75 0 1.41-.42 1.75-1.03l3.58-6.47c.07-.16.12-.33.12-.5a1 1 0 0 0-1-1H5.21l-.94-2M7 18c-1.11 0-2 .89-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2"></path></svg>
                    <span>continuar comprando</span>
                </Link>
            </div>
        );
    }

    return (
        <div className="cart-main">
            {shopCartProducts.map(data => (
                <div className='item-cart' key={data._id}>
                    <div className="info-products">
                        <img src={data.image} alt={data.title} />
                        {data.title}
                        <p>R${data.unit_price}</p>
                    </div>
                    <div className="button-container">
                        <button onClick={() => removeFromCart(data._id)} className="button-remove">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="#f43e3e" d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"></path></svg>
                        </button>
                    </div>
                </div>
            ))}
            <div className="action-buttons">
            </div>
        </div>
    );
};

export default ShopCart;