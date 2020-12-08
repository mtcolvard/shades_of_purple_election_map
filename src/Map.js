import React, { useRef, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import Legend from './components/Legend'
import Optionsfield from './components/Optionsfield'
import './Map.css'
import election_data from './election_data.json'
import data from './state_geometry.json'

mapboxgl.accessToken =
  'pk.eyJ1IjoibXRjb2x2YXJkIiwiYSI6ImNraHF2MXA4aDBkajUyem1zaXRmYWJjbDUifQ.97qiz4KJ02kEjzajDF-WFw'


// const Map = () => {
  // const options = [
  //   {
  //     name: 'Population',
  //     description: 'Estimated total population',
  //     property: 'pop_est',
  //     stops: [
  //       [0, '#f8d5cc'],
  //       [1000000, '#f4bfb6'],
  //       [5000000, '#f1a8a5'],
  //       [10000000, '#ee8f9a'],
  //       [50000000, '#ec739b'],
  //       [100000000, '#dd5ca8'],
  //       [250000000, '#c44cc0'],
  //       [500000000, '#9f43d7'],
  //       [1000000000, '#6e40e6']
  //     ]
  //   },
  //   {
  //     name: 'GDP',
  //     description: 'Estimate total GDP in millions of dollars',
  //     property: 'gdp_md_est',
  //     stops: [
  //       [0, '#f8d5cc'],
  //       [1000, '#f4bfb6'],
  //       [5000, '#f1a8a5'],
  //       [10000, '#ee8f9a'],
  //       [50000, '#ec739b'],
  //       [100000, '#dd5ca8'],
  //       [250000, '#c44cc0'],
  //       [5000000, '#9f43d7'],
  //       [10000000, '#6e40e6']
  //     ]
  //   }
  // ]
  const mapContainerRef = useRef(null)
  // const [active, setActive] = useState(options[0])
  const [map, setMap] = useState(null)
  // const electionData = election_data

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mtcolvard/ckhp8n7eg01mn19p7qkyeda6c',
      center: [-95.4, 37.6],
      zoom: 3.5
    })

    map.on('load', () => {
      map.addSource('electionNumbers', {
        'type': 'vector',
        'url': 'mapbox://styles/mtcolvard/ckifazn3008wo19o2faxvjc7c',
      })

      map.addLayer(
        {
          'id': 'purpleShade',
          'type': 'fill',
          'source': 'electionNumbers',
          'source-layer': 'purple-maps-data-join-2-6th2yr',
          'paint': {
            'fill-color': [
              'interpolate',
              ['linear'],
              ['*',['to-number',['get','Purple Maps State Results edit_dem_total']],100],
              0, '#ff0000', 100, '#0000ff'
            ]
          }
        })

      // map.setPaintProperty('stateBoundaries', 'fill-color', {
      //   property: active.property,
      //   stops: active.stops
      // })

      setMap(map)
    })

    // Clean up on unmount
    return () => map.remove()
  }, [])

  // useEffect(() => {
  //   paint()
  // }, [active])
  //
  // const paint = () => {
  //   if (map) {
  //     map.setPaintProperty('data', 'fill-color', {
  //       property: active.property,
  //       stops: active.stops
  //     })
  //   }
  // }
  //
  // const changeState = i => {
  //   setActive(options[i])
  //   map.setPaintProperty('data', 'fill-color', {
  //     property: active.property,
  //     stops: active.stops
  //   })
  // }
  //
  // let matchExpression = ['match', ['get', 'STATEFP']]
  //
  // electionData.forEach( electionResult => {
  //   const color = stateElection['dem_percent_2020']
  // })


  return (
    <div>
      <div ref={mapContainerRef} className='map-container' />
    </div>
  )
}

export default Map

<Legend active={active} stops={active.stops} />
<Optionsfield
  options={options}
  property={active.property}
  changeState={changeState}
/>
