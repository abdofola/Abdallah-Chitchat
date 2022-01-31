import { useRef } from "react";

function useScroll() {
  const ref = useRef<null | HTMLDivElement>(null);

  function executeScroll() {
    // console.log('on each render')
    if (ref.current) ref.current.scrollIntoView({ behavior: "smooth" });
  }

  return [ref, executeScroll] as const;
}

export { useScroll };
