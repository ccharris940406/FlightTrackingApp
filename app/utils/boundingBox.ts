const deg2rad = (degrees: number): number => {
  return (Math.PI * degrees) / 180.0
}

const rad2deg = (radians: number): number => {
  return (180.0 * radians) / Math.PI
}

const WGS84EarthRadius = (lat: number): number => {
  const wgs84A = 6378137.0 // Semieje mayor [m]
  const wgs84B = 6356752.3 // Semieje menor [m]
  const An = wgs84A * wgs84A * Math.cos(lat)
  const Bn = wgs84B * wgs84B * Math.sin(lat)
  const Ad = wgs84A * Math.cos(lat)
  const Bd = wgs84B * Math.sin(lat)
  return Math.sqrt((An * An + Bn * Bn) / (Ad * Ad + Bd * Bd))
}

const boundingBox = (
  latitudeInDegrees: number,
  longitudeInDegrees: number,
  halfSideInKm: number,
) => {
  const lat = deg2rad(latitudeInDegrees)
  const lon = deg2rad(longitudeInDegrees)
  const halfSide = 1000 * halfSideInKm

  // Radius of Earth at given latitude
  const radius = WGS84EarthRadius(lat)
  // Radius of the parallel at given latitude
  const pradius = radius * Math.cos(lat)

  const latMin = lat - halfSide / radius
  const latMax = lat + halfSide / radius
  const lonMin = lon - halfSide / pradius
  const lonMax = lon + halfSide / pradius

  return {
    latMin: rad2deg(latMin),
    lonMin: rad2deg(lonMin),
    latMax: rad2deg(latMax),
    lonMax: rad2deg(lonMax),
  }
}

export default boundingBox
