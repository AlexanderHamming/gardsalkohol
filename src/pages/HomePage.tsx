import NavigationBar from "../components/NavigationBar";

const Homepage = () => {
  return (
    <>
      <NavigationBar />

      <div className="header">
        <div className="backgroundH1">
          <h1 className="h1homepage">
            Hitta din nya favoritdryck från svenska gårdsförsäljningar!
          </h1>
        </div>

        <div className="container pictureHomepageContainer">
          <div className="pictureHomepage"></div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
