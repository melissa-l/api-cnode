'use strict';

module.exports = app => {
  app.router.resources('topics', '/api/v1/signature', 'topics');
};
