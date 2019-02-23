/* eslint-disable */
import Directions from '@mapquest/directions'

const directions = new Directions({ key: process.env.MAPQUEST_KEY });
 
const getRouteToWork = (a,b) => {
  return directions.route({
    locations: [
      '-23.561365, -46.687630',
      '-23.560023, -46.687979'
    ],
    maxRoutes: 2,
    timeOverage: 99
  })
  .then(function(results){
      const { distance, formattedTime, name} = results.properties
      const firstRouteId = results.properties.routeSessionIds[0];  //access routeSessionIds here

      return {
        distance,
        formattedTime,
        name
      }
  })
}

export default getRouteToWork