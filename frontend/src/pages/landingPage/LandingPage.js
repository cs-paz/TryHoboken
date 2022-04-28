const hoboken=require('./hoboken.jpg');
const LandingPage = () => {
  return (
    <div class="container">
      <h1>Try Hoboken</h1>
      <div>
        <img alt="Hoboken" src={hoboken}></img>
        <p>Don’t let Hoboken’s mile-square size fool you. It may be small, but its brownstones radiate a big city’s vibe of youthful energy complete with hip restaurants, cool bars and funky shops.
  This vibrant, walk-able small town is a unique delight. Its strategic location on the banks of the Hudson River across from lower Manhattan means waterside walkways boast postcard-perfect views from day to night.</p>
      </div>

      <div>
        <h2>Eat</h2>
        <p>Hoboken has a variety of notorious restaurants; some of which include Cuban, Mexican, Middle Eastern, Spanish, Portuguese, French, German, Greek, Chinese, Japanese, Thai and much more. Since there are so many options to choose from, you may find grabbing a bite to eat a bit difficult. Whatever it may be that you're in the mood for, rest assured you will find it in Hoboken. Being such a dense and busy city, you may experience waits at restaurants but it's definitely worth it. Many restaurants in the area are also BYOB, as they don't have liquor licenses.</p>
      </div>

      <div>
        <h2>Drink</h2>
        <p>Hoboken has occasionally been called "Bartown", which is a well-deserved nickname since it has more liquor licenses per capita than any other town in all of New Jersey. There is a huge range of lounges and bars in such a compact area. With such a wide variety of bars, Hoboken has something for every type of traveler.</p>
      </div>
      <div>
        <h3>With so many restaurants and bars to choose from in Hoboken, Try Hoboken will only give you a list of the best resturants and bars that you do not want to miss out on. Click the bars and restaurants on the top to find out the places you need to go to in Hoboken!</h3>

      </div>
      
  
    </div>
  );
};

export default LandingPage;
