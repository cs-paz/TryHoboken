const { restaurants } = require("./config/mongoCollections");
const { bars } = require("./config/mongoCollections");
const connection = require("./config/mongoConnection");
const ObjectID = require("mongodb").ObjectID;

const template = {
  name: "",
  type: "",
  address: "",
  description: "",
  url: "",
  comments: [],
};

const restaurantsData = [
  {
    name: "Grimaldi's Pizzeria",
    type: "Italian",
    address: "411 Washington St, Hoboken, NJ 07030",
    description:
      "The only true coal brick oven pizzeria in Hoboken where we specialize in turning out authentic Margherita style pizzas fired at 1000 degrees in our custom built coal burning oven. Come join us and find out why devotees insist we are, the best in NJ, hands down.",
    url: "https://www.grimaldis.com/",
  },
  {
    name: "Napoli's Pizza",
    type: "Italian",
    address: "1118 Washington St, Hoboken, NJ 07030",
    description:
      "Frank Volpe loves Hoboken and its small scale Manhattan style is just what he was looking for. After working in his family’s NYC pizzeria for 12 years, he decided to open his own pizzeria in Hoboken. In 2007, Volpe branched out on his own and opened Napoli’s.With its true Neapolitan style pizza, fresh pasta, paninis and wraps, there’s something for everyone. Volpe learned the business at Lombardi’s Pizzeria, located at 32 Spring Street in Soho. One of NYC’s busiest pizzerias, you can be assured that he knows his craft! Lombardi’s was the very first licensed pizzeria in the United States. It was established by Volpe’s family back in 1905. Using only the freshest ingredients, Frank takes special pride in ensuring that his customers’ receive only the best. Customer service is tops, and you’ll never be rushed. You may have to wait a few extra minutes for your pizza – but it’s worth it! Frank is making sure that your pizza pie is perfect. Napoli’s specials are updated regularly, so be sure to check our menu here and when you stop in!",
    url: "https://napolishobokenpizza.com/",
  },
  {
    name: "H&S Giovanni's Restaurant & Pizza",
    type: "Italian",
    address: "603 Washington St, Hoboken, NJ 07030",
    description:
      "Try the best pizzas in Hoboken. H&S Giovanni's Restaurant & Pizzeria is one of the most popular in Hoboken. Try their pizza, and you'll soon see why. Try some of Hoboken's best dishes at independent pizzerias in the city. Find new favorites and get a taste of what Hoboken has to offer. You can't say you've been to H&S Giovanni's Restaurant & Pizzeria until you've tried Cheese Pizza. This classic local favorite is what this establishment is known for. Add Soda to your pizza for a more satisfying meal. It's a great addition to any pizza from H&S Giovanni's Restaurant & Pizzeria. H&S Giovanni's Restaurant & Pizzeria has been a Slice partner since 2019. They've been serving the local community for a while now, so you can rely on them providing great pizza. Call ahead and get curbside pickup at H&S Giovanni's Restaurant & Pizzeria. It's never been easier to get hot, fresh pizza to go. Make your money stretch further by taking advantage of special offers at H&S Giovanni's Restaurant & Pizzeria. The only thing better than pizza is pizza at an affordable price. You can pay by credit card at H&S Giovanni's Restaurant & Pizzeria. That makes it easy to get your pizza as quickly as possible.",
    url: "https://www.hsgiovannisrestaurantpizzeria.com/",
  },
  {
    name: "The Brick",
    type: "Italian",
    address: "1122 Washington St, Hoboken, NJ 07030",
    description:
      "About The Brick: Select your favorite Pizza, Pasta, Sandwiches dishes directly from the menu of The Brick located at 1122 Washington St, Hoboken, NJ 07030.The Brick has established a reputation for providing highest quality food, excellent customer service and speedy delivery to customers in the Hoboken area ... always at the lowest possible price too. We can promise satisfaction because all dishes at The Brick are freshly prepared every day with premium ingredientSpeaking for the entire staff at The Brick, we appreciate our customers for their loyalty and past patronage. Going forward, we promise to maintain the same high quality operation to serve you in the futurThe Brick is now accepting online orders for delivery or takeout through BeyondMenu.com. Enjoy the best, freshest Pizza, Pasta, Sandwiches cuisine, and remember: THERE IS NO WAITING IN LINE WHEN YOU ORDER ONLINE",
    url: "https://www.hobokenthebrick.com/?utm_source=gmb&utm_medium=website",
  },
  {
    name: "Ayame Hibachi & Sushi",
    type: "Japanese",
    address: "526 Washington St, Hoboken, NJ 07030",
    description:
      "Ayame Hibachi & Sushi offers delicious dining, takeout and delivery to Hoboken, NJ. Ayame Hibachi & Sushi is a cornerstone in the Hoboken community and has been recognized for its outstanding Sushi cuisine, excellent service and friendly staff. sOur Sushi restaurant is known for its modern interpretation of classic dishes and its insistence on only using high quality fresh ingredients.",
    url: "https://www.ayamehibachisushinj.com/",
  },
  {
    name: "Robongi",
    type: "Japanese",
    address: "520 Washington St, Hoboken, NJ 07030",
    description:
      "Robongi Hoboken offers delicious dining, takeout and delivery to Hoboken, NJ. Robongi Hoboken is a cornerstone in the Hoboken community and has been recognized for its outstanding Sushi cuisine, excellent service and friendly staff. Sushi restaurant is known for its modern interpretation of classic dishes and its insistence on only using high quality fresh ingredients.",
    url: "https://www.robonginj.com/",
  },
  {
    name: "Okinawa Sushi Grill",
    type: "Japanese",
    address: "400 Newark St., Hoboken, NJ 07030",
    description:
      "Some Sushi Place offers one particular menu only. Okinawa Sushi Restaurant in Hoboken, NJ has different type of cuisine ; Japanese, Thai and Chinese dishes. Satisfying your cravings on fresh made sushi but also giving the option to try other cuisines. Catering and Parties are Welcome. We also provide Free parking in Shopping Center . Providing Dine in, Take Out and Delivery. Come and enjoy your dining!",
    url: "https://okinawasushinj.com/",
  },
  {
    name: "South Street Fish & Ramen Co.",
    type: "Japanese",
    address: "219 Washington St, Hoboken, NJ 07030",
    description:
      "Easygoing Japanese eatery serving poke rice bowls, salads, sushi burritos & ramen noodles.",
    url: "http://www.southstreet.co/",
  },
  {
    name: "McDonald's",
    type: "Fast Food",
    address: "234 Washington St, Hoboken, NJ 07030",
    description:
      "From adding more balanced options to our Happy Meal®, to serving up fresh beef Quarter Pounder® burgers that are cooked when you order, we’re always finding ways to show our commitment to our customers and our food. ",
    url: "https://www.mcdonalds.com/us/en-us/location/NJ/HOBOKEN/234-WASHINGTON-ST/3876.html?cid=RF:YXT:GMB::Clicks",
  },
  {
    name: "Taco Bell",
    type: "Fast Food",
    address: "38 Hudson Pl, Hoboken, NJ 07030",
    description:
      "Fast-food chain serving Mexican-inspired fare such as tacos, quesadillas & nachos.",
    url: "https://www.tacobell.com/",
  },
  {
    name: "Shake Shack",
    type: "Fast Food",
    address: "111 Washington St, Hoboken, NJ 07030",
    description:
      "Hip, counter-serve chain for gourmet takes on fast-food classics like burgers & frozen custard.",
    url: "https://www.shakeshack.com/location/hoboken-nj?utm_source=G&utm_medium=local&utm_campaign=google-local",
  },
  {
    name: "Grubbs Take Away",
    type: "Fast Food",
    address: "418 Washington St, Hoboken, NJ 07030",
    description:
      "Take out only restaurant that offers fast service and a variety of food to choose from.",
    url: "https://grubbstakeaway.com/",
  },
  {
    name: "Charrito's Midtown",
    type: "Mexican",
    address: "518 Washington St, Hoboken, NJ 07030",
    description: "",
    url: "http://loscharritos.com/index.php/midtown-hoboken/",
  },
  {
    name: "Tacoria",
    type: "Mexican",
    address: "208 Washington St, Hoboken, NJ 07030",
    description:
      "TACORIA IS MORE THAN JUST A RESTAURANT WITH THE BEST MEXICAN FOOD EVER (ACCORDING TO OUR MOMS). IT’S OUR WAY OF PAYING HOMAGE TO THE VIBRANT COLORS, RICH CULTURE AND WARM HOSPITALITY OF OUR SOUTHERN NEIGHBORS. OUR GOAL IS TO MAKE TACORIA A PLACE THAT INSPIRES AND IMPROVES OUR LOCAL COMMUNITIES THROUGH AMAZING FRESH FOOD, GREAT PEOPLE AND AN EXCITING ATMOSPHERE. A PLACE WHERE EVERYONE CAN EAT FRESH, FEEL FRESH, BE FRESH!",
    url: "https://tacoria.com/",
  },
  {
    name: "Baja",
    type: "Mexican",
    address: "104 14th St, Hoboken, NJ 07030",
    description:
      "Spirited spot with hearty portions of Mexican grub & margaritas made from a vast tequila selection.",
    url: "http://www.bajahoboken.com/",
  },
  {
    name: "Orale Mexican Kitchen",
    type: "Mexican",
    address: "1426 Willow Ave, Hoboken, NJ 07030",
    description:
      'Buzzing hangout with quirky "Day of the Dead" decor, big tequila menu & classic comfort food.',
    url: "https://www.oralemk.com/",
  },
  {
    name: "Curry Up Now",
    type: "Indian",
    address: "91 Washington St, Hoboken, NJ 07030",
    description: "",
    url: "https://www.curryupnow.com/",
  },
  {
    name: "Karma Kafe",
    type: "Indian",
    address: "505 Washington St, Hoboken, NJ 07030",
    description:
      "This small Indian spot offers big portions & a lunch buffet in a simple space with sidewalk seating.",
    url: "http://www.karmakafe.com/",
  },
  {
    name: "No. 1",
    type: "Chinese",
    address: "642 Washington St, Hoboken, NJ 07030",
    description:
      "No 1 Chinese Restaurant offers authentic and delicious tasting Chinese cuisine in Hoboken, NJ.  No 1 Chinese's convenient location and affordable prices make our restaurant a natural choice for dine-in or take-out meals in the Hoboken community. Our restaurant is known for its variety in taste and high quality fresh ingredients. Come and experience our friendly atmosphere and excellent service.",
    url: "https://www.no1hoboken.com/",
  },
  {
    name: "Keming",
    type: "Chinese",
    address: "1006 Washington St, Hoboken, NJ 07030",
    description:
      "Snug, informal Chinese restaurant offering traditional & elevated fare at varying spice levels.",
    url: "",
  },
 {
   "name": "Fiore's Deli",
   "type": "Italian Deli",
   "address": "414 Adams St, Hoboken, NJ 07030-2693",
   "description": "A classic Italian deli serving the Mile Square since 1903",
   "url": ""
 },
 {
   "name": "Amanda's Bakery",
   "type": "Argentinian",
   "address": "908 Washington St Ste A, Hoboken, NJ 07030-5152",
   "description": "New American cuisine with an Argentine twist. Enjoy live music from talented local musicians performing during brunch and dinner service. ",
   "url": "https://www.amandasrestaurant.com/"
 },
 {
   "name": "La Isla",
   "type": "Cuban",
   "address": "104 Washington Street Uptown Location: 25 12th St., Hoboken, NJ 07030-4604",
   "description": "Havana meets Miami in Hoboken! The original La Isla Restaurant at 104 Washington Street has been an institution in downtown Hoboken since 1970. Taken over by the Luis and Giner families in 1996 it has attained local cult status, serving “incredible Cuban food morning, day and night” with Sunday brunch “being a divine reason to skip church” according to Zagat. With Chef Omar Giner at the helm, we are committed to serving traditional Cuban food made from the freshest and most genuine ingredients, served in generous portions at affordable prices in a friendly and unpretentious neighborhood atmosphere.",
   "url": "https://laislarestaurant.com/"
 },
 {
   "name": "Benny Tudino's",
   "type": "Pizza",
   "address": "622 Washington St, Hoboken, NJ 07030-4908",
   "description": "Home of the largest slice",
   "url": "https://bennytudinos.com/"
 },
 {
   "name": "The Cuban",
   "type": "Cuban",
   "address": "333 Washington St, Hoboken, NJ 07030-4871",
   "description": "This bi-level restaurant offers Cuban fare, daily specials & live music in a stylish setting.",
   "url": ""
 },
 {
   "name": "Elysian Café",
   "type": "Café",
   "address": "1001 Washington St, Hoboken, NJ 07030-5201",
   "description": "Modern French bistro fare & classics like steak frites served in a restored saloon dating from 1895.",
   "url": "https://elysiancafe.com/"
 },
 {
   "name": "Augustinos",
   "type": "Italian",
   "address": "1104 Washington St, Hoboken, NJ 07030-5381",
   "description": "Dishing pasta, fish & meat, this cash-only Southern Italian eatery features a feisty staff.",
   "url": ""
 },
 {
   "name": "Turning Point",
   "type": "Café",
   "address": "1440 Frank Sinatra Dr, Hoboken, NJ 07030",
   "description": "Daytime cafe chain serving breakfast, sandwiches, tea & coffee drinks in stylish surroundings.",
   "url": "https://turningpointrestaurants.com/menu/"
 },
 {
   "name": "Vitos",
   "type": "Deli",
   "address": "806 Washington St, Hoboken, NJ 07030-7040",
   "description": "Classic Italian deli offering sandwiches & salads, imported groceries & housemade mozzarella.",
   "url": "https://www.vitosdeli.com/"
 },
 {
   "name": "Basile's",
   "type": "Pizza",
   "address": "89 Washington St, Hoboken, NJ 07030-4526",
   "description": "A menu of classic, creative, & build-your-own pizzas by the slice or pie with limited seating.",
   "url": "https://www.mybasilespizza.com/"
 },
 {
   "name": "Dino & Harrys",
   "type": "Steakhouse",
   "address": "163 14th St, Hoboken, NJ 07030-4452",
   "description": "Classic steakhouse housed in a 19th-century saloon with stained glass, a tin ceiling & live music.",
   "url": "https://www.dinoandharrys.com/"
 },
 {
   "name": "Satay",
   "type": "Malaysian",
   "address": "99 Washington St, Hoboken, NJ 07030-4586",
   "description": "Malaysian Culture Food in Satay Malaysian Cuisine Resturaunt",
   "url": "https://satay1.com/"
 },
 {
   "name": "Arthur's",
   "type": "Steakhouse",
   "address": "237 Washington St, Hoboken, NJ 07030-4738",
   "description": "Steaks & burgers are served on checkered tablecloths at this longtime, no-reservations eatery.",
   "url": "https://arthurshoboken.com/"
 },
 {
   "name": "Halifax",
   "type": "American",
   "address": "225 River Street, Hoboken, NJ 07030",
   "description": "Sleek destination inside the W Hotel offering New American eats made with farm-fresh ingredients.",
   "url": "https://www.halifaxhoboken.com/"
 },
 {
   "name": "Leo's Grandevous",
   "type": "Italian",
   "address": "200 Grand St Ste A, Hoboken, NJ 07030-8546",
   "description": "Mainstay from 1939 serving Italian classics & cocktails in an old-school setting with Sinatra tunes.",
   "url": "https://www.leosgrandevous.com/"
 },
 {
   "name": "Tony Boloney's",
   "type": "Pizza",
   "address": "263 1st St, Hoboken, NJ 07030-4191",
   "description": "Hip, buzzing spot for creatively named pizzas, subs & other snacks, with inventive topping options.",
   "url": "https://www.tonyboloneys.com/"
 },
 {
   "name": "Anthony David's Gourmet",
   "type": "American",
   "address": "953 Bloomfield St, Hoboken, NJ 07030-5107",
   "description": "Creative Italian BYOB spot for dinner/brunch served in a storefront gourmet shop or on the sidewalk.",
   "url": "https://anthonydavids.com/"
 },
 {
   "name": "Bareburger",
   "type": "American",
   "address": "515 Washington St, Hoboken, NJ 07030-4997",
   "description": "Casual, eco-minded regional chain for organic burgers (from beef to bison) & more, plus beer & wine.",
   "url": "https://bareburger.com/"
 },
 {
   "name": "Johnny Rockets",
   "type": "American",
   "address": "134 Washington St, Hoboken, NJ 07030-4604",
   "description": "Burgers, shakes & fries arrive in a retro setting at this outpost of the international chain.",
   "url": "https://locations.johnnyrockets.com/ll/US/NJ/Hoboken/134-Washington-St_"
 },
 {
   "name": "Margherita's ",
   "type": "Italian",
   "address": "740 Washington St, Hoboken, NJ 07030-5015",
   "description": "This lively pizzeria features signature pies, housemade pastas & outdoor seating.",
   "url": "https://www.margheritasrestaurant.com/"
 },
 {
   "name": "The Brass Rail",
   "type": "American",
   "address": "135 Washington St, Hoboken, NJ 07030",
   "description": "Lively bar scene on the street level & a New American menu served in an upstairs dining room.",
   "url": "http://thebrassrailnj.com/"
 },
 {
   "name": "Lisa's Italian Deli",
   "type": "Deli",
   "address": "901 Park Ave, Hoboken, NJ 07030-4277",
   "description": "Veteran, family-run Italian deli counter selling breakfast, pasta dishes & hot & cold sandwiches.",
   "url": "http://www.lisasdeli.com/"
 },
];

