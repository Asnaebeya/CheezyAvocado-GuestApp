import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:3000",
});

// export default axios.create({
//     baseURL: "https://cheezyavocado.herokuapp.com/staff",
// });

// import Guestapi from "../api/api"
//     Guestapi.get("/getFoodOrders")

// axios.get("http....").then((response) => {
//     console.log(response.data);
// });

// async function getRequest(type = "food") {
//     const response = await axios.get("http...");
//     console.log(response.data);
// }
