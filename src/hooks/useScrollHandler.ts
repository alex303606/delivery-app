import {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';

export const useScrollHandler = () => {
  const scrollY = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  return {scrollY, onScroll};
};
