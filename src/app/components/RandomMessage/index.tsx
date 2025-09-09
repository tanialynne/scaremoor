"use client";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const RandomMessage = () => {
  const messages = useMemo(
    () => [
      "Some doors should stay closed…",
      "Don't open the hidden door…",
      "Leave the attic light untouched…",
      "Don't read what's left behind…",
      "Don't light the attic candle…",
      "The mirror keeps its secrets…",
    ],
    []
  );

  const [randomMessage, setRandomMessage] = useState(messages[0]);
  const pathname = usePathname();

  useEffect(() => {
    const index = Math.floor(Math.random() * messages.length);
    setRandomMessage(messages[index]);
  }, [messages, pathname]);

  return <h2 className="text-[50px] md:text-[90px] max-w-[10ch] font-trickordead">{randomMessage}</h2>;
};

export default RandomMessage;
