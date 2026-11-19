import { ViewTransition, type ReactNode } from "react";

/** Wrap each page's content so route changes cross-fade and rise in. */
export default function PageTransition({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter="page" exit="page" default="none">
      <div>{children}</div>
    </ViewTransition>
  );
}
