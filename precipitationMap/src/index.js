'use strict';

// Famous dependencies
var DOMElement = require('famous/dom-renderables/DOMElement');
var FamousEngine = require('famous/core/FamousEngine');
var Mesh = require('famous/webgl-renderables/Mesh');
var Material = require('famous/webgl-materials/Material');
var navigation = require('./navigation');

var ctu = require('./CT_Util');
var Colors = require('./colorPalette');

// Boilerplate code
FamousEngine.init();



// Initialize with a scene
var scene = FamousEngine.createScene();

//Create a container
var Container = scene.addChild();

// Create an DOM element for the Background
new DOMElement(Container, { properties: { backgroundColor:"#232724" } });

//Create a globe node
var globeNode = Container.addChild();

// Set globe properties
globeNode
   .setSizeMode("absolute","absolute", "absolute")
   .setAbsoluteSize(500,500,500)
    // Center the node
    .setAlign(0.5, 0.5)
    // Set the translational origin to the center
    .setMountPoint(0.5, 0.5)
    // Set the rotational origin to the center
    .setOrigin(0.5, 0.5, 0.5)
    //Set the rotation so we can view the relevant part of the world
    .setRotation(0,220*ctu.deg2Rad,0)
;

//Add a sphere mesh
var globeMesh = new Mesh(globeNode);
globeMesh.setGeometry('Sphere', { detail: 50 });
var tex = Material.Texture('./images/landmass.jpg');
//Add the texture to the globe
globeMesh.setBaseColor(tex);


var dataMaster = require('./dataMaster');
var myDM = new dataMaster(globeNode);

var nav = new navigation(Container,{dm:myDM});
