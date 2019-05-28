import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { List, fromJS } from 'immutable'

import Layout from 'components/Layout'
import { Text } from 'components/Text'
import {
  hasValue,
  Provider as CrossfilterProvider,
  FilteredMap as Map,
} from 'components/Crossfilter'
// import Map from 'components/Map'
import Sidebar from 'components/Sidebar'
import { Column, Columns, Flex } from 'components/Grid'
import styled, { themeGet } from 'style'
import { formatNumber } from 'util/format'
import { GraphQLArrayPropType } from 'util/graphql'
import { NABounds } from '../../config/constants'

const Wrapper = styled(Flex)`
  height: 100%;
`

const Header = styled.div`
  padding: 0.5rem 1rem;
  background-color: ${themeGet('colors.highlight.100')};
  line-height: 1.2;
`

const CommonName = styled(Text).attrs({ as: 'h1' })`
  margin: 0;
  font-weight: normal;
`

const ScientificName = styled(Text).attrs({ as: 'h3' })`
  margin: 0;
  font-weight: normal;
  font-style: italic;
  color: ${themeGet('colors.grey.700')};
`

const Stats = styled(Columns).attrs({ px: '1rem' })`
  border-top: 1px solid ${themeGet('colors.grey.400')};
  border-bottom: 1px solid ${themeGet('colors.grey.400')};
  color: ${themeGet('colors.grey.800')};
  font-size: 0.8rem;
`

const RightColumn = styled(Column)`
  text-align: right;
`

const filters = [
  {
    field: 'detector',
    internal: true,
    filterFunc: hasValue,
  },
  {
    field: 'bounds',
    internal: true,

    filterFunc: () => () => true, // FIXME!
    // TODO: use rbush or spatial filter?
  },
]

const SpeciesTemplate = ({
  data: {
    speciesJson: {
      species,
      commonName,
      sciName,
      detections,
      nights,
      detectors,
      contributors,
    },
    allDetectorsJson,
  },
}) => {
  const data = fromJS(allDetectorsJson.edges.map(({ node }) => node))

  console.log(data.toJS())

  const [selectedId, setSelectedId] = useState(null)
  // const boundsRef = useRef(NABounds) // store bounds so they are updated without rerendering
  // const [{ prevBounds, nextBounds }, setBounds] = useState({
  //   prevBounds: List(NABounds),
  // })

  const handleSelect = id => {
    console.log('onSelect', id)
    setSelectedId(id)
  }

  // const handleBoundsChange = bounds => {
  //   boundsRef.current = bounds
  // }

  return (
    <Layout title={`${commonName} (${sciName})`}>
      <Wrapper>
        <CrossfilterProvider data={data} filters={filters}>
          <Sidebar>
            <Header>
              <CommonName>{commonName}</CommonName>
              <ScientificName>{sciName}</ScientificName>
            </Header>

            <Stats>
              <Column>
                {formatNumber(detections, 0)} detections
                <br />
                {formatNumber(nights, 0)} nights
              </Column>
              <RightColumn>
                {detectors} detectors
                <br />
                {contributors ? (
                  <>
                    {contributors.length}{' '}
                    {contributors.length === 1 ? 'contributor' : 'contributors'}
                  </>
                ) : null}
              </RightColumn>
            </Stats>
          </Sidebar>
          <Map
            // bounds={nextBounds}
            selectedFeature={selectedId}
            onSelectFeature={handleSelect}
            // onBoundsChange={handleBoundsChange}
          />
        </CrossfilterProvider>
      </Wrapper>
    </Layout>
  )
}

SpeciesTemplate.propTypes = {
  data: PropTypes.shape({
    speciesJson: PropTypes.shape({
      species: PropTypes.string.isRequired,
      commonName: PropTypes.string.isRequired,
      sciName: PropTypes.string.isRequired,
      detections: PropTypes.number.isRequired,
      nights: PropTypes.number.isRequired,
      detectors: PropTypes.number.isRequired,
      contributors: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
    allDetectorsJson: GraphQLArrayPropType(
      PropTypes.shape({
        detector: PropTypes.number.isRequired,
        lat: PropTypes.number.isRequired,
        lon: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
}

export const pageQuery = graphql`
  query SpeciesPageQuery($species: String!) {
    speciesJson(species: { eq: $species }) {
      species
      commonName
      sciName
      detections
      nights
      detectors
      contributors
    }
    allDetectorsJson(filter: { species_present: { eq: $species } }) {
      edges {
        node {
          site
          detector
          lat
          lon
        }
      }
    }
  }
`

export default SpeciesTemplate