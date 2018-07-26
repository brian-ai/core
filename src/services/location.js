import Directions from '@mapquest/directions'

const directions = new Directions({ key: process.env.MAPQUEST_KEY });
 
const getRouteToWork = (a,b) => {
  return directions.route({
    locations: [
      'Rua Combatentes 9 de Abril, 5, Odivelas',
      'R. Polo Sul 2, Lisboa'
    ],
    maxRoutes: 2,
    timeOverage: 99
  })
  .then(function(results){
      const { distance, formattedTime, name} = results.properties
      // const firstRouteId = results.properties.routeSessionIds[0];  //access routeSessionIds here
      // console.log(directions.getShape(firstRouteId))
      // return directions.getShape(firstRouteId)   //get the detailed route shape

      return {
        distance,
        formattedTime,
        name
      }
  })
}

export default getRouteToWork