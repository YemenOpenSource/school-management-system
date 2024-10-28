import Button from "@/components/ui/button";
import Loading from "@/components/ui/loading/loading";
import Title from "@/components/ui/title";
import { useRouter } from "next/router";
import React, { Suspense } from "react";

type Props = {
  children: React.ReactNode;
};

export default function layout(props: Props) {
  return (
    <div>
      <Suspense fallback={<Loading />}>{props?.children}</Suspense>
    </div>
  );
}
