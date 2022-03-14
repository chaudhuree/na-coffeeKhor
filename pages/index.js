import Head from "next/head";
import Banner from "../components/banner";
import styles from "../styles/Home.module.css";

export default function Home() {
    const buttonClickHandler =()=>{
        console.log('hello')
    }
  return (
    <div className={styles.container}>
      <Head>
        <title>coffee khor ☕</title>

        
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>

      <Banner buttonText='view stores nearby' buttonClickHandler={buttonClickHandler} />
      </main>


    </div>
  );
}
