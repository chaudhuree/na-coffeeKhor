import { useRouter } from "next/router";
import React from 'react';

export default function Dynamic() {
  const router = useRouter();
  return (
    <div >{router.query.dynamic}</div>
  )
}
