import { useEffect, useState } from "react"

const Main = () => {
    const [dado, setDado] = useState([])

    useEffect(() => {
        fetch("https://e-commerce-test-nfi8.onrender.com/api/products")
            .then(res => res.json())
            .then(data => setDado(data))
    }, [])

    return (
        <main>
            <h1>NOSSOS CAFÉS</h1>
            <div className="division"></div>
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