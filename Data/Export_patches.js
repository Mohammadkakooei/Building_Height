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

var VIIRSCollection2 = VIIRSCollection
                    .filterDate('2020-01-01','2021-01-01')
                    .filterBounds(geometry) ;
var NL_img = VIIRSCollection2.mean().select('avg_rad').clip(geometry).rename('NL');
Map.addLayer(NL_img,{},'NL_img',false);

                             
var InputImg = ee.Image.cat([S1img, S2_CNN_img, NL_img, HeightMap2.unmask(0)]).clip(geometry);                             
Map.addLayer(InputImg,{},'InputImg',false);


Export.image.toDrive({
  image: InputImg.float(),
  description: 'Rome_Podgorica_Height',
  folder: 'EuropHeight2',
  region: geometry,
  scale: 10,
  crs: 'EPSG:4326',
  maxPixels: 1e13,
  shardSize: 224,
  fileDimensions: [224, 224], 
  skipEmptyTiles: true
  
})
