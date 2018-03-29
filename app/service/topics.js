'use strict';

const Service = require('egg').Service;

const { sha1 } = require('./sha1.js');

class TopicService extends Service {
  constructor(ctx) {
    super(ctx);
    // this.root = 'https://cnodejs.org/api/v1';
    this.secure_key = '8ef3117bb55935d5ab8c35507dd32f4f';
    this.nonce = 5852052;
  }

  async request(url, opts) {
    url = `${this.root}${url}`;
    opts = Object.assign({
      timeout: [ '30s', '30s' ],
      dataType: 'json',
    }, opts);
    return this.ctx.curl(url, opts);
  }

  async list(params) {
    const timestamp = new Date().getTime()
    const merge = [this.nonce, this.secure_key, timestamp].sort().join('')
    const signature = sha1(merge)

    const result = {
      data: {
        signature: signature,
        timestamp: timestamp,
        nonce: this.nonce        
      },
      status_code: 0
    }
    return result;
  }
}

module.exports = TopicService;
