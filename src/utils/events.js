import jwtDecode from "jwt-decode";
import axios from "axios";
import {
  deviceType,
  osName,
  browserName,
  mobileVendor,
} from "react-device-detect";
import { getCustomerById } from "../services/customer";
import moment from "moment";

export const getTimeOfTheDay = (timestamp) => {
  let hour = new Date(timestamp).getHours();

  if (hour >= 6 && hour < 12) return "MORNING";
  else if (hour >= 12 && hour < 17) return "AFTERNOON";
  else if (hour >= 17 && hour < 20) return "EVENING";
  else return "NIGHT";
};

export const getSeasonOfTheYear = (timestamp) => {
  let month = new Date(timestamp).getMonth();

  if (month === 11) return "CHRISTMAS";
  else if (month === 0) return "NEW YEAR";
  else if (month === 3) return "SRI LANKAN NEW YEAR";
  else return "USUAL";
};

export const getUserAgeGroup = (userDob) => {
  if (!userDob) return;

  let today = moment(new Date());
  let dob = moment(userDob);
  let age = today.diff(dob, "years");

  if (age < 10) return "0-9";
  else if (age >= 10 && age < 15) return "10-14";
  else if (age >= 15 && age < 20) return "15-19";
  else if (age >= 20 && age < 25) return "20-24";
  else if (age >= 25 && age < 30) return "25-29";
  else if (age >= 30 && age < 35) return "30-34";
  else if (age >= 35 && age < 40) return "35-39";
  else if (age >= 40 && age < 45) return "40-44";
  else if (age >= 45 && age < 50) return "45-49";
  else if (age >= 50) return "50+";
};

export const getCurrentUser = async () => {
  let user;
  const jwt = localStorage.getItem("customer-token");
  if (jwt) user = jwtDecode(jwt);

  let userId;

  let userData = {
    userAgeGroup: null,
    userId: null,
  };
  let ageGroup = null;
  if (user) {
    let userD = await getCustomerById(user?._id);
    userData = { ...userData, ...userD };
    if (userData?.dob) {
      ageGroup = getUserAgeGroup(userData.dob);
    }
  } else {
    userId = localStorage.getItem("customer-temporary-token");
    userData = { ...userData, _id: userId };
  }

  userData.userAgeGroup = ageGroup;

  return userData;
};

export const getIPaddress = async () => {
  let ipAddress;
  try {
    const res = await axios.get("http://geolocation-db.com/json/");
    ipAddress = res.data.IPv4;
  } catch (e) {
    ipAddress = null;
  }

  return ipAddress;
};

export const getLocation = async () => {
  let latitude;
  let longitude;
  let location;

  if (!navigator.geolocation) {
    location = null;
  } else {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
      },
      () => {
        location = null;
      }
    );
  }

  try {
    const res = await axios.get(
      "https://api.bigdatacloud.net/data/reverse-geocode-client",
      { params: { latitude, longitude } }
    );
    location = res.data;
  } catch (e) {
    location = null;
  }

  return location;
};

export const generateEvent = async (product, eventType, timeDuration) => {
  let user = await getCurrentUser();
  let ipAddress = await getIPaddress();
  let location = await getLocation();

  let timestamp = new Date();
  let timeOfTheDay = getTimeOfTheDay(timestamp);
  let season = getSeasonOfTheYear(timestamp);

  const eventData = {
    timestamp: timestamp,
    date: timestamp.toLocaleDateString(),
    time: timestamp.toLocaleTimeString(),
    timeOfTheDay: timeOfTheDay,
    season: season,
    productId: product._id,
    userId: user ? user._id : null,
    userAgeGroup: user ? user.userAgeGroup : null,
    isLoggedUser: user.email ? true : false,
    isDiscounted: product.discount !== "0",
    event: eventType,
    duration: timeDuration,
    ip: ipAddress,
    location: location.locality,
    device: deviceType,
    os: osName,
    browser: browserName,
    mobile: mobileVendor,
  };

  return eventData;
};
