import cls from "classnames";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { CoffeeStores } from "../../lib/CoffeeStores";
import styles from "../../styles/coffeestore.module.css";

export async function getStaticProps(staticProps) {
  const params = staticProps.params;
  const CoffeeStoresData = await CoffeeStores();
  return {
    props: {
      CoffeeStore: CoffeeStoresData.find((CoffeeStore) => {
        return CoffeeStore.fsq_id.toString() === params.id; // params.id is the id from the url which is always a string
      }),
    },
  };
}
export async function getStaticPaths() {
  const CoffeeStoresData = await CoffeeStores();
  const paths = CoffeeStoresData.map((coffeestore) => {
    return { params: { id: coffeestore.fsq_id.toString() } };
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
const handleUpvoteButton = () => {
  console.log("upvotebutton");
};
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

          {/* <Link href="/dynamic">
        <a>redirect to dynamic</a>
      </Link> */}
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{name}</h1>
          </div>
          <Image
            src={imgUrl||
                  "https://images.unsplash.com/photo-1498804103079-a6351b050096?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2468&q=80"}
            alt={name}
            width={600}
            height={300}
            className={styles.storeImg}
          />
        </div>
        <div className={cls("glass", styles.col2)}>
          <div className={styles.iconWrapper}>
            <Image src="/static/icons/places.svg" width="24" height="24" />
            <p className={styles.text}>{address}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image src="/static/icons/nearMe.svg" width="24" height="24" />
            <p className={styles.text}>{neighbourhood}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image src="/static/icons/star.svg" width="24" height="24" />
            <p className={styles.text}>1</p>
          </div>
          <button className={styles.upvoteButton} onClick={handleUpvoteButton}>
            Up Vote!
          </button>
        </div>
      </div>
    </div>
  );
}

export default CoffeeStore;
