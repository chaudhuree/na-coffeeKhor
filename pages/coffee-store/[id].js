import { useRouter } from "next/router";
import React from "react";

function CoffeeStore() {
  const route = useRouter();
  console.log(route);
  return <div>CoffeeStore id: {route.query.id}</div>;
}

export default CoffeeStore;
