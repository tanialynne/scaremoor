"use client";
import { useState } from "react";

import Button from "../Button";
import InputField from "../Inputs";
import { spookyToast } from "../SpookyToast";

import OrangeBackground from "../../../../public/images/orangeBackground.png";

type RequestFormProp = {
  buttonText?: string;
  requestId?: string;
};

const RequestForm: React.FC<RequestFormProp> = ({ buttonText, requestId }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !name.trim()) {
      spookyToast.error("The spell ingredients are missing! Fill in both magical fields! 🧙‍♀️");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      spookyToast.error("That email looks cursed! Check your magical address! 📧✨");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/join/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          form_id: requestId,
          subscriber_data: {
            first_name: name,
            email_address: email,
          },
        }),
      });

      const data = await res.json();
      if (res.ok) {
        spookyToast.success("Email potion brewed and delivered perfectly! 🧪📧");
        setEmail("");
        setName("");
      } else {
        spookyToast.error(`💀 Spell Failed: ${data.message}`);
      }
    } catch (_) {
      spookyToast.error("💀 Something spooky went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form>
      <div className="flex flex-col md:flex-row pt-8 gap-5 w-full">
        <InputField labelText="Email Address" inputType="email" value={email} onChange={setEmail} />
        <InputField labelText="Name" inputType="text" value={name} onChange={setName} />
        <div className="shrink-0">
          <Button buttonImage={OrangeBackground} altText="join-now" text={buttonText ? buttonText : "Join Now"} onClick={(e) => handleSubmit(e)} loading={loading} />
        </div>
      </div>
    </form>
  );
};

export default RequestForm;
