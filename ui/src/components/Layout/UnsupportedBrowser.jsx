import React from 'react'
import { Container, Box, Flex } from 'components/Grid'
import { FaExclamationTriangle } from 'react-icons/fa'

import styled, { themeGet } from 'style'

const IconHeader = styled.h1`
  text-align: center;
`

const StyledIcon = styled(FaExclamationTriangle)`
  height: 10rem;
  width: 10rem;
  margin-right: 1rem;
  color: #fff;
`

const WarningBox = styled(Box)`
  padding: 2rem;
  background-color: ${themeGet('colors.primary.900')};

  h1 {
    color: #fff;
  }
`

const UnsupportedBrowser = () => (
  <Container>
    <WarningBox>
      <IconHeader>
        <StyledIcon />
      </IconHeader>
      <h1>
        Unfortunately, you are using an unsupported version of Internet
        Explorer.
        <br />
        <br />
        Please use a modern browser such as Google Chrome, Firefox, or Microsoft
        Edge.
      </h1>
    </WarningBox>
  </Container>
)

export default UnsupportedBrowser
