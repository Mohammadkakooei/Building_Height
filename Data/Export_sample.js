var S1Collection = ee.ImageCollection("COPERNICUS/S1_GRD"),
    VIIRSCollection = ee.ImageCollection("NOAA/VIIRS/DNB/MONTHLY_V1/VCMSLCFG"),
    imageCollection = ee.ImageCollection("users/Temporary/Copernicus_Land_Monitoring_Service");

var HeightMap =  imageCollection.mosaic().rename('Height');
Map.addLayer(HeightMap,{},'HeightMap',false);


var S1Collection2 = S1Collection  // ASCENDING
                    .filterBounds(geometry)
                    .filterDate('2020-01-01','2021-01-01')
                    .select('VV','VH');
var S1img = S1Collection2.mean().clip(geometry);
Map.addLayer(S1img,{},'S1img',false);


var S2_CNN_collection = ee.ImageCollection("users/ghsl/S2_CNN");
var S2_CNN_img = S2_CNN_collection.mosaic().clip(geometry).gt(30).rename('U0');
Map.addLayer(S2_CNN_img,{}, 'S2_CNN_img', false);

var S2_CNN_img = S2_CNN_collection.mosaic().clip(geometry).gt(50).rename('U0');
Map.addLayer(S2_CNN_img,{}, 'S2_CNN_img', false);


  var S2_CNN_mean50 = S2_CNN_img.reduceNeighborhood(ee.Reducer.mean(), ee.Kernel.circle(50,  'meters')).rename('U1');
  Map.addLayer(S2_CNN_mean50,{},'S2_CNN_mean50',false);

  var S2_CNN_mean100 = S2_CNN_img.reduceNeighborhood(ee.Reducer.mean(), ee.Kernel.circle(100,  'meters')).rename('U2');
  Map.addLayer(S2_CNN_mean100,{},'S2_CNN_mean100',false);
  
  var S2_CNN_mean150 = S2_CNN_img.reduceNeighborhood(ee.Reducer.mean(), ee.Kernel.circle(150,  'meters')).rename('U3');
  Map.addLayer(S2_CNN_mean150,{},'S2_CNN_mean150',false);
  
  var S2_CNN_mean200 = S2_CNN_img.reduceNeighborhood(ee.Reducer.mean(), ee.Kernel.circle(200,  'meters')).rename('U4');
  Map.addLayer(S2_CNN_mean200,{},'S2_CNN_mean200',false);


var VIIRSCollection2 = VIIRSCollection
                    .filterDate('2020-01-01','2021-01-01')
                    .filterBounds(geometry) ;
var NL_img = VIIRSCollection2.mean().select('avg_rad').clip(geometry).rename('NL');
Map.addLayer(NL_img,{},'NL_img',false);


var InputImg = ee.Image.cat([S1img, S2_CNN_mean50, S2_CNN_mean100,
                             S2_CNN_mean150, S2_CNN_mean200, NL_img, HeightMap]);

var SampleHeight = InputImg.updateMask(HeightMap.gt(0)).sample({
  region: geometry,
  scale: 10,
  numPixels: 50000,
  dropNulls: true,
  tileScale: 8,
  });

