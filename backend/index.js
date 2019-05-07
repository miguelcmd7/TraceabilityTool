const express = require('express');
const app = express();
const bodyParser  = require("body-parser");
const port = 8080;
var image;
var image2;
var number=0;
const NetworkCtrl = require('./controllers/NetworkController.js');
const PeerCtrl= require('./controllers/PeerController.js');
const ChannelCtrl= require('./controllers/ChannelController.js');
const OrgCtrl= require('./controllers/OrganizationController.js');
const OrdererCtrl= require('./controllers/OrdererController.js');
var fs = require('fs');

app.use(bodyParser.urlencoded({ limit: '50mb',extended: true }));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var orgs = express.Router();
var channels = express.Router();
var orderers = express.Router();

orderers.route('/').post(OrdererCtrl.createOrderer)
.get(OrdererCtrl.findAllOrderers)

orderers.route('/:ordererId')

orgs.route('/').post(OrgCtrl.createOrg)
.get(OrgCtrl.findAllOrgs)

orgs.route('/:orgId').put(OrgCtrl.updateOrg)
.get(OrgCtrl.findOrg)
.delete(OrgCtrl.deleteOrg);

orgs.route('/:orgId/peers/:peerId')
    .get(PeerCtrl.findPeer)
    .put(PeerCtrl.updatePeer)
    .delete(PeerCtrl.deletePeer);

orgs.route('/peers').
get(OrgCtrl.peersByOrg);

orgs.route('/:orgId/peers')
  .get(PeerCtrl.findAllPeers)
  .post(PeerCtrl.createPeer);

channels.route('/:channelId')
    .get(ChannelCtrl.findChannel)
    .put(ChannelCtrl.updateChannel)
    .delete(ChannelCtrl.deleteChannel);

channels.route('/')
  .get(ChannelCtrl.findAllChannels)
  .post(ChannelCtrl.createChannel);

app.post('/directory', NetworkCtrl.setDestDirectory);
app.post('/build',NetworkCtrl.build);
app.post('/network',NetworkCtrl.createNetwork)
app.get('/network',NetworkCtrl.getNetworkDomain)
app.delete('/network',NetworkCtrl.deleteNetwork)
app.use('/orgs', orgs);
app.use('/channels', channels);

// app.post('/', function(req, res) {
//   	number=req.body.number;
//   	image=req.body.image;
//   	image2=Buffer.from(req.body.image, 'base64');
//   	res.status(200);
//   	res.send();
  	
//   	fs.writeFile("imagen.jpg", image,'base64', function(err) {
//     if(err) {
//         return console.log(err);
//     }

//     console.log("The file was saved!");
// 	});
//   	console.log("imagen recibida");
// })

app.listen(port, function() {
  console.log("Node server running on http://localhost:"+port)
});

module.exports = app;