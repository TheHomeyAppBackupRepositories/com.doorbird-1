'use strict';

const Homey = require('homey');
const { OAuth2Device } = require('homey-oauth2app');
const Util = require('../../lib/util.js');

class DoorbirdDeviceCloud extends OAuth2Device {

  async onOAuth2Init() {
    try {
      if (!this.util) this.util = new Util({homey: this.homey});

      if (!this.getAvailable()) { await this.setAvailable(); }

      // UPDATE NOTIFICATIONS
      this.registerCapabilityListener('button.notificationevents', async () => {
        return await this.util.updateNotificationsCloud(this.oAuth2Client, Homey.env.WEBHOOK_ID, this.getData().id, 'add');

      });

      this.registerCapabilityListener('button.removenotificationevents', async () => {
        return await this.util.updateNotificationsCloud(this.oAuth2Client, Homey.env.WEBHOOK_ID, this.getData().id, 'remove');
      });

      // LISTENERS FOR UPDATING CAPABILITIES
      this.registerCapabilityListener('open_action', async (value) => {
        try {
          if (value === 1) {
            await this.oAuth2Client.triggerRelay(this.getStoreValue('relays')[0].id);
            await this.homey.flow.getDeviceTriggerCard('dooropen').trigger(this, {relay: this.getStoreValue('relays')[0].id}, {});
            setTimeout(async () => {
              return this.setCapabilityValue('open_action', 0);
            }, 1000);
          } else {
            return Promise.resolve(true);
          }
        } catch (error) {
          return Promise.reject(error);
        }
      });

      this.registerCapabilityListener('open_action_2', async (value) => {
        try {
          if (value === 1) {
            if (this.getStoreValue('relays')[1].peripheral) {
              await this.oAuth2Client.triggerRelay(this.getStoreValue('relays')[1].id, this.getStoreValue('relays').peripheral);
            } else {
              await this.oAuth2Client.triggerRelay(this.getStoreValue('relays')[1].id, false);
            }
            await this.homey.flow.getDeviceTriggerCard('dooropen').trigger(this, {relay: this.getStoreValue('relays')[1].id}, {});
            setTimeout(async () => {
              return this.setCapabilityValue('open_action_2', 0);
            }, 1000);
          } else {
            return Promise.resolve(true);
          }
        } catch (error) {
          return Promise.reject(error);
        }
      });

      this.registerCapabilityListener('open_action_3', async (value) => {
        try {
          if (value === 1) {
            if (this.getStoreValue('relays')[2].peripheral) {
              await this.oAuth2Client.triggerRelay(this.getStoreValue('relays')[2].id, this.getStoreValue('relays').peripheral);
            } else {
              await this.oAuth2Client.triggerRelay(this.getStoreValue('relays')[2].id, false);
            }
            await this.homey.flow.getDeviceTriggerCard('dooropen').trigger(this, {relay: this.getStoreValue('relays')[2].id}, {});
            setTimeout(async () => {
              return this.setCapabilityValue('open_action_3', 0);
            }, 1000);
          } else {
            return Promise.resolve(true);
          }
        } catch (error) {
          return Promise.reject(error);
        }
      });

      this.registerCapabilityListener('open_action_4', async (value) => {
        try {
          if (value === 1) {
            if (this.getStoreValue('relays')[3].peripheral) {
              await this.oAuth2Client.triggerRelay(this.getStoreValue('relays')[3].id, this.getStoreValue('relays').peripheral);
            } else {
              await this.oAuth2Client.triggerRelay(this.getStoreValue('relays')[3].id, false);
            }
            await this.homey.flow.getDeviceTriggerCard('dooropen').trigger(this, {relay: this.getStoreValue('relays')[3].id}, {});
            setTimeout(async () => {
              return this.setCapabilityValue('open_action_4', 0);
            }, 1000);
          } else {
            return Promise.resolve(true);
          }
        } catch (error) {
          return Promise.reject(error);
        }
      });

      this.registerCapabilityListener('open_action_5', async (value) => {
        try {
          if (value === 1) {
            if (this.getStoreValue('relays')[4].peripheral) {
              await this.oAuth2Client.triggerRelay(this.getStoreValue('relays')[4].id, this.getStoreValue('relays').peripheral);
            } else {
              await this.oAuth2Client.triggerRelay(this.getStoreValue('relays')[4].id, false);
            }
            await this.homey.flow.getDeviceTriggerCard('dooropen').trigger(this, {relay: this.getStoreValue('relays')[4].id}, {});
            setTimeout(async () => {
              return this.setCapabilityValue('open_action_5', 0);
            }, 1000);
          } else {
            return Promise.resolve(true);
          }
        } catch (error) {
          return Promise.reject(error);
        }
      });

      this.registerCapabilityListener('open_action_6', async (value) => {
        try {
          if (value === 1) {
            if (this.getStoreValue('relays')[5].peripheral) {
              await this.oAuth2Client.triggerRelay(this.getStoreValue('relays')[5].id, this.getStoreValue('relays').peripheral);
            } else {
              await this.oAuth2Client.triggerRelay(this.getStoreValue('relays')[5].id, false);
            }
            await this.homey.flow.getDeviceTriggerCard('dooropen').trigger(this, {relay: this.getStoreValue('relays')[5].id}, {});
            setTimeout(async () => {
              return this.setCapabilityValue('open_action_6', 0);
            }, 1000);
          } else {
            return Promise.resolve(true);
          }
        } catch (error) {
          return Promise.reject(error);
        }
      });

      this.registerCapabilityListener('open_action_7', async (value) => {
        try {
          if (value === 1) {
            if (this.getStoreValue('relays')[6].peripheral) {
              await this.oAuth2Client.triggerRelay(this.getStoreValue('relays')[6].id, this.getStoreValue('relays').peripheral);
            } else {
              await this.oAuth2Client.triggerRelay(this.getStoreValue('relays')[6].id, false);
            }
            await this.homey.flow.getDeviceTriggerCard('dooropen').trigger(this, {relay: this.getStoreValue('relays')[6].id}, {});
            setTimeout(async () => {
              return this.setCapabilityValue('open_action_7', 0);
            }, 1000);
          } else {
            return Promise.resolve(true);
          }
        } catch (error) {
          return Promise.reject(error);
        }
      });

      this.registerCapabilityListener('open_action_8', async (value) => {
        try {
          if (value === 1) {
            if (this.getStoreValue('relays')[7].peripheral) {
              await this.oAuth2Client.triggerRelay(this.getStoreValue('relays')[7].id, this.getStoreValue('relays').peripheral);
            } else {
              await this.oAuth2Client.triggerRelay(this.getStoreValue('relays')[7].id, false);
            }
            await this.homey.flow.getDeviceTriggerCard('dooropen').trigger(this, {relay: this.getStoreValue('relays')[7].id}, {});
            setTimeout(async () => {
              return this.setCapabilityValue('open_action_8', 0);
            }, 1000);
          } else {
            return Promise.resolve(true);
          }
        } catch (error) {
          return Promise.reject(error);
        }
      });

      // LIVE SNAPSHOT TOKEN
      this.doorbirdCloudSnapShot = await this.homey.images.createImage();
      this.doorbirdCloudSnapShot.setStream(async (stream) => {
        try {
          const live_res = await this.oAuth2Client.getLiveImage();
          if(!live_res.ok)
            throw new Error('Invalid Response');

          if(live_res.status == 204)
            throw new Error(this.homey.__('device.incorrect_permissions'));

          return live_res.body.pipe(stream);
        } catch (error) {
          this.log(error);
        }
      });
      await this.setCameraImage('doorbird_cloud', this.homey.__("device.live_snapshot"), this.doorbirdCloudSnapShot);


      // DOORBELL SNAPSHOT TOKEN
      this.doorbellCloudSnapShot = await this.homey.images.createImage();
      this.doorbellCloudSnapShot.setStream(async (stream) => {
        try {
          const doorbell_res = await this.oAuth2Client.getHistoryRingImage('1', 0);
          if(!doorbell_res.ok)
            throw new Error('Invalid Response');

          if(doorbell_res.status == 204)
            throw new Error(this.homey.__('device.incorrect_permissions'));

          return doorbell_res.body.pipe(stream);
        } catch (error) {
          this.log(error);
        }
      });
      await this.setCameraImage('doorbell_cloud', this.homey.__("device.latest_doorbell_snapshot"), this.doorbellCloudSnapShot);

      // MOTION SNAPSHOT TOKEN
      this.motionsensorCloudSnapShot = await this.homey.images.createImage();
      this.motionsensorCloudSnapShot.setStream(async (stream) => {
        try {
          const motion_res = await this.oAuth2Client.getHistoryMotionImage(0);
          if(!motion_res.ok)
            throw new Error('Invalid Response');

          if(motion_res.status == 204)
            throw new Error(this.homey.__('device.incorrect_permissions'));

          return motion_res.body.pipe(stream);
        } catch (error) {
          this.log(error);
        }
      });
      await this.setCameraImage('motion_cloud', this.homey.__("device.latest_motionsensor_snapshot"), this.motionsensorCloudSnapShot);
    } catch (error) {
      this.error(error);
    }
  }

