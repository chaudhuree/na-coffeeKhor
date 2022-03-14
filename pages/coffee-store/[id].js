import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

function CoffeeStore() {
  const route = useRouter();
  console.log(route);
  return <div>CoffeeStore id: {route.query.id}
  <div></div>
  <Link href='/'><a>Back to Home</a></Link>
  </div>;
}

export default CoffeeStore;
