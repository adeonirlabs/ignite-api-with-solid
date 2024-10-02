export interface Coordinates {
  latitude: number
  longitude: number
}

export function getDistance(from: Coordinates, to: Coordinates) {
  const EARTH_RADIUS = 6371

  const fromRadian = (Math.PI * from.latitude) / 180
  const toRadian = (Math.PI * to.latitude) / 180
  const theta = from.longitude - to.longitude
  const radTheta = (Math.PI * theta) / 180

  const distance =
    EARTH_RADIUS *
    Math.acos(
      Math.cos(fromRadian) * Math.cos(toRadian) * Math.cos(radTheta) +
        Math.sin(fromRadian) * Math.sin(toRadian)
    )

  return distance
}
