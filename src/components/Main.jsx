import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { PuffLoader } from "react-spinners";
import Sweet from "sweetalert2";
import axios from "axios";
import Modal from "./ModalSaveProduct";
import { VITE_DATABASE_URL } from "../App";

const Main = () => {
    const [dado, setDado] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [loading, setLoading] = useState(false);

    const getProduct = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${VITE_DATABASE_URL}/api/products`);
            setDado(response.data);
            setIsLoading(false);
        } catch (error) { 
            toast.error(error.message);
            setIsLoading(false);
        }
    };

    const saveProduct = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const response = await axios.post(`${VITE_DATABASE_URL}/api/products`, { name, quantity, price, image });
            toast.success(`${response.data.name} criado com sucesso`);
            setIsLoading(false);
            getProduct();
        } catch (error) {
            toast.error(error.message);
            setIsLoading(false);
        }
    };

    const deleteProduct = async (id) => {
        const result = await Sweet.fire({
            title: "Tem certeza que deseja excluir este item?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Sim, excluir!",
            cancelButtonText: "Cancelar",
        });
        if (result.isConfirmed) {
            try {
                await axios.delete(`${VITE_DATABASE_URL}/api/products/${id}`);
                getProduct();
                toast.success("Produto deletado com sucesso");
            } catch (error) {
                toast.error(error.message);
            }
        }
    };

    const handleLoading = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2500); // 1500ms = 1.5s
    };

    const handleClickAll = async (id) => {
        const token = localStorage.getItem("token")

        if (!token) return toast.error("Faça login para comprar!")

        handleLoading(); 
        await createPaymentLink(id); 
    };

    const createPaymentLink = async (id) => {
        try {
            const response = await axios.post(`${VITE_DATABASE_URL}/api/payment/criar-preferencia/${id}`);
            const { sandbox_init_point } = response.data;
            window.location.href = sandbox_init_point; 
        } catch (error) {
            toast.error("Erro ao criar o link de pagamento: " + error.message);
        }
    }

    useEffect(() => {
        getProduct();
    }, []);

    return (
        <main>
            <div className="banner-video">
                <video id="banner-video" autoPlay muted loop playsInline>
                    <source src="https://videos.pexels.com/video-files/7033912/7033912-uhd_3840_2160_25fps.mp4" type="video/mp4" />
                </video>
                <div className="title-banner-video">
                    <h1>
                        oxente cafés especiais,
                        <br />
                        o sabor da paixão nordestina
                    </h1>
                </div>
            </div>
            <div className="title-main">
                <h1>NOSSOS CAFÉS</h1>
                <div className="division"></div>
            </div>
            <button className="button-input" onClick={() => setIsOpen(true)}>Inserir Produto</button>
            <form onSubmit={saveProduct}>
                <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                    <br />
                    <div>
                        <label>Nome</label>
                        <input type="text" value={name} required onChange={(e) => setName(e.target.value)} placeholder="Nome do produto" />
                    </div>
                    <div>
                        <label>Quantidade</label>
                        <input type="number" value={quantity} required onChange={(e) => setQuantity(e.target.value)} placeholder="Quantidade do produto" />
                    </div>
                    <div>
                        <label>Preço</label>
                        <input type="number" value={price} required onChange={(e) => setPrice(e.target.value)} placeholder="Preço do produto" />
                    </div>
                    <div>
                        <label>Imagem</label>
                        <input type="text" value={image} required onChange={(e) => setImage(e.target.value)} placeholder="Link de imagem" />
                    </div>
                    <div>
                        {!isLoading && (<button> Salvar </button>)}
                    </div>
                </Modal>
            </form>
            {
                loading && (
                    <div className="container-loader" loading={loading}>
                        <PuffLoader
                            className="loader"
                            color={"#fff"}
                            loading={loading}
                            size={100}
                            aria-label="Loading Spinner"
                            data-testid="Loader"
                        />
                    </div>
                )
            }
            <div className="container-item">
                {dado.map(data => (
                    <div className="item" key={data._id}>
                        <img src={data.image} alt={data.name} />
                        <div className="item-content">
                            <div className="item-price">
                                <p>{data.name}</p>
                                <span>
                                    R${data.price}
                                    {/* <p>Quantidade: {data.quantity}</p> */}
                                </span>
                                <div className="buttons">
                                    <button onClick={() => handleClickAll(data._id)} className="card-btn">Comprar</button>
                                    <Link to={`/editar/${data._id}`} className="card-btn" id="edit-btn">Editar</Link>
                                    <button onClick={() => deleteProduct(data._id)} className="card-btn" id="delete-btn">Deletar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
};

export default Main;
