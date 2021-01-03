import React from 'react';
import {View, ViewProps} from 'react-native';
import styled, {css} from 'styled-components/native';
import {SpacingsProps, spacings} from './spacings';

interface BlockStyleProps {
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  alignSelf?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'stretch'
    | 'baseline'
    | 'auto';
  flex?: number;
  flexShrink?: number;
  elevation?: number;
  borderRadius?: number;
  backgroundColor?: string;
  overflow?: boolean;
}

type PropsWithChildren<P> = P & {children?: React.ReactNode};

export type BlockProps = BlockStyleProps & ViewProps & SpacingsProps;

export const Block = React.forwardRef<View, PropsWithChildren<BlockProps>>(
  (props, ref) => <StyledBlock {...props} ref={ref} />,
);

export const Row: React.FC<BlockProps> = (props) => <StyledRow {...props} />;

const StyledBlock = styled.View<BlockProps>`
  overflow: ${({overflow}) => (overflow ? 'hidden' : 'visible')};
  align-items: ${({alignItems}) => alignItems ?? 'stretch'};
  align-self: ${({alignSelf}) => alignSelf ?? 'auto'};
  background-color: ${({backgroundColor}) => backgroundColor ?? 'transparent'};
  justify-content: ${({justifyContent}) => justifyContent ?? 'flex-start'};
  elevation: ${({elevation}) => elevation ?? 0};

  ${({flex}) =>
    flex
      ? css`
          flex: ${flex};
        `
      : ''}
  ${(props) => spacings(props)}
`;

const StyledRow = styled(Block)<BlockProps>`
  flex-direction: row;
  overflow: ${({overflow}) => (overflow ? 'hidden' : 'visible')};
`;
