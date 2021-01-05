import React, {useCallback} from 'react';
import {
  ImageBackground,
  LayoutChangeEvent,
  TransformsStyle,
} from 'react-native';
import {withAnchorPoint} from 'react-native-anchor-point';
import {StackHeaderProps} from '@react-navigation/stack';
import Animated, {
  interpolate,
  useAnimatedStyle,
  Extrapolate,
  useSharedValue,
} from 'react-native-reanimated';
import {COLLAPSIBLE_HEADER_HEIGHT, Colors, HEADER_HEIGHT} from '@config';
import styled from 'styled-components';
import {Typography, CollapsibleHeaderOptions} from '@components';
const banner = require('@assets/images/banner.png');
const Y_OFFSET = COLLAPSIBLE_HEADER_HEIGHT - HEADER_HEIGHT;
const AnimatedImageBackground = Animated.createAnimatedComponent(
  ImageBackground,
);

interface Props extends StackHeaderProps {
  searchIcon?: boolean;
}

const getTransform = (scale: number, width: number) => {
  'worklet';
  let transform: TransformsStyle = {
    transform: [{scale}],
  };
  return withAnchorPoint(
    transform,
    {x: 0, y: 0},
    {width, height: Y_OFFSET + 1},
  );
};

export const MainCollapsibleHeader: React.FC<Props> = ({scene, navigation}) => {
  const titleWidth = useSharedValue(0);
  const handleTitleLayout = useCallback(
    (e: LayoutChangeEvent) => {
      titleWidth.value = e.nativeEvent.layout.width;
    },
    [titleWidth],
  );

  const options = scene?.descriptor.options as CollapsibleHeaderOptions;
  const animatedValue = options?.animatedValue;
  const containerStyle = useAnimatedStyle(
    () => ({
      transform: [
        {
          translateY: interpolate(
            animatedValue?.value ?? 0,
            [0, Y_OFFSET],
            [0, -Y_OFFSET],
            Extrapolate.CLAMP,
          ),
        },
      ],
    }),
    [animatedValue],
  );

  const contentStyle = useAnimatedStyle(
    () => ({
      paddingBottom: interpolate(
        animatedValue?.value ?? 0,
        [0, Y_OFFSET],
        [30, 0],
        Extrapolate.CLAMP,
      ),
      transform: [
        {
          translateY: interpolate(
            animatedValue?.value ?? 0,
            [0, Y_OFFSET],
            [0, 8],
            Extrapolate.CLAMP,
          ),
        },
      ],
    }),
    [animatedValue],
  );

  const titleStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      animatedValue?.value ?? 0,
      [0, Y_OFFSET],
      [1, 0.6],
      Extrapolate.CLAMP,
    );
    return getTransform(scale, titleWidth.value);
  }, [animatedValue]);

  return (
    <Container style={containerStyle} source={banner}>
      <ContentContainer style={contentStyle}>
        <Animated.View onLayout={handleTitleLayout} style={titleStyle}>
          <Typography.B28 color={Colors.white}>BRAND GALLERY</Typography.B28>
        </Animated.View>
      </ContentContainer>
    </Container>
  );
};

const Container = styled(AnimatedImageBackground)`
  height: ${COLLAPSIBLE_HEADER_HEIGHT}px;
  width: 100%;
  elevation: 12;
`;

const ContentContainer = styled(Animated.View)`
  flex: 1;
  padding: 0 21px;
  align-items: flex-start;
  justify-content: flex-end;
`;
