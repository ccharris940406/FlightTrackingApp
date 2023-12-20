import React from "react"
import { Text } from "./Text"
import boundingBox from "app/utils/boundingBox"
import NearFligthsList from "./NearFlightsList"
import useGeolocation from "app/services/useGeolocation"

export default function NearFlightsListWrapper() {
  const { isLoading, errorMsg, location } = useGeolocation()

  if (isLoading === true) return <Text text="Loading data position..." />
  if (errorMsg !== undefined) return <Text text={errorMsg} />
  if (location !== undefined) {
    const { latMax, latMin, lonMin, lonMax } = boundingBox(
      location.coords.latitude,
      location.coords.longitude,
      1000,
    )
    return <NearFligthsList {...{ latMin, lonMin, latMax, lonMax }} />
  }
  return <></>
}
