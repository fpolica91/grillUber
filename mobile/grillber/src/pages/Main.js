import React, { useState, useEffect } from "react";
import MapView, { Marker, Callout } from "react-native-maps";
import {
  requestPermissionsAsync,
  getCurrentPositionAsync
} from "expo-location";
import grill from "../images/grill.png";
import { StyleSheet, Image } from "react-native";
import api from "./services/api";

const Main = ({ navigation }) => {
  const [region, setRegion] = useState(null);
  const [rentals, setRentals] = useState([]);

  useEffect(() => {
    async function loadPos() {
      const { granted } = await requestPermissionsAsync();
      if (granted) {
        const { coords } = await getCurrentPositionAsync({
          enableHighAccuracy: true
        });
        const { latitude, longitude } = coords;
        setRegion({
          latitude,
          longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04
        });
      }
    }
    loadPos();
    findGrills();
  }, []);

  async function findGrills() {
    const response = await api.get("/rentals");
    const { data } = response;
    setRentals(data);
  }

  if (!region) return null;

  return (
    <>
      <MapView style={styles.map} initialRegion={region}>
        {rentals.map(rental => (
          <>
            <Marker
              key={rental._id}
              coordinate={{
                longitude: rental.location.coordinates[0],
                latitude: rental.location.coordinates[1]
              }}
            >
              <Image
                style={styles.grill}
                source={{
                  uri:
                    "https://cdn3.iconfinder.com/data/icons/holidays-15/34/24-512.png"
                }}
              />
            </Marker>
          </>
        ))}
      </MapView>
    </>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1
  },
  grill: {
    width: 40,
    height: 40,
    borderRadius: 4,
    borderWidth: 4,
    borderColor: "transparent"
  }
});

export default Main;
