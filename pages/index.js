import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import Banner from "../components/banner";
import Card from "../components/card";
import useTrackLocation from "../hook/use-track-location";
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
  const [coffeeStores, setCoffeeStores] = useState([]);

  const [coffeeStoresError, setCoffeeStoresError] = useState(null);

  const { handleTrackLocation, latLong, locationErrorMsg, isFindingLocation } =
    useTrackLocation();
  const buttonClickHandler = () => {
    handleTrackLocation();
  };

  // fetch data for client side
  useEffect(() => {
    const fetchData=async()=>{
    if (latLong) {
      try {
      const CoffeeStoresDataUsingLocation = await CoffeeStores(latLong, 5);
      setCoffeeStoresError("")
      console.log({CoffeeStoresDataUsingLocation})
  
      setCoffeeStores(CoffeeStoresDataUsingLocation);
      } catch (error) {
        // console.log(error);
        setCoffeeStoresError(error.message);
      }
    }
    }
    fetchData()
  },[latLong]);
  return (
    <div className={styles.container}>
      <Head>
        <title>coffee khor ☕</title>

        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      <main className={styles.main}>
        <Banner
          buttonText={isFindingLocation ? "locating" : "view stores nearby"}
          buttonClickHandler={buttonClickHandler}
        />
        {locationErrorMsg && <p> Something Went Wrong: {locationErrorMsg}</p>}
        {coffeeStoresError && <p> Something Went Wrong: {coffeeStoresError}</p>}
        <div className={styles.heroImage}>
          <Image
            src="/../public/hero-image.png"
            width={700}
            height={400}
            alt="hero-image"
          />
        </div>
        {/* clientside rendering */}
        {coffeeStores?.length > 0 && (
          <div className={styles.sectionWrapper}>
            <h2 className={styles.heading2}>Coffee Stores Near You</h2>
            <div className={styles.cardLayout}>
              {coffeeStores?.map((data) => {
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
        {/* serverside rendering */}
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
