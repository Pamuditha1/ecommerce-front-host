import jwtDecode from "jwt-decode";
import axios from "axios";
import {
  deviceType,
  osName,
  browserName,
  mobileVendor,
} from "react-device-detect";

export const getTimeOfTheDay = (timestamp) => {
  let hour = new Date(timestamp).getHours();

  if (hour >= 6 && hour < 12) return "MORNING";
  else if (hour >= 12 && hour < 17) return "AFTERNOON";
  else if (hour >= 17 && hour < 20) return "EVENING";
  else return "NIGHT";
};

export const getCurrentUser = () => {
  let user;
  const jwt = localStorage.getItem("customer-token");
  if (jwt) user = jwtDecode(jwt);

  return user;
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
  let user = getCurrentUser();
  let ipAddress = await getIPaddress();
  let location = await getLocation();

  let timestamp = new Date();
  let timeOfTheDay = getTimeOfTheDay(timestamp);

  const eventData = {
    timestamp: timestamp,
    date: timestamp.toLocaleDateString(),
    time: timestamp.toLocaleTimeString(),
    timeOfTheDay: timeOfTheDay,
    productId: product._id,
    userId: user._id,
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
