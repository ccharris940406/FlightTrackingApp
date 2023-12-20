import React, { useState } from "react"
import { View, ViewStyle } from "react-native"
import { TextField } from "./TextField"
import { Text } from "./Text"
import { TouchableOpacity } from "react-native-gesture-handler"
import { colors } from "app/theme"
import { AntDesign } from "@expo/vector-icons"
export type searchParamsType = "flight_iata" | "flight_icao"

type SearchFormPropsType = {
  onSearch: (searchValue: string, searchParam: searchParamsType) => void
}

export function SearchForm({ onSearch }: SearchFormPropsType) {
  const [param, setParam] = useState<searchParamsType>("flight_iata")
  const [value, setValue] = useState("")

  const handleSetSearchParam = (param: searchParamsType) => {
    setParam(param)
  }
  return (
    <View style={$formContainer}>
      <View style={$inputContainer}>
        <View style={$searchParamsContainer}>
          <TouchableOpacity
            style={param === "flight_iata" ? $selectedSearchParam : $searchParam}
            onPress={() => handleSetSearchParam("flight_iata")}
          >
            <Text text="IATA" />
          </TouchableOpacity>
          <TouchableOpacity
            style={param === "flight_icao" ? $selectedSearchParam : $searchParam}
            onPress={() => handleSetSearchParam("flight_icao")}
          >
            <Text text="ICAO" />
          </TouchableOpacity>
        </View>
        <TextField
          placeholder={param === "flight_iata" ? "UA1984" : "BCS8350"}
          onChangeText={(val) => setValue(val)}
          value={value}
        />
      </View>
      <TouchableOpacity style={$button} onPress={() => onSearch(value, param)}>
        <AntDesign name="search1" size={24} color="black" />
      </TouchableOpacity>
    </View>
  )
}

const $formContainer: ViewStyle = {
  gap: 4,
  padding: 10,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
}

const $inputContainer: ViewStyle = {
  flex: 1,
  alignSelf: "center",
  gap: 6,
  flexDirection: "column",
  justifyContent: "center",
}

const $searchParamsContainer: ViewStyle = {
  justifyContent: "space-around",
  flexDirection: "row",
}

const $searchParam: ViewStyle = {
  borderRadius: 4,
  borderWidth: 1,
  padding: 5,
}
const $selectedSearchParam: ViewStyle = {
  ...$searchParam,
  backgroundColor: colors.palette.secondary100,
}

const $button: ViewStyle = {
  display: "flex",
  padding: 4,
}
