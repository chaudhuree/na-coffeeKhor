import Head from "next/head";
import styles from "../styles/Home.module.css";
import Banner from "../components/banner";

export default function Home() {
    const buttonClickHandler =()=>{
        console.log('hello')
    }
  return (
    <div className={styles.container}>
      <Head>
        <title>coffee khor</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>

      <Banner buttonText='view stores nearby' buttonClickHandler={buttonClickHandler} />
      </main>


    </div>
  );
}
