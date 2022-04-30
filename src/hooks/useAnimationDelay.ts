import React from "react";

export default function useAnimationDelay(length: number) {
  const [delay, setdelay] = React.useState(120);
  React.useEffect(() => {
    setTimeout(() => {
      setdelay(0);
    }, length * 120);
  }, []);
  return delay;
}
