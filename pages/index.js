import Head from "next/head";
import Image from "next/image";
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
      <div className={styles.heroImage}>
          <Image
            src="/../public/hero-image.png"
            width={700}
            height={400}
            alt="hero-image"
          />
        </div>
      </main>


    </div>
  );
}
