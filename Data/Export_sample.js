var S1Collection = ee.ImageCollection("COPERNICUS/S1_GRD"),
    VIIRSCollection = ee.ImageCollection("NOAA/VIIRS/DNB/MONTHLY_V1/VCMSLCFG"),
    imageCollection = ee.ImageCollection("users/Temporary/Copernicus_Land_Monitoring_Service");

var HeightMap =  imageCollection.mosaic().rename('Height');
Map.addLayer(HeightMap,{},'HeightMap',false);

var S1Collection2 = S1Collection  // ASCENDING
                    .filterBounds(geometry)
                    .filterDate('2020-01-01','2021-01-01')
                    .filter(ee.Filter.listContains('transmitterReceiverPolarisation','VV'))
                    .select('VV','VH');

print(S1Collection2.filter(ee.Filter.eq('orbitProperties_pass','ASCENDING')).aggregate_histogram('relativeOrbitNumber_start'));
print(S1Collection2.filter(ee.Filter.eq('orbitProperties_pass','DESCENDING')).aggregate_histogram('relativeOrbitNumber_start'));

var S1img_ASC_VV_102 = S1Collection2.filter(ee.Filter.eq('orbitProperties_pass','ASCENDING'))
.filter(ee.Filter.eq('relativeOrbitNumber_start',102)).mean().clip(geometry).rename('VV_A1','VH_A1');
Map.addLayer(S1img_ASC_VV_102,{},'S1img_ASC_VV_102',false);
var S1img_ASC_VV_29 = S1Collection2.filter(ee.Filter.eq('orbitProperties_pass','ASCENDING'))
.filter(ee.Filter.eq('relativeOrbitNumber_start',29)).mean().clip(geometry).rename('VV_A2','VH_A2');
Map.addLayer(S1img_ASC_VV_29,{},'S1img_ASC_VV_29',false);

var S1img_DES_VV_22 = S1Collection2.filter(ee.Filter.eq('orbitProperties_pass','DESCENDING'))
.filter(ee.Filter.eq('relativeOrbitNumber_start',22)).mean().clip(geometry).rename('VV_D1','VH_D1');
Map.addLayer(S1img_DES_VV_22,{},'S1img_DES_VV_22',false);
var S1img_DES_VV_95 = S1Collection2.filter(ee.Filter.eq('orbitProperties_pass','DESCENDING'))
.filter(ee.Filter.eq('relativeOrbitNumber_start',95)).mean().clip(geometry).rename('VV_D2','VH_D2');
Map.addLayer(S1img_DES_VV_95,{},'S1img_DES_VV_95',false);

var S1Collection2 = S1Collection  // ASCENDING
                    .filterBounds(geometry)
                    .filterDate('2020-01-01','2021-01-01')
                    .filter(ee.Filter.listContains('transmitterReceiverPolarisation','HH'))
                    .select('HH','HV');

print(S1Collection2.filter(ee.Filter.eq('orbitProperties_pass','ASCENDING')).aggregate_histogram('relativeOrbitNumber_start'));
print(S1Collection2.filter(ee.Filter.eq('orbitProperties_pass','DESCENDING')).aggregate_histogram('relativeOrbitNumber_start'));

var S1img_ASC_HH_102 = S1Collection2.filter(ee.Filter.eq('orbitProperties_pass','ASCENDING'))
.filter(ee.Filter.eq('relativeOrbitNumber_start',102)).mean().clip(geometry).rename('HH_A1','HV_A1');
Map.addLayer(S1img_ASC_HH_102,{},'S1img_ASC_HH_102',false);
var S1img_ASC_HH_131 = S1Collection2.filter(ee.Filter.eq('orbitProperties_pass','ASCENDING'))
.filter(ee.Filter.eq('relativeOrbitNumber_start',131)).mean().clip(geometry).rename('HH_A2','HV_A2');
Map.addLayer(S1img_ASC_HH_131,{},'S1img_ASC_HH_131',false);
var S1img_ASC_HH_175 = S1Collection2.filter(ee.Filter.eq('orbitProperties_pass','ASCENDING'))
.filter(ee.Filter.eq('relativeOrbitNumber_start',175)).mean().clip(geometry).rename('HH_A3','HV_A3');
Map.addLayer(S1img_ASC_HH_175,{},'S1img_ASC_HH_175',false);
var S1img_ASC_HH_29 = S1Collection2.filter(ee.Filter.eq('orbitProperties_pass','ASCENDING'))
.filter(ee.Filter.eq('relativeOrbitNumber_start',29)).mean().clip(geometry).rename('HH_A4','HV_A4');
Map.addLayer(S1img_ASC_HH_29,{},'S1img_ASC_HH_29',false);


var S1img_DES_HH_124 = S1Collection2.filter(ee.Filter.eq('orbitProperties_pass','DESCENDING'))
.filter(ee.Filter.eq('relativeOrbitNumber_start',124)).mean().clip(geometry).rename('HH_D1','HV_D1');
Map.addLayer(S1img_DES_HH_124,{},'S1img_DES_HH_124',false);
var S1img_DES_HH_168 = S1Collection2.filter(ee.Filter.eq('orbitProperties_pass','DESCENDING'))
.filter(ee.Filter.eq('relativeOrbitNumber_start',168)).mean().clip(geometry).rename('HH_D2','HV_D2');
Map.addLayer(S1img_DES_HH_168,{},'S1img_DES_HH_168',false);
var S1img_DES_HH_22 = S1Collection2.filter(ee.Filter.eq('orbitProperties_pass','DESCENDING'))
.filter(ee.Filter.eq('relativeOrbitNumber_start',22)).mean().clip(geometry).rename('HH_D3','HV_D3');
Map.addLayer(S1img_DES_HH_22,{},'S1img_DES_HH_22',false);
var S1img_DES_HH_95 = S1Collection2.filter(ee.Filter.eq('orbitProperties_pass','DESCENDING'))
.filter(ee.Filter.eq('relativeOrbitNumber_start',95)).mean().clip(geometry).rename('HH_D4','HV_D4');
Map.addLayer(S1img_DES_HH_95,{},'S1img_DES_HH_95',false);

var S1img_ASC = ee.Image.cat([S1img_ASC_VV_102,S1img_ASC_VV_29,S1img_ASC_HH_102,
                              S1img_ASC_HH_131, S1img_ASC_HH_175, S1img_ASC_HH_29]);
Map.addLayer(S1img_ASC,{},'S1img_ASC',false);

var S1img_DES = ee.Image.cat([S1img_DES_VV_22,S1img_DES_VV_95,S1img_DES_HH_124,
                              S1img_DES_HH_168, S1img_DES_HH_22, S1img_DES_HH_95]);
Map.addLayer(S1img_DES,{},'S1img_DES',false);

var S2_CNN_collection = ee.ImageCollection("users/ghsl/S2_CNN");
var S2_CNN_img = S2_CNN_collection.mosaic().clip(geometry).gt(20).rename('U0');
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
 
var InputImg = ee.Image.cat([S1img_ASC, S1img_DES, S2_CNN_mean50, S2_CNN_mean100,
                             S2_CNN_mean150, S2_CNN_mean200, NL_img, HeightMap]);
 
var SampleHeight = InputImg.updateMask(HeightMap.gt(0)).sample({
  region: geometry,
  scale: 10,
  numPixels: 100000,
  dropNulls: true,
  tileScale: 8,
  });


Export.table.toDrive(SampleHeight, 'Stockholm_Height_Asc_Desc_100000', 'EuropHeight_samples'); 
  