  async onAdded() {
    return await this.util.updateNotificationsCloud(this.oAuth2Client, Homey.env.WEBHOOK_ID, this.getData().id, 'add');
  }

  async onDeleted() {
    return await this.util.updateNotificationsCloud(this.oAuth2Client, Homey.env.WEBHOOK_ID, this.getData().id, 'remove');
  }

  async processEventTrigger(source, relay = 1) {
    try {
      switch(source) {
        case 'doorbell':
          await this.setCapabilityValue('alarm_generic', true);
          await this.doorbellCloudSnapShot.update();
          this.homey.flow.getDeviceTriggerCard('doorbell').trigger(this, {snapshot: this.doorbellCloudSnapShot}, {});
          setTimeout(() => { this.setCapabilityValue('alarm_generic', false); }, 10000);
          return Promise.resolve(true);
        case 'motionsensor':
          await this.setCapabilityValue('alarm_motion', true);
          await this.motionsensorCloudSnapShot.update();
          await this.homey.flow.getDeviceTriggerCard('motionsensor').trigger(this, {snapshot: this.motionsensorCloudSnapShot}, {});
          this.homey.setTimeout(async () => { await this.setCapabilityValue('alarm_motion', false); }, 5000);
          return Promise.resolve(true);
        case 'relays':
          return await this.homey.flow.getDeviceTriggerCard('dooropen').trigger(this, {relay: relay}, {});
        default:
          return Promise.reject('Invalid source');
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }

}

module.exports = DoorbirdDeviceCloud;