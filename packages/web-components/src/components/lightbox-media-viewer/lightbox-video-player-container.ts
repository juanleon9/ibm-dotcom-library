/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, customElement } from 'lit-element';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null';
import HostListener from 'carbon-web-components/es/globals/decorators/host-listener';
import HostListenerMixin from 'carbon-web-components/es/globals/mixins/host-listener';
import DDSVideoPlayerContainer from '../video-player/video-player-container';
import './lightbox-video-player';
import styles from './lightbox-video-player-container.scss';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Container component for lightbox media viewer, works with video data.
 *
 * @element dds-lightbox-video-player-container
 */
@customElement(`${ddsPrefix}-lightbox-video-player-container`)
class DDSLightboxMediaViewerContainer extends HostListenerMixin(DDSVideoPlayerContainer) {
  /**
   * The handler of `${ddsPrefix}-modal-closed` event from `<dds-modal>`.
   */
  @HostListener('eventCloseModal')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleCloseModal() {
    if (this._kWidget) {
      (this._kWidget as any).sendNotification('doStop');
    }
  }

  createLightRenderRoot() {
    return this.querySelector(`${ddsPrefix}-lightbox-media-viewer-body`);
  }

  renderLightDOM() {
    const { formatCaption, hideCaption, _description: description, _duration: duration, _name: name } = this;
    return html`
      <dds-lightbox-video-player
        description="${ifNonNull(description)}"
        duration="${ifNonNull(duration)}"
        name="${ifNonNull(name)}"
        ?hide-caption="${hideCaption}"
        .formatCaption="${ifNonNull(formatCaption)}"
      >
      </dds-lightbox-video-player>
    `;
  }

  /**
   * A selector selecting the video player component.
   */
  static get selectorVideoPlayer() {
    return `${ddsPrefix}-lightbox-video-player`;
  }

  /**
   * A selector selecting when the modal component is closed.
   */
  static get eventCloseModal() {
    return `${ddsPrefix}-modal-closed`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSLightboxMediaViewerContainer;
