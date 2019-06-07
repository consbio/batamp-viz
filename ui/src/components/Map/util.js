import geoViewport from '@mapbox/geo-viewport'

/**
 * Calculate the appropriate center and zoom to fit the bounds, given padding.
 * @param {Array(number)} bounds - [xmin, ymin, xmax, ymax]
 * @param {int} width - width of the map node in pixels
 * @param {int} height - height of the map node in pixels
 * @param {float} padding - proportion of calculated zoom level to zoom out by, to pad the bounds
 */
export const getCenterAndZoom = (bounds, width, height, padding = 0) => {
  const viewport = geoViewport.viewport(
    bounds,
    [width, height],
    undefined,
    undefined,
    undefined,
    true
  )

  // Zoom out slightly to pad around bounds

  const zoom = Math.max(viewport.zoom - 1, 0) * (1 - padding)

  return { center: viewport.center, zoom }
}

export const toGeoJSONPoint = (record, x = 'lon', y = 'lat') => {
  const properties = {}
  Object.keys(record)
    .filter(f => f !== x && f !== y)
    .forEach(f => {
      properties[f] = record[f]
    })

  const feature = {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [record[x], record[y]],
    },
    properties,
  }

  const { id } = record
  if (id !== undefined && id !== null) {
    feature.id = id
  }

  return feature
}

export const toGeoJSONPoints = records => ({
  type: 'FeatureCollection',
  features: records.map(r => toGeoJSONPoint(r)),
})

export const boundsOverlap = (
  [xmin, ymin, xmax, ymax],
  [xmin2, ymin2, xmax2, ymax2]
) => ymax2 >= ymin && ymin2 <= ymax && xmax2 >= xmin && xmin2 <= xmax

// returns true if lat / lon is within bounds
export const withinBounds = ({ lat, lon }, [xmin, ymin, xmax, ymax]) =>
  lon >= xmin && lon <= xmax && lat >= ymin && lat <= ymax

/**
 * Convert a list of objects into mapbox step expression
 * @param {Array of objects} entries - list of objects to map to steps, each must have {threshold, property}
 * @param {string} property  - property to assign to each step, e.g., radius
 */
export const createSteps = (entries, property) => {
  const steps = []
  entries.forEach(({ threshold, ...entry }, i) => {
    steps.push(entry[property])

    // omit the last threshold
    if (i < entries.length - 1) {
      steps.push(threshold)
    }
  })
  return steps
}

/**
 * Calculate the bounds that contain the points: [xmin, ymin, xmax, ymax].
 * Note: only implemented for points!
 *
 * @param {Array} geometries - Array of point GeoJSON geometries
 */
export const calculateBounds = geometries => {
  return geometries
    .map(({ coordinates }) => coordinates)
    .reduce(
      ([xmin, ymin, xmax, ymax], [lng, lat]) => {
        return [
          xmin === null ? lng : Math.min(xmin, lng),
          ymin === null ? lat : Math.min(ymin, lat),
          xmax === null ? lng : Math.max(xmax, lng),
          ymax === null ? lat : Math.max(ymax, lat),
        ]
      },
      [null, null, null, null]
    )
}
