import store from "@/redux/store";
import { Provider } from "react-redux";
import ReactModal from "react-modal";
import { Elements } from "@stripe/react-stripe-js";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

import { loadStripe } from "@stripe/stripe-js";
import "../styles/index.scss";
import { GoogleOAuthProvider } from "@react-oauth/google";
if (typeof window !== "undefined") {
  require("bootstrap/dist/js/bootstrap");
}

if (typeof window !== "undefined") {
  ReactModal.setAppElement("body");
}
import { SessionProvider } from "next-auth/react";
import { useEffect } from "react";
// import store from "../../store";

// stripePromise
const NEXT_PUBLIC_STRIPE_KEY =
  "pk_test_51NYXCFGndYsQkAEFifIbJH64sZFMDpF7DcLYvUUN2az3VdK1M7qVPo7Z2j9rhunf3Pd0C3aFLENIxFriJWwx1P6a00lQFqaoc6";
const stripePromise = loadStripe(NEXT_PUBLIC_STRIPE_KEY);
const NEXT_PUBLIC_GOOGLE_CLIENT_ID =
  "23455951198-r713jg4kfn9bnp8bs2trs5kk92tfubef.apps.googleusercontent.com";
let persistor = persistStore(store);

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  useEffect(() => {
    // Dynamically import the Kommunicate script on client-side
    if (typeof window !== "undefined") {
      import("@kommunicate/kommunicate-chatbot-plugin").then((Kommunicate) => {
        // Ensure the init function is available
        if (
          Kommunicate &&
          Kommunicate.default &&
          typeof Kommunicate.default.init === "function"
        ) {
          Kommunicate.default.init("3acddaa0c0f1e7dc4e165942616fd10bd", {
            automaticChatOpenOnNavigation: true,
            popupWidget: true,
          });
        }
      });
    }
  }, []);
  return (
    <GoogleOAuthProvider clientId={NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
      <SessionProvider session={session}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Elements stripe={stripePromise}>
              <div id="root">
                <Component {...pageProps} />
              </div>
            </Elements>
          </PersistGate>
        </Provider>
      </SessionProvider>
    </GoogleOAuthProvider>
  );
}
