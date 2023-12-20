import Config from "app/config"
import { Fligth, searchParamsType } from "app/components"
import useSWR from "swr"

const fetcher = async (key: string) => {
  const res = await fetch(`${Config.API_URL}${key}&api_key=${Config.API_KEY}`)
  if (!res.ok) {
    throw new Error("Error obtainig data")
  }
  console.log(`${Config.API_URL}${key}&api_key=${Config.API_KEY}`)
  const data = await res.json()
  const responseData: Fligth = {
    flag: data.response.flag,
    lat: data.response.lat,
    lng: data.response.lng,
    alt: data.response.alt,
    dir: data.response.dir,
    speed: data.response.speed,
    flight_number: data.response.flight_number,
    flight_icao: data.response.flight_icao,
    flight_iata: data.response.flight_iata,
  }
  console.log(responseData)
  return responseData
}

type useGetFligthProps = {
  value: string
  param: searchParamsType
}

export default function useGetFligth({ value, param }: useGetFligthProps) {
  const { data, isLoading, error } = useSWR(`flight?${param}=${value}`, fetcher)
  return { data, isLoading, error }
}
