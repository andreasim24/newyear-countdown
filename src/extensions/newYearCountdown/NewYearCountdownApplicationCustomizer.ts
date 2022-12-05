import { Log } from "@microsoft/sp-core-library";
import {
  BaseApplicationCustomizer,
  PlaceholderContent,
  PlaceholderName
} from "@microsoft/sp-application-base";

import * as strings from "NewYearCountdownApplicationCustomizerStrings";
import * as React from "react";
import * as ReactDom from "react-dom";
import PlaceholderNewYear from "./components/PlaceholderNewYear";

const LOG_SOURCE: string = "NewYearCountdownApplicationCustomizer";

export interface INewYearCountdownApplicationCustomizerProperties {
  isCountdownEnabled: boolean;
  isSnowflakeEnabled: boolean;
  isChristmasLightEnabled: boolean;
  isSiteAdmin: boolean;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class NewYearCountdownApplicationCustomizer extends BaseApplicationCustomizer<INewYearCountdownApplicationCustomizerProperties> {
  private _topPlaceholder: PlaceholderContent | undefined;

  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

    // Wait for the placeholders to be created (or handle them being changed) and then
    // render.
    this.context.placeholderProvider.changedEvent.add(
      this,
      this._renderPlaceHolders
    );

    return Promise.resolve();
  }

  private _renderPlaceHolders(): void {
    // Handling the top placeholder
    if (!this._topPlaceholder) {
      this._topPlaceholder = this.context.placeholderProvider.tryCreateContent(
        PlaceholderName.Top,
        { onDispose: this._onDispose }
      );

      // The extension should not assume that the expected placeholder is available.
      if (!this._topPlaceholder) {
        console.error("The expected placeholder (Top) was not found.");
        return;
      }

      if (this.properties) {
        if (this._topPlaceholder.domElement) {
          const element: React.ReactElement = React.createElement(
            PlaceholderNewYear,
            {
              isSiteAdmin:
                this.context.pageContext.legacyPageContext.isSiteAdmin,
              toggleSnowflake: this.toggleSnowflake,
              toggleCountdown: this.toggleCountdown,
              toggleChristmasLight: this.toggleChristmasLight
            }
          );

          ReactDom.render(element, this._topPlaceholder.domElement);
        }
      }
    }
  }

  protected toggleSnowflake = (value: boolean): void => {
    if (this.properties) {
      this.properties.isSnowflakeEnabled = value;
    }
  };
  protected toggleCountdown = (value: boolean): void => {
    if (this.properties) {
      this.properties.isCountdownEnabled = value;
    }
  };

  private toggleChristmasLight = (value: boolean): void => {
    if (this.properties) {
      this.properties.isChristmasLightEnabled = value;
    }
  };

  private _onDispose(): void {}
}
