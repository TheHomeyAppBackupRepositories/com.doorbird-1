const { OAuth2Client } = require('homey-oauth2app');

class DoorBirdOAuth2Client extends OAuth2Client {

  static API_URL = 'https://api.doorbird.io';
  static TOKEN_URL = 'https://api.doorbird.io/auth/token';
  static AUTHORIZATION_URL = 'https://api.doorbird.io/auth/authorize';
  static SCOPES = [ 'deviceAdmin' ];

  async getMetaData() {
    return this.get({
      path: '/metadata',
      headers: {
        'Accept': 'application/json'
      }
    });
  }

  async getFavorites() {
    return this.get({
      path: '/favorites',
      headers: {
        'Accept': 'application/json'
      }
    });
  }

  async addFavorite(data) {
    return this.post({
      path: '/favorite/http',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data)
    });
  }

  async deleteFavorite(favoriteId) {
    return this.delete({
      path: `/favorite/http/${favoriteId}`,
      headers: {
        'Accept': 'application/json'
      }
    });
  }

  async getSchedules() {
    return this.get({
      path: '/schedules',
      headers: {
        'Accept': 'application/json'
      }
    });
  }

  async addSchedules(data) {
    return this.post({
      path: '/schedules',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data)
    });
  }

  async getAllowedRelays() {
    const users = await this.get({
      path: '/users',
      headers: {
        'Accept': 'application/json'
      }
    });
    const admin_user = users.filter(obj => obj.admin === true);
    const allowed_relays = admin_user[0].permissions.allowedRelays;
    var list = [];
    allowed_relays.forEach((relay) => {
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
  }

  async getRelays() {
    return this.get({
      path: '/relays/settings',
      headers: {
        'Accept': 'application/json'
      }
    });
  }

  async triggerRelay(relayId, peripheral_id = false) {
    if (peripheral_id) {
      return this.post({
        path: `/relay/${relayId}`,
        headers: {
          'Accept': 'application/json'
        },
        body: JSON.stringify('{"peripheral": "'+ peripheral_id +'"}')
      });
    } else {
      return this.post({
        path: `/relay/${relayId}`,
        headers: {
          'Accept': 'application/json'
        }
      });
    }
  }

  async getLiveImage() {
    return this.get({
      path: '/live/live-image',
      headers: {
        'Accept': 'image/jpeg'
      }
    });
  }

  async getHistoryRingImage(doorbellId, historyId) {
    const ring_list = await this.get({
      path: `/cloud-recording/images/ring/${doorbellId}`,
      headers: {
        'Accept': 'application/json'
      }
    });
    if (ring_list) {
      const path = ring_list[historyId].url.replace("https://api.doorbird.io","");
      return await this.get({
        path: path,
        headers: {
          'Accept': 'image/jpeg'
        }
      });
    }
  }

  async getHistoryMotionImage(historyId) {
    const motion_list = await this.get({
      path: '/cloud-recording/images/motion',
      headers: {
        'Accept': 'application/json'
      }
    });
    if (motion_list) {
      const path = motion_list[historyId].url.replace("https://api.doorbird.io","");
      return await this.get({
        path: path,
        headers: {
          'Accept': 'image/jpeg'
        }
      });
    }
  }

  async liveLight() {
    return this.post({
      path: '/live/light',
      headers: {
        'Accept': 'application/json'
      }
    });
  }

  async reStart() {
    return this.post({
      path: '/other/restart',
      headers: {
        'Accept': 'application/json'
      }
    });
  }

}

module.exports = DoorBirdOAuth2Client;
