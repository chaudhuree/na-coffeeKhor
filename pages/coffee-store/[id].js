import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import CoffeeStoreData from "../../data/coffee-stores.json";

export function getStaticProps(staticProps) {
  const params = staticProps.params;
  return {
    props: {
      CoffeeStore: CoffeeStoreData.find((CoffeeStore) => {
        return CoffeeStore.id === Number(params.id);
      }),
    },
  };
}
export function getStaticPaths() {
  const paths=CoffeeStoreData.map(coffeestore=>{
    return {params:{id:coffeestore.id.toString()}}
  })
  return {
    // paths: [
    //   { params: { id: "0" } },
    //   { params: { id: "1" } }
      
    // ],
    paths,
    fallback: true, // false or 'blocking'
  };
}
function CoffeeStore(props) {
  const route = useRouter();
  // if id is not in the getStaticPaths
  if(route.isFallback){
    return <div>loading....</div>
  }
  const {address,name,neighbourhood}= props.CoffeeStore
  return (
    <div>
      {/* CoffeeStore id: {route.query.id}
      <div></div> */}
      <Link href="/">
        <a>Back to Home</a>
      </Link>
      <br />
      {/* <Link href="/dynamic">
        <a>redirect to dynamic</a>
      </Link> */}
      <p>{name}</p>
      <p>{address}</p>
      <p>{neighbourhood}</p>
    </div>
  );
}

export default CoffeeStore;
