import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import PropTypes from 'prop-types';
import { mediaQueries } from '../../styles/mediaQueries';

const Wrapper = styled('main')`
  padding: 0 ${(props) => props.theme.space}px;
  width: 100%;
  max-width: 600px;
  margin: ${(props) => props.theme.appHeader} auto 0;

  ${mediaQueries('lt')`
    width: 768px;
  `};
`;
const Back = styled('div')``;
const Home = styled('div')`
  display: flex;
  flex-direction: row-reverse;
`;

const Navigation = styled('div')`
  display: grid;
  grid-template-columns: ${(props) =>
    props.isHome ? '1fr' : '1fr minmax(350px, 5fr) 1fr'};
  ${(props) => props.isHome && 'padding: 12px;'};
  align-items: center;
`;
const CustomIconButton = styled(IconButton)``;
const CustomArrowBackIcon = styled(ArrowBackIcon)``;
const PageName = styled('h1')`
  text-align: center;
  font-size: 1.4rem;
  font-weight: 900;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const CustomHomeIcon = styled(HomeIcon)``;

const Main = styled('div')`
  padding: 0 ${(props) => props.theme.space * 2}px;
`;

const PageLayoutWithNav = ({ pageName, children }) => {
  const router = useRouter();
  const [isHome, setIsHome] = useState(false);

  const onClickBackPage = useCallback(() => {
    router.back();
  }, []);
  const onClickHomePage = useCallback(() => {
    router.replace('/');
  }, []);

  useEffect(() => {
    if (router.pathname === '/') {
      setIsHome(true);
    } else {
      setIsHome(false);
    }
  }, [router.pathname]);

  return (
    <Wrapper>
      <Navigation isHome={isHome}>
        {isHome ? (
          ''
        ) : (
          <Back>
            <CustomIconButton aria-label="back-page" onClick={onClickBackPage}>
              <CustomArrowBackIcon fontSize="large" />
            </CustomIconButton>
          </Back>
        )}
        <PageName>{pageName}</PageName>
        {isHome ? (
          ''
        ) : (
          <Home>
            <CustomIconButton aria-label="back-page" onClick={onClickHomePage}>
              <CustomHomeIcon fontSize="large" />
            </CustomIconButton>
          </Home>
        )}
      </Navigation>
      <Main>{children}</Main>
    </Wrapper>
  );
};

PageLayoutWithNav.propTypes = {
  pageName: PropTypes.string.isRequired,
  children: PropTypes.array.isRequired,
};

export { PageLayoutWithNav };
