import React, {ReactNode} from 'react';
import {Block, Row} from '@components';

interface Props {
  children: ReactNode;
}

export const CodeRootComponent: React.FC<Props> = ({children}) => (
  <Block marginTop={30} alignItems="center">
    <Row justifyContent="center">{children}</Row>
  </Block>
);
