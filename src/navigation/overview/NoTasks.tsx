import { Box, Heading, Text } from "native-base";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { Fade } from "./Fade";
import ModalView from "./ModalView";
export default function NoTasks() {
  const { t } = useTranslation();
  return (
    <ModalView>
      <Box pb="70px" px="20px" flex={1}>
        <Fade position={50} delay={0}>
          <Heading fontSize="3xl">
            {t("task-left-count", { count: 0, postProcess: "interval" })}
          </Heading>
        </Fade>
        <Fade position={50} delay={70}>
          <Text fontSize="2xl">{t("enjoy-your-day")}</Text>
        </Fade>
      </Box>
    </ModalView>
  );
}
