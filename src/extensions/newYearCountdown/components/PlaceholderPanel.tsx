import * as React from "react";
import {
  Slider,
  Stack,
  StackItem,
  SwatchColorPicker,
  Label,
  Toggle
} from "@fluentui/react";
import { Panel } from "@fluentui/react/lib/Panel";
import * as strings from "NewYearCountdownApplicationCustomizerStrings";

interface IPlaceholderPanel {
  isOpen: boolean;
  dismissPanel: () => void;
  snowFlakeCount: number;
  setSnowFlakeCount: (value: React.SetStateAction<number>) => void;
  speedValue: number;
  speedLowerValue: number;
  setSpeedValue: (value: React.SetStateAction<number>) => void;
  setSpeedLowerValue: (value: React.SetStateAction<number>) => void;
  windValue: number;
  windLowerValue: number;
  setWindValue: (value: React.SetStateAction<number>) => void;
  setWindLowerValue: (value: React.SetStateAction<number>) => void;
  color: string;
  setColor: (value: React.SetStateAction<string>) => void;
  isSiteAdmin: boolean;
  isCountdownEnabled: boolean;
  setIsCountdownEnabled: (value: React.SetStateAction<boolean>) => void;
  isSnowflakeEnabled: boolean;
  setIsSnowflakeEnabled: (value: React.SetStateAction<boolean>) => void;
  isChristmasLightEnabled: boolean;
  setIsChristmasLightEnabled: (value: React.SetStateAction<boolean>) => void;
  toggleSnowflake: (value: boolean) => void;
  toggleCountdown: (value: boolean) => void;
  toggleChristmasLight: (value: boolean) => void;
}

const colorCellsOptions = [
  { id: "a", label: "red", color: "#a4262c" },
  { id: "b", label: "orange", color: "#ca5010" },
  { id: "c", label: "orangeYellow", color: "#986f0b" },
  { id: "d", label: "yellowGreen", color: "#8cbd18" },
  { id: "e", label: "green", color: "#0b6a0b" },
  { id: "f", label: "cyan", color: "#038387" },
  { id: "g", label: "cyanBlue", color: "#004e8c" },
  { id: "h", label: "magenta", color: "#881798" },
  { id: "i", label: "magentaPink", color: "#9b0062" },
  { id: "j", label: "black", color: "#000000" },
  { id: "k", label: "gray", color: "#7a7574" },
  { id: "l", label: "gray20", color: "#69797e" }
];

const PlaceholderPanel: React.FC<IPlaceholderPanel> = (
  props: IPlaceholderPanel
) => {
  const snowflakeCountChange = (value: number): void =>
    props.setSnowFlakeCount(value);

  const onSpeedChange = (_: unknown, range: [number, number]): void => {
    props.setSpeedLowerValue(range[0]);
    props.setSpeedValue(range[1]);
  };

  const onWindChange = (_: unknown, range: [number, number]): void => {
    props.setWindLowerValue(range[0]);
    props.setWindValue(range[1]);
  };

  const onSwatchColorChange = (
    value: React.FormEvent<HTMLElement>,
    id: string,
    color: string
  ): void => {
    props.setColor(color);
  };

  const onCountdownChanged = (
    ev: React.MouseEvent<HTMLElement>,
    checked?: boolean
  ): void => {
    props.setIsCountdownEnabled(checked);
    props.toggleCountdown(checked);
  };

  const onSnowflakeChanged = (
    ev: React.MouseEvent<HTMLElement>,
    checked?: boolean
  ): void => {
    props.setIsSnowflakeEnabled(checked);
    props.toggleSnowflake(checked);
  };

  const onChristmasLightChanged = (
    ev: React.MouseEvent<HTMLElement>,
    checked?: boolean
  ): void => {
    props.setIsChristmasLightEnabled(checked);
    props.toggleChristmasLight(checked);
  };

  return (
    <Stack>
      <StackItem>
        <Panel
          isLightDismiss
          isOpen={props.isOpen}
          onDismiss={props.dismissPanel}
          closeButtonAriaLabel="Close"
          headerText={strings.PanelHeader}
        >
          <p>{strings.PanelDescription}</p>
          <Slider
            label={strings.SnowflakeSliderLabel}
            max={500}
            value={props.snowFlakeCount}
            showValue
            onChange={snowflakeCountChange}
          />
          <Slider
            ranged
            label={strings.SpeedSliderLabel}
            min={0}
            max={10}
            defaultValue={1}
            defaultLowerValue={0}
            value={props.speedValue}
            lowerValue={props.speedLowerValue}
            onChange={onSpeedChange}
          />
          <Slider
            ranged
            label={strings.WindSliderLabel}
            min={-1}
            max={9.5}
            defaultValue={2}
            defaultLowerValue={0}
            value={props.windValue}
            lowerValue={props.windLowerValue}
            onChange={onWindChange}
          />
          <Label>{strings.ColorPickerLabel}</Label>
          <SwatchColorPicker
            columnCount={4}
            cellShape={"circle"}
            cellHeight={35}
            cellWidth={35}
            cellBorderWidth={3}
            colorCells={colorCellsOptions}
            onChange={onSwatchColorChange}
          />
          {props.isSiteAdmin ? (
            <>
              <Toggle
                label={strings.ToggleSnowflakeLabel}
                checked={props.isSnowflakeEnabled}
                onText="On"
                offText="Off"
                onChange={onSnowflakeChanged}
              />
              <Toggle
                label={strings.ToggleCountdownLabel}
                checked={props.isCountdownEnabled}
                onText="On"
                offText="Off"
                onChange={onCountdownChanged}
              />
              <Toggle
                label={strings.ToggleChristmasLightLabel}
                checked={props.isChristmasLightEnabled}
                onText="On"
                offText="Off"
                onChange={onChristmasLightChanged}
              />
            </>
          ) : null}
        </Panel>
      </StackItem>
    </Stack>
  );
};

export default PlaceholderPanel;
