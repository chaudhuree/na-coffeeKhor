import Head from "next/head";
import Image from "next/image";
import Banner from "../components/banner";
import Card from "../components/card";
import { CoffeeStores } from "../lib/CoffeeStores";
import styles from "../styles/Home.module.css";

export async function getStaticProps() {
  // fetch data from foursquare
  const CoffeeStoresData = await CoffeeStores();
  //
  return {
    props: { CoffeeStoresData }, // will be passed to the page component as
  };
}
export default function Home(props) {
  const buttonClickHandler = () => {
    console.log("hello");
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>coffee khor ☕</title>

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Banner
          buttonText="view stores nearby"
          buttonClickHandler={buttonClickHandler}
        />
        <div className={styles.heroImage}>
          <Image
            src="/../public/hero-image.png"
            width={700}
            height={400}
            alt="hero-image"
          />
        </div>
        {props.CoffeeStoresData?.length > 0 && (
          <div className={styles.sectionWrapper}>
            <h2 className={styles.heading2}>Bashundhara Stores</h2>
            <div className={styles.cardLayout}>
              {props.CoffeeStoresData?.map((data) => {
                const { fsq_id, name, location } = data;
                return (
                  <Card
                    className={styles.card}
                    key={fsq_id}
                    name={name}
                    imgUrl={
                      data.imgUrl ||
                      "https://images.unsplash.com/photo-1498804103079-a6351b050096?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2468&q=80"
                    }
                    href={`/coffee-store/${fsq_id}`}
                  />
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
