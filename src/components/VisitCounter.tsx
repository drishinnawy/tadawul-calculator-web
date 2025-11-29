import { useEffect, useState } from "react";

export default function VisitCounter() {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    fetch("/api/visits")
      .then((res) => res.json())
      .then((data) => setCount(data.count));
  }, []);

  return <span>{count}</span>;
}
