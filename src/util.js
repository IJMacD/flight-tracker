export function getPosition (bounds, longitude, latitude) {
  return {
    x: (longitude - bounds.min_lon)/(bounds.max_lon - bounds.min_lon) * bounds.width,
    y: (latitude - bounds.min_lat)/(bounds.max_lat - bounds.min_lat) * bounds.height,
  }
}