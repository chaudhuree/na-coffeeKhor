import Head from "next/head";
import Image from "next/image";
import Banner from "../components/banner";
import Card from "../components/card";
import CoffeeStoreData from "../data/coffee-stores.json";
import styles from "../styles/Home.module.css";

export function getStaticProps(context) {
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
