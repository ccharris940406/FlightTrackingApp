import { observer } from "mobx-react-lite"
import React, { FC, useState } from "react"
import {
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native"
import { AppStackScreenProps } from "../navigators"
import { colors } from "../theme"
import { Map, SearchForm, Text, searchParamsType } from "app/components"
import { TouchableWithoutFeedback } from "react-native-gesture-handler"
import FligthInfoWrapper, { FligthInfoWrapperProps } from "app/components/FligthInfoWrapper"
import NearFlightsListWrapper from "app/components/NearFlightsListWrapper"

interface WelcomeScreenProps extends AppStackScreenProps<"Welcome"> {}

export const WelcomeScreen: FC<WelcomeScreenProps> = observer(function WelcomeScreen() {
  const [value, setValue] = useState<FligthInfoWrapperProps | undefined>(undefined)

  const handleSearch = (value: string, param: searchParamsType) => {
    setValue({
      value,
      param,
    })
  }

  return (<>
    <KeyboardAvoidingView
      style={$container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={$mapContainer}>
        <Map />
      </View>
      <TouchableWithoutFeedback style={$searchFormContainer} onPress={Keyboard.dismiss}>
        <View style={$searchFormContainer}>
          <SearchForm onSearch={handleSearch} />
        </View>
      </TouchableWithoutFeedback>
      <View style={$fligthsListContainer}>
        <NearFlightsListWrapper />
      </View>

    </KeyboardAvoidingView>
      <Modal transparent={true} visible={!!value} onRequestClose={() => setValue(undefined)}>
        <View style={$modalViewContainer}>
          <View style={$modalView}>
            {!!value && <FligthInfoWrapper {...value} />}
            <TouchableOpacity style={$buttonModal} onPress={() => setValue(undefined)}>
              <Text text="Ok" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal></>
  )
})

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
}

const $mapContainer: ViewStyle = {
  flexShrink: 1,
  flexBasis: "45%",
  justifyContent: "center",
}

const $fligthsListContainer: ViewStyle = {
  flex: 1,
  backgroundColor: colors.palette.neutral100,
  justifyContent: "space-around",
}

const $searchFormContainer: ViewStyle = {}

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

