import '../styles/globals.css'
import withYM from "next-ym";
import Router from "next/router";
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}


export default withYM("87100465", Router)(MyApp);
