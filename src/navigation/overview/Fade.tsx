import { MotiTransitionProp, MotiView } from "moti";
import * as React from "react";
export type FadeProps = {
  delay?: number;
  children: React.ReactNode;
  position?: number;
  transition?: MotiTransitionProp;
};
export const Fade = ({ delay, children, position: top = 100 }: FadeProps) => {
  return (
    <MotiView
      animate={{ top: 0, opacity: 1 }}
      from={{ top, opacity: 0 }}
      transition={{
        damping: 25,
        mass: 2,
      }}
      delay={delay}
    >
      {children}
    </MotiView>
  );
};
