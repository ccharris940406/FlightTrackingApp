import { useState, useEffect } from "react"

import * as Location from "expo-location"
export default function useGeolocation() {
  const [errorMsg, setErrorMsg] = useState<string | undefined>(undefined)
  const [location, setLocation] = useState<Location.LocationObject | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    ;(async () => {
      setIsLoading(true)
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied")
        return
      }

      const currentLocation = await Location.getCurrentPositionAsync({})
      setLocation(currentLocation)
      setIsLoading(false)
    })()
  }, [])

  return { errorMsg, location, isLoading }
}
