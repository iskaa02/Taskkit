import { Box, Heading } from "native-base";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { Fade } from "./Fade";
import ModalView from "./ModalView";
export default function NoTasks() {
  const { t } = useTranslation();
  return (
    <ModalView>
      <Box pb="70px" px="20px" flex={1}>
        <Fade delay={0}>
          <Heading fontSize="3xl">
            {t("task-left-count", { count: 0, postProcess: "interval" })}
          </Heading>
        </Fade>
        <Fade delay={70}>
          <Heading fontSize="2xl" mt="4">
            {t("enjoy-your-day")}
          </Heading>
        </Fade>
        <Box
          mt="auto"
          mb="40"
          justifyContent="center"
          alignItems="center"
        ></Box>
      </Box>
    </ModalView>
  );
}
