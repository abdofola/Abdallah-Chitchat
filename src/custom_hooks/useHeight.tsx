import { useRef, useState } from "react";

export function useHeight<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [height, setHeight] = useState(0);

  function computeHeight() {
    if (ref.current) {
      setHeight(ref.current.clientHeight);
    }
    return height;
  }

  return [ref, computeHeight] as const;
}
