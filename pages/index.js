import Head from "next/head";
import Image from "next/image";
import Banner from "../components/banner";
import Card from "../components/card";
import CoffeeStoreData from "../data/coffee-stores.json";
import styles from "../styles/Home.module.css";

export async function getStaticProps(context) {
  // fetch data from foursquare
  const response = await fetch(
    "https://api.foursquare.com/v3/places/nearby?ll=43.65267326999575,-79.39545615725015&query=coffee stores&v=20220105&limit=7",
    {
      headers: {
        Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_KEY},
      },
  )
 


  const data = await response.json();
  CoffeeStoreData = data?.results;
  console.log(CoffeeStoreData);

  //
  return {
    props: { CoffeeStore: CoffeeStoreData }, // will be passed to the page component as props
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
        <div className={styles.cardLayout}>
          {props.CoffeeStore?.map((data) => {
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
      </main>
    </div>
  );
}
