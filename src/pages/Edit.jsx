import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function Edit() {
    let { id } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [product, setProduct] = useState({
        name: "",
        quantity: "",
        price: "",
        image: ""
    });

    const getProduct = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`https://e-commerce-test-nfi8.onrender.com/api/products/${id}`);
            setProduct({
                name: response.data.name,
                quantity: response.data.quantity,
                price: response.data.price,
                image: response.data.image
            });
            setIsLoading(false);
        } catch (error) {
            toast.error(error.message);
            setIsLoading(false);
        }
    }

    const updateProduct = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await axios.put(`https://e-commerce-test-nfi8.onrender.com/api/products/${id}`, product);
            toast.success(`Produto editado com sucesso`);
            navigate("/");
        } catch (error) {
            toast.error(error.message);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getProduct();
    }, []);

    return (
        <div className="edit-container">
            <h2>Editar Produto</h2>
            <form className="form" onSubmit={updateProduct}>
                    <div className="form-content">
                        <label>Nome</label>
                        <input type="text" value={product.name} required onChange={(e) => setProduct({ ...product, name: e.target.value })} placeholder="Nome do produto" />
                    </div>
                    <div className="form-content">
                        <label>Quantidade</label>
                        <input type="number" value={product.quantity} required onChange={(e) => setProduct({ ...product, quantity: e.target.value })} placeholder="Quantidade do produto" />
                    </div>
                    <div className="form-content">
                        <label>Preço</label>
                        <input type="number" value={product.price} required onChange={(e) => setProduct({ ...product, price: e.target.value })} placeholder="Preço do produto" />
                    </div>
                    <div className="form-content">
                        <label>Imagem</label>
                        <input type="text" value={product.image} required onChange={(e) => setProduct({ ...product, image: e.target.value })} placeholder="Link de imagem" />
                    </div>
                    <div className="form-content">
                        {!isLoading && (<button> Editar </button>)}
                    </div>
            </form>
        </div>
    )
}

export default Edit;