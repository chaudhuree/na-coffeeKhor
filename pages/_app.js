import "../public/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <footer>1003@2022</footer>
    </>
  );
}

export default MyApp;
