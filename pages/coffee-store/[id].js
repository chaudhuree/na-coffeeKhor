import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import CoffeeStoreData from "../../data/coffee-stores.json";
import styles from "../../styles/coffeestore.module.css";

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
  const paths = CoffeeStoreData.map((coffeestore) => {
    return { params: { id: coffeestore.id.toString() } };
  });
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
  if (route.isFallback) {
    return <div>loading....</div>;
  }
  const { address, name, neighbourhood, imgUrl } = props.CoffeeStore;
  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>
      {/* CoffeeStore id: {route.query.id}
      <div></div> */}
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href="/">
              <a>← Back to Home</a>
            </Link>
          </div>
          <br />
          {/* <Link href="/dynamic">
        <a>redirect to dynamic</a>
      </Link> */}
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{name}</h1>
          </div>
          <Image
            src={imgUrl}
            alt={name}
            width={600}
            height={300}
            className={styles.storeImg}
          />
        </div>
        <div className={styles.col2}>
          <p>{address}</p>
          <p>{neighbourhood}</p>
        </div>
      </div>
    </div>
  );
}

export default CoffeeStore;
