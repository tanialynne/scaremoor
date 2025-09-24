"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { trackFacebookLead } from "@/app/utils/analytics";

interface ExitIntentPopupProps {
  onClose?: () => void;
}

export default function ExitIntentPopup({ onClose }: ExitIntentPopupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Kit form ID for exit intent popup lead magnet
  const EXIT_INTENT_FORM_ID = "8174135"; // Using same as free story for now

  useEffect(() => {
    // Check if user has already submitted their email through any form
    const hasSubmittedEmail = localStorage.getItem("scaremoor_email_submitted");

    // Check if user has completed a purchase
    const hasCompletedPurchase = localStorage.getItem("scaremoor_purchase_completed");

    // Check if popup was shown recently (24 hour cooldown)
    const lastShown = localStorage.getItem("exitIntentShown");
    const now = Date.now();
    const oneDayInMs = 24 * 60 * 60 * 1000; // 24 hours

    // Don't show if user already submitted email, completed purchase, or popup shown recently
    if (
      hasSubmittedEmail ||
      hasCompletedPurchase ||
      (lastShown && now - parseInt(lastShown) < oneDayInMs)
    ) {
      setHasShown(true);
      return;
    }

    if (hasShown) return;

    let hasTriggered = false;

    const handleMouseLeave = (e: MouseEvent) => {
      if (hasTriggered || hasShown) return;

      // Check again if user has submitted email or completed purchase since component mounted
      const hasSubmittedEmailNow = localStorage.getItem(
        "scaremoor_email_submitted"
      );
      const hasCompletedPurchaseNow = localStorage.getItem(
        "scaremoor_purchase_completed"
      );
      if (hasSubmittedEmailNow || hasCompletedPurchaseNow) return;

      if (e.clientY <= 0) {
        hasTriggered = true;
        setIsVisible(true);
        setHasShown(true);
        localStorage.setItem("exitIntentShown", Date.now().toString());
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [hasShown]);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem("exitIntentShown", Date.now().toString());
    onClose?.();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) {
      window.dispatchEvent(
        new CustomEvent("show-toast", {
          detail: {
            message: "Please fill in both your name and email! 👻",
            type: "error",
          },
        })
      );
      return;
    }

    // Mark email as submitted immediately to prevent duplicate popups
    localStorage.setItem("scaremoor_email_submitted", "true");

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          form_id: EXIT_INTENT_FORM_ID,
          subscriber_data: {
            first_name: name,
            email_address: email,
            referrer: "exit-intent-popup",
          },
        }),
      });

      if (response.ok) {
        // Track Facebook Lead event
        trackFacebookLead("exit_intent_popup");
        
        setIsVisible(false);
        // Mark that user has submitted their email
        localStorage.setItem("scaremoor_email_submitted", "true");
        // Show success toast
        window.dispatchEvent(
          new CustomEvent("show-toast", {
            detail: {
              message: "Free chapter sent! Check your email 📧",
              type: "success",
            },
          })
        );
      } else {
        // Remove the flag if submission failed
        localStorage.removeItem("scaremoor_email_submitted");
        throw new Error("Signup failed");
      }
    } catch {
      // Remove the flag if submission failed
      localStorage.removeItem("scaremoor_email_submitted");
      window.dispatchEvent(
        new CustomEvent("show-toast", {
          detail: {
            message: "Something went wrong. Please try again.",
            type: "error",
          },
        })
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-popup-title"
      aria-describedby="exit-popup-description"
      onClick={handleBackdropClick}
    >
      <div className="bg-gradient-to-br from-orange-900/90 to-red-900/90 border border-orange-500/30 rounded-lg max-w-md w-full p-6 relative overflow-hidden">
        {/* Spooky border glow */}
        <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-orange-500/20 to-red-500/20 animate-pulse" />

        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-orange-300 hover:text-orange-100 focus:text-orange-100 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-orange-900 rounded-full p-1 transition-all z-10"
          aria-label="Close popup"
        >
          <X size={20} aria-hidden="true" />
        </button>

        <div className="relative z-10">
          <div className="text-center mb-4">
            <h3
              id="exit-popup-title"
              className="text-2xl font-bold text-orange-100 mb-2"
            >
              Wait! Don’t Leave Yet...
            </h3>
            <div className="text-orange-300 text-sm mb-4">
              🎃 Get a FREE chapter of &quot;The Mask Room&quot;
            </div>
          </div>

          <div className="text-center mb-6">
            <p
              id="exit-popup-description"
              className="text-orange-200 text-sm leading-relaxed"
            >
              Something sinister lurks behind the old theater masks...
              <br />
              <strong>
                Discover the mystery that’s captivating young readers!
              </strong>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name-input" className="sr-only">
                Your name for personalization
              </label>
              <input
                id="name-input"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                required
                aria-describedby="name-help"
                className="w-full px-4 py-3 rounded-lg bg-black/40 border border-orange-500/30 text-orange-100 placeholder:text-orange-400/70 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/50 focus:bg-black/60 transition-all"
              />
              <div id="name-help" className="sr-only">
                Enter your name for a personalized experience
              </div>
            </div>
            <div>
              <label htmlFor="email-input" className="sr-only">
                Email address for free chapter access
              </label>
              <input
                id="email-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email for instant access"
                required
                aria-describedby="email-help"
                className="w-full px-4 py-3 rounded-lg bg-black/40 border border-orange-500/30 text-orange-100 placeholder:text-orange-400/70 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/50 focus:bg-black/60 transition-all"
              />
              <div id="email-help" className="sr-only">
                Enter your email address to receive a free chapter of The Mask
                Room
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !email}
              aria-describedby="submit-button-help"
              className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-orange-500 hover:to-red-500 focus:from-orange-500 focus:to-red-500 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-orange-900 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 focus:scale-105"
            >
              {isSubmitting ? "Sending..." : "Get My FREE Chapter 📖"}
            </button>
            <div id="submit-button-help" className="sr-only">
              {isSubmitting
                ? "Processing your request"
                : "Click to receive your free chapter via email"}
            </div>
          </form>

          <div className="text-center mt-4">
            <p className="text-orange-400/80 text-xs">
              No spam, just spooky stories. Unsubscribe anytime.
            </p>
          </div>
        </div>

        {/* Spooky decorative elements */}
        <div className="absolute -top-2 -left-2 w-4 h-4 bg-orange-500/30 rounded-full animate-ping" />
        <div className="absolute -bottom-2 -right-2 w-3 h-3 bg-red-500/30 rounded-full animate-ping animation-delay-1000" />
      </div>
    </div>
  );
}
