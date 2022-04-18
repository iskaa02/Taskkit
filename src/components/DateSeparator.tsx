import dayjs from "dayjs";
import { Box, Text } from "native-base";
import React from "react";
import { useTranslation } from "react-i18next";

type SeparatorProps = {
  date?: Date;
  previous?: Date | null;
  l?: string;
};
export default function ({ date, previous, l }: SeparatorProps) {
  const { t } = useTranslation();
  const d = dayjs(l ?? date);
  if (!l && d.isSame(previous, "day")) {
    return null;
  }
  const label = d.isToday()
    ? t("today")
    : d.isTomorrow()
    ? t("tomorrow")
    : d.format("MMMM D");
  return (
    <Box my="2" px="10px">
      <Text textAlign="justify" fontSize="xl" bold>
        {label}
      </Text>
    </Box>
  );
}
