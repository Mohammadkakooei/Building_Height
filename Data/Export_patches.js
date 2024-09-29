var S1Collection = ee.ImageCollection("COPERNICUS/S1_GRD"),
    VIIRSCollection = ee.ImageCollection("NOAA/VIIRS/DNB/MONTHLY_V1/VCMSLCFG"),
    imageCollection = ee.ImageCollection("users/Temporary/Copernicus_Land_Monitoring_Service"),
    S2Collection = ee.ImageCollection("COPERNICUS/S2");

var HeightMap =  imageCollection.mosaic().rename('Height');
Map.addLayer(HeightMap,{},'HeightMap',false);

var imgList = imageCollection.toList(38);

for (var i=0; i<38; i++)
{
  
  var img = ee.Image(imgList.get(i));
  var img_id = ee.String(img.get('system:index')).getInfo();
  var img_geo = img.geometry();
  
  var img2 = img.focal_min(2500, 'square','meters');
  img2 = img2.where(img.lt(500),img);

var S1Collection2 = S1Collection  // ASCENDING
                    .filterBounds(img_geo)
                    .filterDate('2020-01-01','2021-01-01')
                    .filter(ee.Filter.listContains('transmitterReceiverPolarisation','VH'))
                    .select('VV','VH');

var S1img_ASC = S1Collection2.filter(ee.Filter.eq('orbitProperties_pass','ASCENDING')).mean().clip(img_geo).rename('VV_A','VH_A');
//Map.addLayer(S1img_ASC,{},'S1img_ASC',false);

var S1img_DES = S1Collection2.filter(ee.Filter.eq('orbitProperties_pass','DESCENDING')).mean().clip(img_geo).rename('VV_D','VH_D');
//Map.addLayer(S1img_DES,{},'S1img_DES',false);

var S1img = ee.Image.cat([S1img_ASC, S1img_DES]);
//Map.addLayer(S1img,{},'S1img',false);
 
var VIIRSCollection2 = VIIRSCollection
                    .filterDate('2020-01-01','2021-01-01')
                    .filterBounds(img_geo) ;
var NL_img = VIIRSCollection2.mean().select('avg_rad').clip(img_geo).rename('NL');
//Map.addLayer(NL_img,{},'NL_img',false);

 var terrain = ee.call('Terrain', ee.Image('USGS/SRTMGL1_003'));
var elevation = terrain.select(['elevation']).clip(img_geo);
//Map.addLayer(elevation,{},'elevation',false);
                             
var InputImg = ee.Image.cat([S1img, NL_img, elevation, img2]).clip(img_geo);                             
Map.addLayer(InputImg,{},'InputImg_'+img_id,false);

var image_export_options2 = {
  'fileDimensions': [224, 224],
  'shardSize': 224,
  'cloudOptimized': true
}

Export.image.toCloudStorage({
  image: InputImg.float(),
  description: img_id,
  bucket: 'heightmap',
  fileNamePrefix: 'Train03/'+img_id+'/',
  scale: 10,
  maxPixels:1e13, 
  region: img_geo,
  crs: 'EPSG:4326',
  fileFormat: 'GeoTIFF',
  skipEmptyTiles: true,
  formatOptions : image_export_options2
})
}





