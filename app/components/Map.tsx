import useGeolocation from "app/services/useGeolocation"
import React from "react"
import { ViewStyle } from "react-native"
import MapView from "react-native-maps"
import boundingBox from "app/utils/boundingBox"
import MapMarkers from "./MapMarkers"

export function Map() {
  const { location } = useGeolocation()

  if (location !== undefined) {
    const { latMax, latMin, lonMin, lonMax } = boundingBox(
      location.coords.latitude,
      location.coords.longitude,
      5,
    )

    return (
      location && (
        <MapView
          region={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.09,
            longitudeDelta: 0.04,
          }}
          style={$map}
        >
          <MapMarkers {...{ latMin, lonMin, latMax, lonMax }} />
        </MapView>
      )
    )
  }
  return <MapView style={$map} />
}

const $map: ViewStyle = {
  width: "100%",
  height: "100%",
}
