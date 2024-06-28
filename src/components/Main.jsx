// Main.js
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { PuffLoader } from 'react-spinners';
// import { Cloudinary } from '@cloudinary/url-gen';
// import { auto } from '@cloudinary/url-gen/actions/resize';
// import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
// import { AdvancedImage } from '@cloudinary/react';
// import { useShopCartContext } from '../../hooks/useShopCartContext';

import Sweet from 'sweetalert2';
import axios from 'axios';
import Modal from './ModalSaveProduct';

const Main = () => {
    const [dado, setDado] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [loading, setLoading] = useState(false);

    const token = localStorage.getItem("token");

    // const { shopCartProducts, setShopCartProducts } = useShopCartContext();

    const VITE_DATABASE_URL = import.meta.env.VITE_DATABASE_URL;
    // const [imageId, setImageId] = useState(null);

    // const cld = new Cloudinary({ cloud: { cloudName: 'dyyopyojy' } });

    // const handleUpload = () => {
    //     window.cloudinary.openUploadWidget(
    //         { cloudName: 'dyyopyojy', uploadPreset: 'your_upload_preset' },
    //         (error, result) => {
    //             if (!error && result && result.event === 'success') {
    //                 setImageId(result.info.public_id);
    //             }
    //         }
    //     );
    // };

    // let img = null;
    // if (imageId) {
    //     img = cld
    //         .image(imageId)
    //         .format('auto')
    //         .quality('auto')
    //         .resize(auto().gravity(autoGravity()).width(500).height(500));
    // }

    const getProduct = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${VITE_DATABASE_URL}/api/products`);
            setDado(response.data);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const saveProduct = async (e) => {
        e.preventDefault();
        if (!token) {
            return toast.error("Faça login para adicionar um item!");
        }
        try {
            setIsLoading(true);
            const response = await axios.post(`${VITE_DATABASE_URL}/api/products`, { name, quantity, price, image });
            toast.success(`${response.data.name} criado com sucesso`);
            getProduct();
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const deleteProduct = async (id) => {
        if (!token) {
            return toast.error("Faça login para deletar um item!");
        }
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
        }, 2500);
    };

    const handleClickAll = async (id) => {
        if (!token) {
            return toast.error("Faça login para comprar!");
        }

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
    };

    useEffect(() => {
        getProduct();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // const addToCart = ({ title, unit_price, image }) => {
    //     if (!token) {
    //         return toast.error("Faça login para comprar!");
    //     }
    //     setShopCartProducts([...shopCartProducts, { title, unit_price, image }]);
    //     return toast.success("Adicionado ao carrinho!");
    // };

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
            <div className="beneficios-track">
                <div className="item-benefits">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="black" strokeLinecap="round" strokeWidth={1.5}><path strokeLinejoin="round" strokeMiterlimit={1.5} d="M8 19a2 2 0 1 0 0-4a2 2 0 0 0 0 4m10 0a2 2 0 1 0 0-4a2 2 0 0 0 0 4"></path><path d="M10.05 17H15V6.6a.6.6 0 0 0-.6-.6H1m4.65 11H3.6a.6.6 0 0 1-.6-.6v-4.9"></path><path strokeLinejoin="round" d="M2 9h4"></path><path d="M15 9h5.61a.6.6 0 0 1 .548.356l1.79 4.028a.6.6 0 0 1 .052.243V16.4a.6.6 0 0 1-.6.6h-1.9M15 17h1"></path></g></svg>
                    <div className="title-benefits">
                        <span>envio expresso</span>
                        <p>entrega rápida e segura</p>
                    </div>
                </div>
                <div className="item-benefits">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="black" d="M11.115 16.479a.93.927 0 0 1-.939-.886c-.002-.042-.006-.155-.103-.155c-.04 0-.074.023-.113.059c-.112.103-.254.206-.46.206a.816.814 0 0 1-.305-.066c-.535-.214-.542-.578-.521-.725c.006-.038.007-.08-.02-.11l-.032-.03h-.034c-.027 0-.055.012-.093.039a.788.786 0 0 1-.454.16a.7.699 0 0 1-.253-.05c-.708-.27-.65-.928-.617-1.126q.008-.062-.03-.092l-.05-.04l-.047.043a.728.726 0 0 1-.505.203a.73.728 0 0 1-.732-.725c0-.4.328-.722.732-.722c.364 0 .675.27.721.63l.026.195l.11-.165c.01-.018.307-.46.852-.46c.102 0 .21.016.316.05c.434.13.508.52.519.68c.008.094.075.1.09.1c.037 0 .064-.024.083-.045a.746.744 0 0 1 .54-.225q.193 0 .402.09c.69.293.379 1.158.374 1.167c-.058.144-.061.207-.005.244l.027.013h.02c.03 0 .07-.014.134-.035c.093-.032.235-.08.367-.08a.944.942 0 0 1 .94.93a.936.934 0 0 1-.94.928m7.302-4.171c-1.138-.98-3.768-3.24-4.481-3.77c-.406-.302-.685-.462-.928-.533a1.559 1.554 0 0 0-.456-.07q-.274 0-.58.095c-.46.145-.918.505-1.362.854l-.023.018c-.414.324-.84.66-1.164.73a1.986 1.98 0 0 1-.43.049c-.362 0-.687-.104-.81-.258q-.03-.037.04-.125l.008-.008l1-1.067c.783-.774 1.525-1.506 3.23-1.545h.085c1.062 0 2.12.469 2.24.524a7 7 0 0 0 3.056.724c1.076 0 2.188-.263 3.354-.795a9.135 9.11 0 0 0-.405-.317c-1.025.44-2.003.66-2.946.66c-.962 0-1.925-.229-2.858-.68c-.05-.022-1.22-.567-2.44-.57q-.049 0-.096.002c-1.434.033-2.24.536-2.782.976c-.528.013-.982.138-1.388.25c-.361.1-.673.186-.979.185c-.125 0-.35-.01-.37-.012c-.35-.01-2.115-.437-3.518-.962q-.213.15-.415.31c1.466.593 3.25 1.053 3.812 1.089c.157.01.323.027.491.027c.372 0 .744-.103 1.104-.203c.213-.059.446-.123.692-.17l-.196.194l-1.017 1.087c-.08.08-.254.294-.14.557a.705.703 0 0 0 .268.292c.243.162.677.27 1.08.271q.23 0 .43-.044c.427-.095.874-.448 1.349-.82c.377-.296.913-.672 1.323-.782a1.494 1.49 0 0 1 .37-.05a.611.61 0 0 1 .095.005c.27.034.533.125 1.003.472c.835.62 4.531 3.815 4.566 3.846c.002.002.238.203.22.537c-.007.186-.11.352-.294.466a.902.9 0 0 1-.484.15a.804.802 0 0 1-.428-.124c-.014-.01-1.28-1.157-1.746-1.543c-.074-.06-.146-.115-.22-.115a.12.12 0 0 0-.096.045c-.073.09.01.212.105.294l1.48 1.47c.002 0 .184.17.204.395q.017.367-.35.606a.957.955 0 0 1-.526.171a.766.764 0 0 1-.42-.127l-.214-.206a21.035 20.978 0 0 0-1.08-1.009c-.072-.058-.148-.112-.221-.112a.13.13 0 0 0-.094.038c-.033.037-.056.103.028.212a.698.696 0 0 0 .075.083l1.078 1.198c.01.01.222.26.024.511l-.038.048a1.18 1.178 0 0 1-.1.096c-.184.15-.43.164-.527.164a.8.798 0 0 1-.147-.012q-.16-.027-.212-.089l-.013-.013c-.06-.06-.602-.609-1.054-.98c-.059-.05-.133-.11-.21-.11a.13.13 0 0 0-.096.042c-.09.096.044.24.1.293l.92 1.003a.2.2 0 0 1-.033.062c-.033.044-.144.155-.479.196a.91.907 0 0 1-.122.007c-.345 0-.712-.164-.902-.264a1.343 1.34 0 0 0 .13-.576a1.368 1.365 0 0 0-1.42-1.357c.024-.342-.025-.99-.697-1.274a1.455 1.452 0 0 0-.575-.125q-.22 0-.42.075a1.153 1.15 0 0 0-.671-.564a1.52 1.515 0 0 0-.494-.085q-.421 0-.767.242a1.168 1.165 0 0 0-.903-.43a1.173 1.17 0 0 0-.82.335c-.287-.217-1.425-.93-4.467-1.613a17.39 17.344 0 0 1-.692-.189a4.822 4.82 0 0 0-.077.494l.67.157c3.108.682 4.136 1.391 4.309 1.525a1.145 1.142 0 0 0-.09.442a1.16 1.158 0 0 0 1.378 1.132c.096.467.406.821.879 1.003a1.165 1.162 0 0 0 .415.08q.135 0 .266-.034c.086.22.282.493.722.668a1.233 1.23 0 0 0 .457.094q.183 0 .355-.063a1.373 1.37 0 0 0 1.269.841c.37.002.726-.147.985-.41c.221.121.688.341 1.163.341q.09.001.175-.01c.47-.059.689-.24.789-.382a.571.57 0 0 0 .048-.078c.11.032.234.058.373.058c.255 0 .501-.086.75-.265c.244-.174.418-.424.444-.637v-.01q.125.026.251.026c.265 0 .527-.082.773-.242c.48-.31.562-.715.554-.98a1.28 1.279 0 0 0 .978-.194a1.04 1.04 0 0 0 .502-.808a1.088 1.085 0 0 0-.16-.653c.804-.342 2.636-1.003 4.795-1.483a4.734 4.721 0 0 0-.067-.492a27.742 27.667 0 0 0-5.049 1.62zm5.123-.763c0 4.027-5.166 7.293-11.537 7.293S.465 15.572.465 11.545S5.63 4.252 12.004 4.252c6.371 0 11.537 3.265 11.537 7.293zm.46.004c0-4.272-5.374-7.755-12-7.755S.002 7.277.002 11.55L0 12.004c0 4.533 4.695 8.203 11.999 8.203c7.347 0 12-3.67 12-8.204z"></path></svg>
                    <div className="title-benefits">
                        <span>parcelamento</span>
                        <p>em até 12x sem juros</p>
                    </div>
                </div>
                <div className="item-benefits">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><path fill="black" d="m235.34 116.72l-96.06-96.06a16 16 0 0 0-22.56 0l-96.06 96.06a16 16 0 0 0 0 22.56l96.06 96.06a16 16 0 0 0 22.56 0l96.06-96.06a16 16 0 0 0 0-22.56M128 32l56 56h-24a8 8 0 0 0-5.66 2.34L128 116.68l-26.34-26.34A8 8 0 0 0 96 88H72Zm-72 72h36.68l24 24l-24 24H56l-24-24Zm72 120l-56-56h24a8 8 0 0 0 5.66-2.34L128 139.31l26.34 26.35A8 8 0 0 0 160 168h24Zm72-72h-36.68l-24-24l24-24H200l24 24Z"></path></svg>
                    <div className="title-benefits">
                        <span>pagamento pix</span>
                        <p>pix com descontos</p>
                    </div>
                </div>
                <div className="item-benefits">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="black" d="M19.05 4.91A9.816 9.816 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91c0-2.65-1.03-5.14-2.9-7.01m-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18l-3.12.82l.83-3.04l-.2-.31a8.264 8.264 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24c2.2 0 4.27.86 5.82 2.42a8.183 8.183 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.22 8.23m4.52-6.16c-.25-.12-1.47-.72-1.69-.81c-.23-.08-.39-.12-.56.12c-.17.25-.64.81-.78.97c-.14.17-.29.19-.54.06c-.25-.12-1.05-.39-1.99-1.23c-.74-.66-1.23-1.47-1.38-1.72c-.14-.25-.02-.38.11-.51c.11-.11.25-.29.37-.43s.17-.25.25-.41c.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31c-.22.25-.86.85-.86 2.07c0 1.22.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74c.59.26 1.05.41 1.41.52c.59.19 1.13.16 1.56.1c.48-.07 1.47-.6 1.67-1.18c.21-.58.21-1.07.14-1.18s-.22-.16-.47-.28"></path></svg>
                    <div className="title-benefits">
                        <span>atendimento</span>
                        <p>fale com especialistas</p>
                    </div>
                </div>
                <div className="item-benefits">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="black" d="M12 13a1.49 1.49 0 0 0-1 2.61V17a1 1 0 0 0 2 0v-1.39A1.49 1.49 0 0 0 12 13m5-4V7A5 5 0 0 0 7 7v2a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-7a3 3 0 0 0-3-3M9 7a3 3 0 0 1 6 0v2H9Zm9 12a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1Z"></path></svg>
                    <div className="title-benefits">
                        <span>segurança</span>
                        <p>compre com tranquilidade</p>
                    </div>
                </div>
            </div>
            <div className="title-main">
                <h1>experimente nossos cafés especiais</h1>
                <p>Desfrute dos beneficios dos nossos cafés</p>
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
                        {/* <button onClick={handleUpload} type="button" value={image} onChange={(e) => setImage(e.target.value)}>Adicionar imagem</button> */}
                        {/* <AdvancedImage cldImg={img} /> */}
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
                                <p className="item-name">{data.name}</p>
                                <span>
                                    R${data.price}
                                    <p className="item-quantity">ou 6x de R${Number(data.price / 6).toFixed(2)} sem juros</p>
                                </span>
                                <div className="buttons">
                                    <button onClick={() => handleClickAll(data._id)} className="card-btn">Comprar</button>
                                    {/* <button onClick={() => addToCart({ title: data.name, unit_price: data.price, image: data.image })} className='card-btn'> 
                                        Adicionar ao carrinho 
                                    </button> */}
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
