import { useEffect, useState } from "react"
// import { NavLink } from "react-router-dom"
import Modal from "./Modal"
import axios from "axios"

const Main = () => {
    const [dado, setDado] = useState([])
    const [isOpen, setIsOpen] = useState(false);

    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const saveProduct = async(e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const response = await axios.post("https://e-commerce-test-nfi8.onrender.com/api/products", {name: name, quantity: quantity, price: price, image: image});
            alert(`Save ${response.data.name} sucessfully`);
            setIsLoading(false); 
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetch("https://e-commerce-test-nfi8.onrender.com/api/products")
            .then(res => res.json())
            .then(data => setDado(data))
    }, [])

    return (
        <main>
            <div className="banner-video">
                <video id="banner-video" autoPlay muted loop playsInline>
                    <source src="https://videos.pexels.com/video-files/6769802/6769802-uhd_3840_2160_24fps.mp4" type="video/mp4" />
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
            <button onClick={() => setIsOpen(true)}>Inserir Produto</button>
            <form className="create-page" onSubmit={saveProduct}>

                <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                    <h1>Inserindo um produto novo</h1>
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
                        {!isLoading}
                        <button> Salvar </button>
                    </div>
                </Modal>
            </form>
            <div className="container-item">
                {dado.map(data => (
                    <div className="item" key={data._id}>
                        <img src={data.image} alt={data.name} />
                        <div className="item-content">
                            <div className="item-price">
                                <p>{data.name}</p>
                                <span>
                                    R${data.price},99
                                    {/* <p>Quantidade: {data.quantity}</p> */}
                                </span>
                                <div className="button">
                                    <button className="card-btn">
                                        Comprar
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </main>
    )
}

export default Main