import Config from "app/config"
import { Flight } from "app/components"
import useSWR from "swr"

const fetcher = async (key: string) => {
  const res = await fetch(`${Config.API_URL}${key}&api_key=${Config.API_KEY}`)
  if (!res.ok) {
    throw new Error("Error obtainig data")
  }
  console.log(`${Config.API_URL}${key}&api_key=${Config.API_KEY}`)
  const data = await res.json()
  const responseData: Flight[] = data.response
  return responseData
}

type useGetFlightsProps = {
  latMin: number
  lonMin: number
  latMax: number
  lonMax: number
}

export default function useGetFlights({ latMin, lonMin, latMax, lonMax }: useGetFlightsProps) {
  const { data, isLoading, error } = useSWR(
    `flights?bbox=${latMin},${lonMin},${latMax},${lonMax}`,
    fetcher,
  )
  return { data, isLoading, error }
}
