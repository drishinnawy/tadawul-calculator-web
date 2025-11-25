import { useEffect, useRef } from "react";

export default function TradingViewWidget() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: [["تداول", "TADAWUL:TASI|1D"]],
      chartOnly: false,
      width: "100%",
      height: "220",
      locale: "ar",
      colorTheme: "light",
      isTransparent: false,
      autosize: true,
      showVolume: true,
      showMA: true,
    });
    container.current?.appendChild(script);
  }, []);

  return <div className="my-6" ref={container} />;
}
