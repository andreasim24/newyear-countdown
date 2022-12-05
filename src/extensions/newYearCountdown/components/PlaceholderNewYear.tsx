import * as React from "react";
import * as strings from "NewYearCountdownApplicationCustomizerStrings";
import * as ReactDOM from "react-dom";
import Snowfall from "react-snowfall";
import styles from "../NewYearCountdown.module.scss";
import { IconButton } from "@fluentui/react/lib/Button";
import { Stack, IIconProps, IStackTokens } from "@fluentui/react";

import { useBoolean } from "@fluentui/react-hooks";
import Countdown from "react-countdown";
import PlaceholderPanel from "./PlaceholderPanel";
import ChristmasLight from "./ChristmasLight";

const closeIcon: IIconProps = { iconName: "ChromeClose" };

interface IPlaceHolderNewYear {
  isSiteAdmin: boolean;
  toggleSnowflake: (value: boolean) => void;
  toggleCountdown: (value: boolean) => void;
  toggleChristmasLight: (value: boolean) => void;
}

const PlaceholderNewYear: React.FC<IPlaceHolderNewYear> = (
  props: IPlaceHolderNewYear
) => {
  const [isPlaceholderDisabled, setIsPlaceholderDisabled] =
    React.useState(false);
  const [isCountdownEnabled, setIsCountdownEnabled] = React.useState(true);
  const [isSnowflakeEnabled, setIsSnowflakeEnabled] = React.useState(true);
  const [isChristmasLightEnabled, setIsChristmasLightEnabled] =
    React.useState(true);
  const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] =
    useBoolean(false);
  const [snowFlakeCount, setSnowFlakeCount] = React.useState(100);
  const [speedLowerValue, setSpeedLowerValue] = React.useState(0);
  const [speedValue, setSpeedValue] = React.useState(1);
  const [windLowerValue, setWindLowerValue] = React.useState(0);
  const [windValue, setWindValue] = React.useState(1);
  const [color, setColor] = React.useState<string>();

  const dayStackTokens: IStackTokens = { childrenGap: 15 };

  const disablePlaceholder = (): void => {
    setIsPlaceholderDisabled(true);
  };

  React.useEffect(() => {
    const placeholderValue = window.localStorage.getItem(
      "IS_PLACEHOLDER_DISABLED"
    );
    setIsPlaceholderDisabled(JSON.parse(placeholderValue));
  }, []);

  React.useEffect(() => {
    window.localStorage.setItem(
      "IS_PLACEHOLDER_DISABLED",
      JSON.stringify(isPlaceholderDisabled)
    );
  }, [isPlaceholderDisabled]);

  return (
    <>
      {isPlaceholderDisabled ? null : (
        <div className={styles.app}>
          {isChristmasLightEnabled ? <ChristmasLight /> : null}
          <div className={styles.placeholder}>
            {isSnowflakeEnabled
              ? ReactDOM.createPortal(
                  <Snowfall
                    color={color}
                    snowflakeCount={snowFlakeCount}
                    speed={[speedLowerValue, speedValue]}
                    wind={[windLowerValue, windValue]}
                  />,
                  document.body
                )
              : null}
            <Stack horizontal>
              {props.isSiteAdmin ? null : (
                <div className={styles.closeIcon}>
                  <IconButton
                    iconProps={closeIcon}
                    title="Close"
                    ariaLabel="Close"
                    onClick={disablePlaceholder}
                  />
                </div>
              )}
              <Stack horizontalAlign="center" verticalAlign="center">
                <span>{strings.Title}</span>
                {isCountdownEnabled ? (
                  <Countdown
                    date={new Date("January 1, 2023 00:00:00")}
                    renderer={props => (
                      <Stack horizontal tokens={dayStackTokens}>
                        <Stack>
                          <span className={styles.countdown}>{props.days}</span>
                          <span>{strings.Days}</span>
                        </Stack>
                        <Stack>
                          <span className={styles.countdown}>
                            {props.hours}
                          </span>
                          <span>{strings.Hours}</span>
                        </Stack>
                        <Stack>
                          <span className={styles.countdown}>
                            {props.minutes}
                          </span>
                          <span>{strings.Minutes}</span>
                        </Stack>
                        <Stack>
                          <span className={styles.countdown}>
                            {props.seconds}
                          </span>
                          <span>{strings.Seconds}</span>
                        </Stack>
                      </Stack>
                    )}
                  />
                ) : null}
              </Stack>
              {props.isSiteAdmin ? (
                <div className={styles.customIcon} onClick={openPanel}>
                  <img src="https://img.icons8.com/flat-round/32/null/christmas-wreath.png" />
                </div>
              ) : null}
            </Stack>

            <PlaceholderPanel
              isOpen={isOpen}
              dismissPanel={dismissPanel}
              snowFlakeCount={snowFlakeCount}
              setSnowFlakeCount={setSnowFlakeCount}
              speedValue={speedValue}
              speedLowerValue={speedLowerValue}
              setSpeedValue={setSpeedValue}
              setSpeedLowerValue={setSpeedLowerValue}
              windValue={windValue}
              windLowerValue={windLowerValue}
              setWindValue={setWindValue}
              setWindLowerValue={setWindLowerValue}
              color={color}
              setColor={setColor}
              isSiteAdmin={props.isSiteAdmin}
              isCountdownEnabled={isCountdownEnabled}
              setIsCountdownEnabled={setIsCountdownEnabled}
              isSnowflakeEnabled={isSnowflakeEnabled}
              setIsSnowflakeEnabled={setIsSnowflakeEnabled}
              isChristmasLightEnabled={isChristmasLightEnabled}
              setIsChristmasLightEnabled={setIsChristmasLightEnabled}
              toggleSnowflake={props.toggleSnowflake}
              toggleCountdown={props.toggleCountdown}
              toggleChristmasLight={props.toggleChristmasLight}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default PlaceholderNewYear;
