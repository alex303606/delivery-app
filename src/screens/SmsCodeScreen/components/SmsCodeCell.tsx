import React from 'react';
import styled from 'styled-components';
import {Animated, LayoutChangeEvent} from 'react-native';
import {Colors, WINDOW_WIDTH} from '@config';
import {Cursor} from 'react-native-confirmation-code-field';

const CELL_SIZE = WINDOW_WIDTH / 5.8;
const ACTIVE_CELL_BG_COLOR = '#f7fafe';
const {Value, Text: AnimatedText} = Animated;
const CELL_COUNT = 4;
const animationsColor = [...new Array(CELL_COUNT)].map(() => new Value(0));
const animationsScale = [...new Array(CELL_COUNT)].map(() => new Value(1));

const animateCell = ({
  hasValue,
  index,
  isFocused,
}: {
  hasValue: boolean;
  index: number;
  isFocused: boolean;
}) => {
  // @ts-ignore
  Animated.parallel([
    Animated.timing(animationsColor[index], {
      useNativeDriver: false,
      toValue: isFocused ? 1 : 0,
      duration: 250,
    }),
    Animated.spring(animationsScale[index], {
      useNativeDriver: false,
      toValue: hasValue ? 0 : 1,
      duration: hasValue ? 300 : 250,
    }),
  ]).start();
};

type Props = {
  index: number;
  symbol: string;
  isFocused: boolean;
  getCellOnLayoutHandler: (index: number) => (event: LayoutChangeEvent) => void;
};

export const SmsCodeCell: React.FC<Props> = ({
  index,
  symbol,
  isFocused,
  getCellOnLayoutHandler,
}) => {
  const hasValue = Boolean(symbol);
  const animatedCellStyle = {
    backgroundColor: hasValue
      ? animationsScale[index].interpolate({
          inputRange: [0, 1],
          outputRange: [Colors.mainPrimary, ACTIVE_CELL_BG_COLOR],
        })
      : animationsColor[index].interpolate({
          inputRange: [0, 1],
          outputRange: [Colors.white, ACTIVE_CELL_BG_COLOR],
        }),
    borderRadius: animationsScale[index].interpolate({
      inputRange: [0, 1],
      outputRange: [CELL_SIZE, 8],
    }),
    transform: [
      {
        scale: animationsScale[index].interpolate({
          inputRange: [0, 1],
          outputRange: [0.2, 1],
        }),
      },
    ],
  };

  setTimeout(() => {
    animateCell({hasValue, index, isFocused});
  }, 0);

  return (
    <StyledAnimatedText
      key={index}
      style={animatedCellStyle}
      onLayout={getCellOnLayoutHandler(index)}>
      {symbol || (isFocused ? <Cursor /> : null)}
    </StyledAnimatedText>
  );
};

const StyledAnimatedText = styled(AnimatedText)`
  margin: 8px;
  height: ${CELL_SIZE}px;
  width: ${CELL_SIZE}px;
  line-height: ${CELL_SIZE - 5}px;
  font-size: 30px;
  text-align: center;
  border-radius: 8px;
  color: ${Colors.mainPrimary};
  background-color: ${Colors.white};
  elevation: 3;
`;
