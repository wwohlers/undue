import { StackScreenProps } from "@react-navigation/stack";
import React, { Suspense } from "react";
import { RootStackParamList } from "../App";
import { DeadlinesList } from "../components/home/DeadlinesList";
import { EventsList } from "../components/home/EventsList";
import { Swiper } from "../elements/layout/Swiper";
import { SGSpinner } from "../elements/text/SGSpinner";
import { Settings } from "../components/home/settings/Settings";

export type HomeProps = StackScreenProps<RootStackParamList, "Home">;

export const Home: React.FC = () => {
  return (
    <Suspense fallback={<SGSpinner />}>
      <Swiper>
        <EventsList />
        <DeadlinesList />
        <Settings />
      </Swiper>
    </Suspense>
  );
};
