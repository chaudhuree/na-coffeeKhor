import Head from "next/head";
import Image from "next/image";
import Banner from "../components/banner";
import Card from "../components/card";
import CoffeeStoreData from "../data/coffee-stores.json";
import styles from "../styles/Home.module.css";

export function getStaticProps(context) {
  // fetch data from foursquare
  fetch('https://api.foursquare.com/v3/places/nearby?ll=43.65267326999575,-79.39545615725015&query=coffee stores&v=20220105',
    {
      "headers": {
        'Authorization': "fsq3CI/wq0x2IvwqZNc/a6+i9pf9RlYueY5QTgk8uRPEMbA="
      }
    }
  ).then(response => response.json())
  .then(data => {
    const transformedData = data?.results?.map((venue) => {
        return {
            id: venue.fsq_id,
            ...venue
        }
    }) || [];
    console.log(transformedData);
  });


  // 
  return {
    props: {CoffeeStore:CoffeeStoreData}, // will be passed to the page component as props
  }
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
        <div className={styles.cardLayout} >
          {props.CoffeeStore?.map((data) => {
            return <Card
              className={styles.card}
              key={data.id}
              name={data.name}
              imgUrl={data.imgUrl}
              href={`/coffee-store/${data.id}`}
            />;
          })}
        </div>
      </main>
    </div>
  );
}

