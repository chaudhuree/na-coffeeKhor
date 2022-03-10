const Banner = ({buttonText,buttonClickHandler}) => {
  return (
    <div>
      <h1>coffee khor</h1>
      <p>discover coffee shop near you!</p>
      <button onClick={buttonClickHandler}>{buttonText}</button>
    </div>
  );
};

export default Banner;
