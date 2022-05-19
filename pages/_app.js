import '../styles/globals.css';
import Layout from '../components/Layout'
import { SnipcartProvider } from 'use-snipcart'

function MyApp({ Component, pageProps }) {
  return (
    <SnipcartProvider>
      <Layout>
      <Component {...pageProps} />
    </Layout>
    </SnipcartProvider>
    
  )
}

export default MyApp
