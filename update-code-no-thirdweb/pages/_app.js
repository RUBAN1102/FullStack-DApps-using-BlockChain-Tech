import "../styles/globals.css";
import { StateContextProvider } from "../Context/NFTs";

export default function App({ Component, pageProps }) {
  return (
    <StateContextProvider>
      <Component {...pageProps} />
    </StateContextProvider>
  );
}
