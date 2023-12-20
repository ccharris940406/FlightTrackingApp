import React, { useState } from "react"
import { Text } from "./Text"
import CountryFlag from "react-native-country-flag"
import useGetFlights from "app/services/fligthsHandle"
import { ListView } from "./ListView"
import { ListItem } from "./ListItem"
import { View, ViewStyle, Modal, TouchableOpacity } from "react-native"
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons"
import { colors } from "app/theme"
import { Flight, FlightInfo } from "./FlightInfo"

export default function NearFligthsList({
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
  const { data, isLoading, error } = useGetFlights({ latMin, lonMin, latMax, lonMax })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedFlight, setSelectedFlight] = useState<Flight | undefined>(undefined)

  if (isLoading) return <Text text="Loading nearest flights ..." />
  if (error) return <Text text="Error" />

  return (
    data && (
      <>
        <ListView
          estimatedItemSize={100}
          data={data}
          renderItem={({ item }) => (
            <ListItem
              style={$listItemStyle}
              bottomSeparator
              height={60}
              RightComponent={
                <View style={$itemContainer}>
                  <View style={$supportField}>
                    <Text text={item.speed.toString()} />
                    <MaterialIcons name="speed" size={24} color="black" />
                  </View>
                  <View style={$supportField}>
                    <Text text={item.lat.toFixed(1).toString()} />
                    <MaterialCommunityIcons name="latitude" size={24} color="black" />
                  </View>
                  <View style={$supportField}>
                    <Text text={item.lng.toFixed(1).toString()} />
                    <MaterialCommunityIcons name="longitude" size={24} color="black" />
                  </View>
                  <CountryFlag isoCode={item.flag} size={25} />
                </View>
              }
              onPress={() => {
                setIsModalOpen(true)
                setSelectedFlight(item)
              }}
              text={`IATA: ${item.flight_iata}`}
            />
          )}
        />
        <Modal
          transparent={true}
          visible={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
        >
          <View style={$modalViewContainer}>
            <View style={$modalView}>
              { selectedFlight && 
              <FlightInfo flight={selectedFlight} /> }
              <TouchableOpacity style={$buttonModal} onPress={() => setIsModalOpen(false)}>
                <Text text="Ok" />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </>
    )
  )
}

const $listItemStyle: ViewStyle = {
  paddingHorizontal: 10,
}

const $itemContainer: ViewStyle = {
  flex: 1,
  flexDirection: "row",
  alignItems: "center",
  alignSelf: "center",
  alignContent: "space-between",
  justifyContent: "flex-end",
  display: "flex",
  gap: 10,
}

const $supportField: ViewStyle = {
  alignItems: "center",
  alignSelf: "center",
}
const $modalViewContainer: ViewStyle = {
  display: "flex",
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  marginTop: 22,
}

const $modalView: ViewStyle = {
  backgroundColor: "#f4f4f4",
  shadowColor: colors.text,
  shadowRadius: 2,
  shadowOpacity: 0.8,
  shadowOffset: { width: 2, height: 1 },
  elevation: 9,
  width: "90%",
  display: "flex",
  margin: 20,
  borderRadius: 5,
  padding: 20,
}

const $buttonModal: ViewStyle = {
  alignSelf: "center",
}
