import "@/styles/globals.css";
import { AnimatePresence } from "framer-motion";
import AuthProvider from "@/context/AuthProvider";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider session={pageProps.session}>
      <AnimatePresence mode="wait">
        <Component {...pageProps} />
      </AnimatePresence>
    </AuthProvider>
  );
}
