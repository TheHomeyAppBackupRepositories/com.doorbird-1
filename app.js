'use strict';

const Homey = require('homey');
const { OAuth2App } = require('homey-oauth2app');
const DoorBirdOAuth2Client = require('./lib/DoorBirdOAuth2Client');
const Util = require('./lib/util.js');

class DoorbirdApp extends OAuth2App {

  static OAUTH2_CLIENT = DoorBirdOAuth2Client;
  static OAUTH2_DEBUG = false;
  static OAUTH2_MULTI_SESSION = false;
  static OAUTH2_DRIVERS = [ 'doorbird_cloud' ];

  async onOAuth2Init() {
    this.log('Initializing DoorBird app ...');

    if (!this.util) this.util = new Util({homey: this.homey});

    // CLOUD: CREATE WEBHOOK FOR EVENTS
    const homeyId = await this.homey.cloud.getHomeyId();
    const webhook_data = { deviceId: homeyId };
    const webhook_id = Homey.env.WEBHOOK_ID;
    const webhook_secret = Homey.env.WEBHOOK_SECRET;
    const webhook = await this.homey.cloud.createWebhook(webhook_id, webhook_secret, webhook_data);

    this.homey.flow.getActionCard('emailsnapshot')
      .registerRunListener(async (args) => {
        try {
          const image = await this.util.getBufferSnapshot('http://'+ args.device.getSetting('address') +'/bha-api/image.cgi', args.device.getSetting('username'), args.device.getSetting('password'), 'buffer');
          return await this.util.sendSnapshot(image, args);
        } catch (error) {
          return Promise.reject(error);
        }
      });

    this.homey.flow.getActionCard('emailsnapshothistory')
      .registerRunListener(async (args) => {
        try {
          const image = await util.getBufferSnapshot('http://'+ args.device.getSetting('address') +'/bha-api/history.cgi?event='+ args.source +'&index='+ args.history +'', args.device.getSetting('username'), args.device.getSetting('password'), 'buffer');
          return await this.util.sendHistorySnapshot(image, args);
        } catch (error) {
          return Promise.reject(error);
        }
      });

    this.homey.flow.getActionCard('light')
      .registerRunListener(async (args) => {
        if (args.device.getStoreValue('communication') === 'cloud') {
          return await args.device.oAuth2Client.liveLight();
        } else {
          return await this.util.sendCommand('/bha-api/light-on.cgi', args.device.getSetting('address'), args.device.getSetting('username'), args.device.getSetting('password'));
        }
      });

    this.homey.flow.getActionCard('restart')
      .registerRunListener(async (args) => {
        if (args.device.getStoreValue('communication') === 'cloud') {
          return await args.device.oAuth2Client.reStart();
        } else {
          return await this.util.sendCommand('/bha-api/restart.cgi', args.device.getSetting('address'), args.device.getSetting('username'), args.device.getSetting('password'));
        }
      });

    this.homey.flow.getActionCard('door')
      .registerRunListener(async (args) => {
        if (args.device.getStoreValue('communication') === 'cloud') {
          return await args.device.oAuth2Client.triggerRelay(args.relay.relay_id, args.relay.peripheral);
        } else {
          if(args.relay.id) {
            return await this.util.sendCommand('/bha-api/open-door.cgi?r='+ args.relay.id, args.device.getSetting('address'), args.device.getSetting('username'), args.device.getSetting('password'));
          } else {
            return await this.util.sendCommand('/bha-api/open-door.cgi', args.device.getSetting('address'), args.device.getSetting('username'), args.device.getSetting('password'), args.relay.id);
          }
        }
      })
      .getArgument('relay')
        .registerAutocompleteListener(async (query, args) => {
          if (args.device.getStoreValue('communication') === 'cloud') {
            var list = [];
            const relays = args.device.getStoreValue('relays');
            relays.forEach(function(relay) {
              const peripheral = relay.peripheral || 'DoorBird'
              list.push({
                icon: '/app/com.doorbird/assets/icon.svg',
                name: 'Relay '+ relay.id  +' ('+ peripheral +')',
                id: relay.id +'_'+ peripheral,
                relay_id: relay.id,
                peripheral: relay.peripheral || false
              })
            });
            return list;
          } else {
            return await this.util.getRelays(args.device.getSetting('address'), args.device.getSetting('username'), args.device.getSetting('password'));
          }
        })

    // PROCESS INCOMING NOTIFICATION EVENTS
    webhook.on('message', async (args) => {
      try {
        const doorbird = this.homey.drivers.getDriver("doorbird_cloud").getDevice({"id": args.query.id});
        const result = await doorbird.processEventTrigger(args.query.event, args.query.relay);
      } catch (error) {
        this.log(error);
      }
    });

  }

}

module.exports = DoorbirdApp;
