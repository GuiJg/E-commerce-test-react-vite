// import { Cloudinary } from '@cloudinary/url-gen';
// import { auto } from '@cloudinary/url-gen/actions/resize';
// import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
// import { AdvancedImage } from '@cloudinary/react';

import Footer from './components/Footer'
import Header from './components/Header'
import Main from './components/Main'

function App() {
    // const cld = new Cloudinary({cloud: {cloudName: 'dyyopyojy'}});

    // const img = cld.image('cld-sample-5')
    //     .format('auto') 
    //     .quality('auto')
    //     .resize(auto().gravity(autoGravity()).width(500).height(500)); 
    return (
        <>
            <Header />
            <Main />
            <Footer />
            {/* <AdvancedImage cldImg={img} /> */}
        </>
    )
}

export default App
