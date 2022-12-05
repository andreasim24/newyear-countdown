declare interface INewYearCountdownApplicationCustomizerStrings {
  Title: string;
  PanelHeader: string;
  PanelDescription: string;
  SnowflakeSliderLabel: string;
  SpeedSliderLabel: string;
  WindSliderLabel: string;
  ColorPickerLabel: string;
  ToggleSnowflakeLabel: string;
  ToggleCountdownLabel: string;
  ToggleChristmasLightLabel: string;
  Days: string;
  Hours: string;
  Minutes: string;
  Seconds: string;
}

declare module "NewYearCountdownApplicationCustomizerStrings" {
  const strings: INewYearCountdownApplicationCustomizerStrings;
  export = strings;
}
