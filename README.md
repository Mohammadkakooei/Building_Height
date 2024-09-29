# Building Height Estimation using Sentinel-1 and Nighttime Light Data

This repository contains the code and resources for the paper "Mapping Building Heights at Large Scales Using Sentinel-1 Radar Imagery and Nighttime Light Data" by M. Kakooei and Y. Baleghi.

## Citation
Kakooei, M.; Baleghi, Y. Mapping Building Heights at Large Scales Using Sentinel-1 Radar Imagery and Nighttime Light Data. Remote Sens. 2024, 16, 3371. https://doi.org/10.3390/rs16183371

## Overview
This project uses Sentinel-1 radar data and nighttime light data to estimate building heights using a deep learning model (U-Net). The generated height maps contribute to Sustainable Development Goal 11 (sustainable cities).

## Installation
Clone this repository and install the required packages:

```bash
git clone https://github.com/Mohammadkakooei/Building_Height.git
cd Building_Height
pip install -r requirements.txt
```

## Data repo
Data repository includes downloaindg data samples for shallow models and data patches for deep models. Furthermore, it contains pre-preocessing of data cleaning, generating TFrecords etc.

Export CSV samples for feature analysis and training shallow models [Python Script](https://github.com/Mohammadkakooei/Building_Height/blob/6cfdf2a0422e25d413f9bcf5ff560431a0b17140/Data/Export_sample.js)

Export satellite data patches for training deep models for building height estimation [Python Script](https://github.com/Mohammadkakooei/Building_Height/blob/6cfdf2a0422e25d413f9bcf5ff560431a0b17140/Data/Export_patches.js)

Data cleaning of patches [Python Script](https://github.com/Mohammadkakooei/Building_Height/blob/6cfdf2a0422e25d413f9bcf5ff560431a0b17140/Data/Clean_Data_Patches.ipynb)

Convert raster to TFrecord [Python Script](https://github.com/Mohammadkakooei/Building_Height/blob/fadf8a6fc8d147727fc4def7c492827bb34420cd/Data/ConvertRaster2tfrecord.ipynb)