const barsData = [
  {
    name: "The Pig and the Parrot",
    type: "Tropical",
    address: "77 Hudson Street, Hoboken, NJ 07030",
    description:
      "It's a Happy Place! The Pig & Parrot is a Key West type Bar & Grill with tropical food & drink menu. Fun atmosphere & music that you love to hear but no one plays: Bob Marley, Jimmy Buffet, Kenny Chesney.",
    url: "https://www.thepigandparrot.com/hoboken",
  },
 {
   "name": "The Cuban",
   "type": "Cuban",
   "address": "333 Washington St, Hoboken, NJ 07030-4871",
   "description": "This bi-level restaurant offers Cuban fare, daily specials & live music in a stylish setting.",
   "url": ""
 },
 {
   "name": "Court Street",
   "type": "American",
   "address": "61 6th St Ste A, Hoboken, NJ 07030-4945",
   "description": "Classic American surf & turf plus Continental faves in a cozy white-tablecloth space with a bar.",
   "url": "https://www.courtstreet.com/"
 },
 {
   "name": "Pilsener Haus",
   "type": "German",
   "resturaunt": "",
   "bar": "Y",
   "address": "1422 Grand St, Hoboken, NJ 07030",
   "description": "Sausages, beer & other Austrian-Hungarian favorites served at communal tables indoors & out.",
   "url": "https://www.pilsenerhaus.com/"
 },
 {
   "name": "Carpe Diem",
   "type": "American",
   "address": "1405 Grand St, Hoboken, NJ 07030-2322",
   "description": "Convivial haunt featuring Irish pub grub & a large beer list, plus a fireplace & outdoor seating.",
   "url": "https://www.carpediemhoboken.com/menus"
 },
 {
   "name": "Del Frisco's",
   "type": "Steakhouse",
   "address": "221 River St, Hoboken, NJ 07030",
   "description": "Sophisticated chophouse chain serving steak, seafood, sandwiches & cocktails in a trendy space.",
   "url": "https://www.delfriscosgrille.com/location/del-friscos-grille-hoboken-nj/#menus"
 },
 {
   "name": "The Madison",
   "type": "Pizza",
   "address": "1316 Washington St, Hoboken, NJ 07030-5534",
   "description": "New American fare & drink specials in a roadhouse-style space that's bustling on weekends.",
   "url": "https://www.madisonbarandgrill.com/"
 },
 {
   "name": "Bin 14 Bistro",
   "type": "Spanish",
   "address": "1314 Washington St, Hoboken, NJ 07030-5535",
   "description": "Upscale wine bar where various vintages are pairable with a menu of Italian small plates.",
   "url": "http://bin14.com/"
 },
 {
   "name": "The Brass Rail",
   "type": "American",
   "address": "135 Washington St, Hoboken, NJ 07030",
   "description": "Lively bar scene on the street level & a New American menu served in an upstairs dining room.",
   "url": "http://thebrassrailnj.com/"
 }
];

const main = async () => {
  console.log("Seeding restaurants...");
  const restaurantsCollection = await restaurants();
  let insertInfo = await restaurantsCollection.insertMany(restaurantsData);
  console.log(`Inserted ${insertInfo.insertedCount} restaurants`);
  const barsCollection = await bars();
  insertInfo = await barsCollection.insertMany(barsData);
  console.log(`Inserted ${insertInfo.insertedCount} bars`);
};

main();
