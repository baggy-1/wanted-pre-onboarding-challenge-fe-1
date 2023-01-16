import React, { Suspense } from "react";
import ErrorBoundary from "./ErrorBoundary";

interface Props {
  children: React.ReactNode;
}

const SuspenseErrorBoundary = ({ children }: Props) => {
  return (
    <ErrorBoundary fallback={<div>에러...</div>}>
      <Suspense fallback={<div>로딩 중...</div>}>{children}</Suspense>
    </ErrorBoundary>
  );
};

export default SuspenseErrorBoundary;
