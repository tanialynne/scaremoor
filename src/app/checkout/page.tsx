import { Metadata } from "next";
import { redirect } from "next/navigation";
import Herobox from "../components/Herobox";
import CheckoutForm from "../components/CheckoutForm";
import { isFeatureEnabled } from "../constants/FeatureFlags";

import BackgroundImage from "../../../public/images/landingpage-Image.png";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your book purchase securely.",
};

const CheckoutPage = () => {
  // Redirect if direct sales is disabled
  if (!isFeatureEnabled("DIRECT_SALES_ENABLED")) {
    redirect("/books");
  }

  return (
    <>
      <Herobox backgroundImage={BackgroundImage} contentPaddingTop="lg:pt-22">
        <div className="items-center">
          <div className="space-y-5 lg:pt-10">
            <div className="font-trickordead font-normal space-y-4 [text-shadow:0_0_10px_rgba(0,0,0,0.8)]">
              <h2 className="hero-text-large">Secure Checkout</h2>
              <h1 className="hero-text-xlarge max-w-[20ch]">
                Complete Your Order
              </h1>
            </div>

            <p
              className="max-w-[80ch] font-light"
              style={{
                textShadow: "0 0 10px rgba(0, 0, 0, 0.8)",
              }}
            >
              Your order is secured with SSL encryption. We accept all major credit cards 
              and process payments through trusted payment providers.
            </p>
          </div>
        </div>
      </Herobox>
      
      <main className="text-white">
        <section className="px-8 md:px-20 py-20 min-h-screen">
          <div className="max-w-6xl mx-auto">
            <CheckoutForm />
          </div>
        </section>
      </main>
    </>
  );
};

export default CheckoutPage;