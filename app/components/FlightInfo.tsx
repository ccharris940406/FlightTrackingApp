import React from "react"
import { Text } from "./Text"
import { View, ViewStyle } from "react-native"
import CountryFlag from "react-native-country-flag"

export type Flight = {
  flag: string
  lat: number
  lng: number
  alt: number
  dir: number
  speed: number
  flight_number: string
  flight_icao: string
  flight_iata: string
}

type flightInfoProps = {
  flight: Flight
}

export function FlightInfo(props: flightInfoProps) {
  return (
    <View>
      <View>
        <CountryFlag style={$country} isoCode={props.flight.flag} size={30} />
        <Text text={`Flight Number: ${props.flight.flight_number}`} />
        <Text text={`ICAO: ${props.flight.flight_icao}`} />
        <Text text={`IATA: ${props.flight.flight_iata}`} />
        <Text text={`LAT: ${props.flight.lat.toString()}`} />
        <Text text={`LNG: ${props.flight.lng.toString()}`} />
        <Text text={`ALT: ${props.flight.alt.toString()}`} />
        <Text text={`DIR: ${props.flight.dir.toString()}`} />
        <Text text={`SPEED: ${props.flight.speed.toString()}`} />
      </View>
    </View>
  )
}

const $country : ViewStyle = {
  alignSelf: "center"
}
