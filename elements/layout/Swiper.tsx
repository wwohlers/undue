import React, { ReactElement, useEffect, useRef } from "react";
import { Dimensions, ScrollView } from "react-native";
import { Container, ContainerProps } from "./Container";

type Container = ReactElement<ContainerProps>;

type SwiperProps = {
  children: Container | Container[];
  screen?: number;
  scrollEnabled?: boolean;
};

export const Swiper: React.FC<SwiperProps> = ({ children, screen, scrollEnabled = true }) => {
  const scrollViewRef = useRef<ScrollView | null>(null);
  const length = "length" in children ? children.length : 1;

  useEffect(() => {
    if (screen !== undefined) {
      scrollViewRef.current?.scrollTo({
        x: Dimensions.get("screen").width * screen,
        animated: true,
      });
    }
  }, [screen]);

  return (
    <ScrollView
      ref={scrollViewRef}
      horizontal={true}
      scrollEnabled={scrollEnabled}
      contentContainerStyle={{ width: `${100 * length}%` }}
      showsHorizontalScrollIndicator={false}
      scrollEventThrottle={200}
      decelerationRate="fast"
      pagingEnabled
    >
      {children}
    </ScrollView>
  );
};
