var request = require('superagent');

var apiRoot = 'https://api.instagram.com/v1/';
var clientId = process.argv[2];

if (!clientId) {
  console.error('Run with Instagram client_id:\nnpm start -- <client_id>\n');
  process.exit(0);
}

var instagram = module.exports = {};

var normalize = function(body, tag) {
  return body.data.filter(function(pic) {
    return pic.location != null;
  }).map(function(pic) {
    return {
      tag: tag,
      url: pic.images.thumbnail.url,
      location: {
        latitude: pic.location.latitude,
        longitude: pic.location.longitude
      },
      participant: 'robot'
    };
  });
};

instagram.byTag = function(tag) {
  var url = apiRoot + 'tags/' + tag + '/media/recent?client_id=' + clientId;
  return new Promise(function(resolve, reject) {
    request
      .get(url)
      .end(function(err, res) {
        if (err) {
          reject(err);
        } else {
          resolve(normalize(res.body, tag));
        }
      });
  });
};
