import { Metadata } from "next";
import ContactForm from "../components/Contact";

export const metadata: Metadata = {
  title: "Contact",
};

const Contact = () => {
  return <ContactForm />;
};

export default Contact;
