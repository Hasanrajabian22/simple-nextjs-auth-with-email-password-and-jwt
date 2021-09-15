
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page)
  return (getLayout(<Component {...pageProps} />))
}

export default MyApp