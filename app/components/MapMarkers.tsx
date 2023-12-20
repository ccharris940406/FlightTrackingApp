import React from "react"
import useGetFlights from "app/services/fligthsHandle"
import { Marker } from "react-native-maps"

export default function MapMarkers({
  latMin,
  lonMin,
  latMax,
  lonMax,
}: {
  latMin: number
  lonMin: number
  latMax: number
  lonMax: number
}) {
  const { data } = useGetFlights({ latMin, lonMin, latMax, lonMax })

  if (data)
    return data.map((item,index) => {
      return (
        <Marker
          title={item.flight_iata}
          description={item.flag}
          key={index}
          coordinate={{ latitude: item.lat, longitude: item.lng }}
        />
      )
    })
  return <></>
}
