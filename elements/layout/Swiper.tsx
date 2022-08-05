import React, { ReactElement } from "react";
import { ScrollView } from "react-native";
import { Container, ContainerProps } from "./Container";

type Container = ReactElement<ContainerProps>;

type SwiperProps = {
  children: Container | Container[];
}

export const Swiper: React.FC<SwiperProps> = ({ children }) => {
  const length = 'length' in children ? children.length : 1;
  return (
    <ScrollView
      horizontal={true}
      contentContainerStyle={{ width: `${100 * length}%` }}
      showsHorizontalScrollIndicator={false}
      scrollEventThrottle={200}
      decelerationRate="fast"
      pagingEnabled
    >
      { children }
    </ScrollView>
  )
}