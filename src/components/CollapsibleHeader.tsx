import React, {useCallback} from 'react';
import {LayoutChangeEvent, StyleSheet, TransformsStyle} from 'react-native';
import {withAnchorPoint} from 'react-native-anchor-point';
import {
  StackHeaderProps,
  StackNavigationOptions,
} from '@react-navigation/stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import Animated, {
  interpolate,
  useAnimatedStyle,
  Extrapolate,
  useSharedValue,
} from 'react-native-reanimated';
import {COLLAPSIBLE_HEADER_HEIGHT, Colors, HEADER_HEIGHT} from '@config';
import styled from 'styled-components';
import {RoundButton, Typography} from '@components';

const AnimatedSafeAreaView = Animated.createAnimatedComponent(SafeAreaView);

interface Props extends StackHeaderProps {
  searchIcon?: boolean;
}

export interface CollapsibleHeaderOptions extends StackNavigationOptions {
  animatedValue?: Animated.SharedValue<number>;
}

const Y_OFFSET = COLLAPSIBLE_HEADER_HEIGHT - HEADER_HEIGHT;

const getTransform = (scale: number, width: number) => {
  'worklet';
  let transform: TransformsStyle = {
    transform: [{scale}],
  };
  return withAnchorPoint(
    transform,
    {x: 0, y: 0.5},
    {width, height: Y_OFFSET + 1},
  );
};

export const CollapsibleHeader: React.FC<Props> = ({scene, navigation}) => {
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
      [1, 0.7],
      Extrapolate.CLAMP,
    );
    return getTransform(scale, titleWidth.value);
  }, [animatedValue]);

  return (
    <Container style={StyleSheet.compose(options.headerStyle, containerStyle)}>
      <ContentContainer style={contentStyle}>
        <RoundButton onPress={() => navigation.goBack()} />
        <Animated.View onLayout={handleTitleLayout} style={titleStyle}>
          <Typography.B34 marginLeft={16}>{options.title}</Typography.B34>
        </Animated.View>
      </ContentContainer>
    </Container>
  );
};

const Container = styled(AnimatedSafeAreaView)`
  height: ${COLLAPSIBLE_HEADER_HEIGHT}px;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  elevation: 12;
  background-color: ${Colors.white};
`;

const ContentContainer = styled(Animated.View)`
  flex: 1;
  justify-content: space-between;
  padding-bottom: 29px;
`;
