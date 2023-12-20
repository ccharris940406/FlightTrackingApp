import React from "react"
import { searchParamsType } from "./SearchForm"
import useGetFligth from "app/services/flightHandle"
import { Text } from "./Text"
import { FlightInfo } from "./FlightInfo"

export type FligthInfoWrapperProps = {
  value: string
  param: searchParamsType
}
export default function FligthInfoWrapper({ value, param }: FligthInfoWrapperProps) {
  const { data, isLoading, error } = useGetFligth({ value, param })
  if (isLoading) return <Text text="Loading..." />
  if (error) return <Text text="Error" />
  return data && <FlightInfo flight={data} />
}
