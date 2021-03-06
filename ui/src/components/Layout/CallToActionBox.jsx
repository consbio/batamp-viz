import React from 'react'
import PropTypes from 'prop-types'

import { Text } from 'components/Text'
import { Box, Flex } from 'components/Grid'
import { Link } from 'components/Link'
import FaIcon from 'components/Icon/FaIcon'
import styled, { themeGet } from 'style'

const Wrapper = styled(Box).attrs({
  px: '1rem',
  py: '1rem',
  mx: '0.5rem',
})`
  background-color: ${themeGet('colors.grey.100')};
  border-radius: 0.25rem;
`

const Header = styled(Flex).attrs({
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'nowrap',
})`
  margin-bottom: 1rem;
`

const Title = styled(Text).attrs({
  as: 'h3',
  fontSize: ['1.5rem', '1.5rem', '1.75rem'],
})`
  flex: 0 0 auto;
  color: ${themeGet('colors.grey.900')} !important;
  font-weight: normal;
  margin-bottom: 0;
`

const StyledIcon = styled(FaIcon).attrs({
  size: '2rem',
})`
  width: 2rem;
  height: 2rem;
  margin-right: 0.5em;
  opacity: 0.6;
  color: ${themeGet('colors.grey.900')};
  flex-shrink: 0;
`

const Content = styled.div`
  line-height: 1.2;
  color: ${themeGet('colors.grey.900')};
`

const LinkWrapper = styled.div`
  text-align: center;
  font-size: 1.1em;
  margin-top: 0.5em;
`

const CallToActionBox = ({
  icon,
  title,
  children,
  link,
  linkLabel,
  ...props
}) => (
  <Wrapper {...props}>
    <Header>
      {icon && <StyledIcon name={icon} />}
      <Title>{title}</Title>
    </Header>

    <Content>{children}</Content>

    <LinkWrapper>
      <Link to={link}>{linkLabel}</Link>
    </LinkWrapper>
  </Wrapper>
)

CallToActionBox.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  link: PropTypes.string.isRequired,
  linkLabel: PropTypes.string.isRequired,
}

CallToActionBox.defaultProps = {
  icon: null,
}

export default CallToActionBox
