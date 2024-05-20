import { useEffect } from 'react';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';

const Checkout = () => {
  useEffect(() => {
    // Inicializa o Mercado Pago com a sua public key
    initMercadoPago('SUA_PUBLIC_KEY');
  }, []);

  return (
    <div>
      <h1>Checkout</h1>
      <Wallet
        initialization={{ preferenceId: 'PREFERENCE_ID' }}
      />
    </div>
  );
};

export default Checkout;
