"use client";
import { useState } from "react";

import Button from "../Button";
import InputField from "../Inputs";
import { spookyToast } from "../SpookyToast";
import {
  trackFormStart,
  trackFormSubmit,
  trackLeadMagnetSignup,
} from "@/app/utils/analytics";

import OrangeBackground from "../../../../public/images/orangeBackground.png";

type RequestFormProp = {
  buttonText?: string;
  requestId?: string;
  bookTitle?: string;
  onSubmitSuccess?: () => void;
  layout?: "stacked" | "inline"; // 'stacked' = button below, 'inline' = button on same row
};

const RequestForm: React.FC<RequestFormProp> = ({
  buttonText,
  requestId,
  bookTitle,
  onSubmitSuccess,
  layout = "inline",
}) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const handleFieldFocus = () => {
    if (!hasStarted) {
      setHasStarted(true);
      trackFormStart("Lead Magnet Form", bookTitle || "Unknown Book");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !name.trim()) {
      spookyToast.error(
        "The spell ingredients are missing! Fill in both magical fields! 🧙‍♀️"
      );
      trackFormSubmit("Lead Magnet Form", bookTitle || "Unknown Book", false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      spookyToast.error(
        "That email looks cursed! Check your magical address! 📧✨"
      );
      trackFormSubmit("Lead Magnet Form", bookTitle || "Unknown Book", false);
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
        spookyToast.success(
          "Email potion brewed and delivered perfectly! 🧪📧"
        );
        setEmail("");
        setName("");

        // Track successful lead magnet signup
        if (requestId && bookTitle) {
          trackLeadMagnetSignup(requestId, bookTitle);
        }
        trackFormSubmit("Lead Magnet Form", bookTitle || "Unknown Book", true);

        // Call success callback if provided
        if (onSubmitSuccess) {
          onSubmitSuccess();
        }
      } else {
        spookyToast.error(`💀 Spell Failed: ${data.message}`);
        trackFormSubmit("Lead Magnet Form", bookTitle || "Unknown Book", false);
      }
    } catch {
      spookyToast.error("💀 Something spooky went wrong!");
      trackFormSubmit("Lead Magnet Form", bookTitle || "Unknown Book", false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form>
      {layout === "inline" ? (
        // Inline layout - button on same row (for book pages with shorter text)
        <div className="flex flex-col md:flex-row pt-8 gap-4 w-full items-end">
          <div className="flex-1 md:max-w-[200px]">
            <InputField
              labelText="Email Address"
              inputType="email"
              value={email}
              onChange={setEmail}
              onFocus={handleFieldFocus}
              backgroungType="light"
            />
          </div>
          <div className="flex-1 md:max-w-[200px]">
            <InputField
              labelText="Name"
              inputType="text"
              value={name}
              onChange={setName}
              onFocus={handleFieldFocus}
              backgroungType="light"
            />
          </div>
          <div className="shrink-0">
            <Button
              buttonImage={OrangeBackground}
              altText="join-now"
              text={buttonText ? buttonText : "Join Now"}
              onClick={(e) => handleSubmit(e)}
              loading={loading}
            />
          </div>
        </div>
      ) : (
        // Stacked layout - button below (for quiz with longer text)
        <div className="pt-8 space-y-5 w-full">
          <div className="flex flex-col sm:flex-row gap-5">
            <div className="flex-1">
              <InputField
                labelText="Email Address"
                inputType="email"
                value={email}
                onChange={setEmail}
                onFocus={handleFieldFocus}
                backgroungType="light"
              />
            </div>
            <div className="flex-1">
              <InputField
                labelText="Name"
                inputType="text"
                value={name}
                onChange={setName}
                onFocus={handleFieldFocus}
                backgroungType="light"
              />
            </div>
          </div>
          <div className="flex justify-center">
            <Button
              buttonImage={OrangeBackground}
              altText="join-now"
              text={buttonText ? buttonText : "Join Now"}
              onClick={(e) => handleSubmit(e)}
              loading={loading}
            />
          </div>
        </div>
      )}
    </form>
  );
};

export default RequestForm;
