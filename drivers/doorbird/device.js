'use strict';

const Homey = require('homey');
const Util = require('../../lib/util.js');

class DoorbirdDevice extends Homey.Device {

  async onInit() {
    if (!this.util) this.util = new Util({homey: this.homey});

    // INITIALLY SET DEVICE AS AVAILABLE
    this.setAvailable();

    // LISTENERS FOR UPDATING CAPABILITIES
    this.registerCapabilityListener('open_action', async (value) => {
      try {
        if (value === 1) {
          const result = await this.util.sendCommand('/bha-api/open-door.cgi?r='+ this.getStoreValue('relays')[0], this.getSetting('address'), this.getSetting('username'), this.getSetting('password'))
          await this.homey.flow.getDeviceTriggerCard('dooropen').trigger(this, {relay: this.getStoreValue('relays')[0]}, {});
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
          const result = await this.util.sendCommand('/bha-api/open-door.cgi?r='+ this.getStoreValue('relays')[1], this.getSetting('address'), this.getSetting('username'), this.getSetting('password'))
          await this.homey.flow.getDeviceTriggerCard('dooropen').trigger(this, {relay: this.getStoreValue('relays')[1]}, {});
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
          const result = await this.util.sendCommand('/bha-api/open-door.cgi?r='+ this.getStoreValue('relays')[2], this.getSetting('address'), this.getSetting('username'), this.getSetting('password'))
          await this.homey.flow.getDeviceTriggerCard('dooropen').trigger(this, {relay: this.getStoreValue('relays')[2]}, {});
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
          const result = await this.util.sendCommand('/bha-api/open-door.cgi?r='+ this.getStoreValue('relays')[3], this.getSetting('address'), this.getSetting('username'), this.getSetting('password'))
          await this.homey.flow.getDeviceTriggerCard('dooropen').trigger(this, {relay: this.getStoreValue('relays')[3]}, {});
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
          const result = await this.util.sendCommand('/bha-api/open-door.cgi?r='+ this.getStoreValue('relays')[4], this.getSetting('address'), this.getSetting('username'), this.getSetting('password'))
          await this.homey.flow.getDeviceTriggerCard('dooropen').trigger(this, {relay: this.getStoreValue('relays')[4]}, {});
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
          const result = await this.util.sendCommand('/bha-api/open-door.cgi?r='+ this.getStoreValue('relays')[5], this.getSetting('address'), this.getSetting('username'), this.getSetting('password'))
          await this.homey.flow.getDeviceTriggerCard('dooropen').trigger(this, {relay: this.getStoreValue('relays')[5]}, {});
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
          const result = await this.util.sendCommand('/bha-api/open-door.cgi?r='+ this.getStoreValue('relays')[6], this.getSetting('address'), this.getSetting('username'), this.getSetting('password'))
          await this.homey.flow.getDeviceTriggerCard('dooropen').trigger(this, {relay: this.getStoreValue('relays')[6]}, {});
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
          const result = await this.util.sendCommand('/bha-api/open-door.cgi?r='+ this.getStoreValue('relays')[7], this.getSetting('address'), this.getSetting('username'), this.getSetting('password'))
          await this.homey.flow.getDeviceTriggerCard('dooropen').trigger(this, {relay: this.getStoreValue('relays')[7]}, {});
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

    this.registerCapabilityListener('button.notificationevents', async () => {
      return await this.util.updateNotifications(this.getSetting('address'), this.getSetting('username'), this.getSetting('password'), this.getData().id, 'add');
    });

    this.registerCapabilityListener('button.removenotificationevents', async () => {
      return await this.util.updateNotifications(this.getSetting('address'), this.getSetting('username'), this.getSetting('password'), this.getData().id, 'remove');
    });

    // LIVE SNAPSHOT TOKEN
    this.doorbirdSnapShot = await this.homey.images.createImage();
    this.doorbirdSnapShot.setStream(async (stream) => {
      const res = await this.util.getStreamSnapshot('http://'+ this.getSetting('address') +'/bha-api/image.cgi', this.getSetting('username'), this.getSetting('password'));
      if(!res.ok)
        throw new Error('Invalid Response');

      if(res.status == 204)
        throw new Error(this.homey.__('device.incorrect_permissions'));

      return res.body.pipe(stream);
    });
    await this.setCameraImage('doorbird', this.homey.__("device.live_snapshot"), this.doorbirdSnapShot);

    // DOORBELL SNAPSHOT TOKEN
    this.doorbellSnapShot = await this.homey.images.createImage();
    this.doorbellSnapShot.setStream(async (stream) => {
      const res = await this.util.getStreamSnapshot('http://'+ this.getSetting('address') +'/bha-api/history.cgi?event=doorbell&index=1', this.getSetting('username'), this.getSetting('password'));
      if(!res.ok)
        throw new Error('Invalid Response');

      if(res.status == 204)
        throw new Error(this.homey.__('device.incorrect_permissions'));

      return res.body.pipe(stream);
    });
    await this.setCameraImage('doorbell', this.homey.__("device.latest_doorbell_snapshot"), this.doorbellSnapShot);

    // MOTION SNAPSHOT TOKEN
    this.motionsensorSnapShot = await this.homey.images.createImage();
    this.motionsensorSnapShot.setStream(async (stream) => {
      const res = await this.util.getStreamSnapshot('http://'+ this.getSetting('address') +'/bha-api/history.cgi?event=motionsensor&index=1', this.getSetting('username'), this.getSetting('password'));
      if(!res.ok)
        throw new Error('Invalid Response');

      if(res.status == 204)
        throw new Error(this.homey.__('device.incorrect_permissions'));

      return res.body.pipe(stream);
    });
    await this.setCameraImage('motion', this.homey.__("device.latest_motionsensor_snapshot"), this.motionsensorSnapShot);

  }

  async onDeleted() {
    return await this.util.updateNotifications(this.getSetting('address'), this.getSetting('username'), this.getSetting('password'), this.getData().id, 'remove');
  }

  async processEventTrigger(source, relay) {
    try {
      switch(source) {
        case 'doorbell':
          this.setCapabilityValue('alarm_generic', true);
          await this.doorbirdSnapShot.update();
          this.homey.flow.getDeviceTriggerCard('doorbell').trigger(this, {snapshot: this.doorbirdSnapShot}, {}); // using live snapshot as DoorBird Cloud does not update fast enough to retrieve latest doorbell snapshot
          await this.doorbellSnapShot.update();
          setTimeout(() => { this.setCapabilityValue('alarm_generic', false); }, 10000);
          return Promise.resolve(true);
          break;
        case 'motionsensor':
          this.setCapabilityValue('alarm_motion', true);
          await this.doorbirdSnapShot.update();
          this.homey.flow.getDeviceTriggerCard('motionsensor').trigger(this, {snapshot: this.doorbirdSnapShot}, {}); // using live snapshot as DoorBird Cloud does not update fast enough to retrieve latest history snapshot
          await this.motionsensorSnapShot.update();
          setTimeout(() => { this.setCapabilityValue('alarm_motion', false); }, 5000);
          return Promise.resolve(true);
          break;
        case 'relays':
          const result = await this.homey.flow.getDeviceTriggerCard('dooropen').trigger(this, {relay: relay}, {});
          return result;
          break;
        default:
          return Promise.reject('Invalid source');
          break;
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }

}

module.exports = DoorbirdDevice;
