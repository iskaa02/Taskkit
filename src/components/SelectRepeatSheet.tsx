import { repeatType } from "@/db/models/scheduleNotification";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import dayjs from "dayjs";
import { t } from "i18next";
import * as React from "react";
import SelectSheet from "./Select";
type SelectRepeatSheetProps = {
  date: Date;
  initialRepeat?: repeatType;
  onChange: (i: repeatType) => void;
};
const SelectRepeatSheet = React.forwardRef<
  BottomSheetModal,
  SelectRepeatSheetProps
>(({ date, initialRepeat, onChange }, ref) => {
  const repeatItems: { label: string; type: repeatType }[] =
    React.useMemo(() => {
      return [
        { label: t("none"), type: null },
        { label: t("every") + " " + t("day"), type: "daily" },
        { label: t("every") + " " + dayjs(date).format("ddd"), type: "weekly" },
        { label: t("every") + " " + t("month"), type: "monthly" },
      ];
    }, [date]);
  const [innerRepeat, setInnerRepeat] = React.useState(() => {
    if (initialRepeat) {
      const d = repeatItems.find(i => i.type === initialRepeat);
      if (d) return d;
    }
    return repeatItems[0];
  });
  return (
    <SelectSheet
      onChange={i => {
        const repeat = repeatItems.find(item => i === item.label);
        if (repeat) {
          setInnerRepeat(repeat);
          onChange(repeat.type);
        }
      }}
      value={innerRepeat.label}
      items={repeatItems.map(i => i.label)}
      ref={ref}
    />
  );
});

export default SelectRepeatSheet;
