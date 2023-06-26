'use strict';

const { OAuth2Driver } = require('homey-oauth2app');

class DoorbirdDriverCloud extends OAuth2Driver {

  async onOAuth2Init() {
    this.homey.flow.getDeviceTriggerCard('doorbell');
    this.homey.flow.getDeviceTriggerCard('motionsensor');
    this.homey.flow.getDeviceTriggerCard('dooropen');
  }

  async onPairListDevices({ oAuth2Client }) {
    try {
      const doorbird = await oAuth2Client.getMetaData();
      const relays = await oAuth2Client.getAllowedRelays();

      if (doorbird && relays) {
        var capabilities = ["alarm_generic", "alarm_motion", "button.notificationevents", "button.removenotificationevents", "open_action"];

        /* add relays to capabilities */
        relays.forEach((relay, i) => {
          if (i !== 0) {
            i = i === 0 ? '' : i + 1;
            capabilities.push('open_action_'+ i);
          }
        })

        /* return DoorBirds */
        return [{
          name: doorbird.intercomTypeName,
          data: {
            id: doorbird.mac,
          },
          capabilities: capabilities,
          store: {
            communication: 'cloud',
            type: doorbird.intercomTypeName,
            relays: relays
          }
        }]
      }
    } catch (error) {
      this.log(error);
      return Promise.reject(error);
    }
  }

}

module.exports = DoorbirdDriverCloud;
