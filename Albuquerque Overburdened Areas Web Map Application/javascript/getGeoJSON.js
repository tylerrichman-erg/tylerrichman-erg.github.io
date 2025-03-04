// Load GeoJSON from external file and apply styling
fetch('https://services1.arcgis.com/BN5Mj6q47j71sqyJ/ArcGIS/rest/services/Combined_Indicators/FeatureServer/0/query?where=1%3D1&objectIds=&geometry=&geometryType=esriGeometryPolygon&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&relationParam=&returnGeodetic=false&outFields=*&returnGeometry=true&returnCentroid=false&returnEnvelope=false&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&defaultSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=true&cacheHint=false&collation=&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnTrueCurves=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pgeojson&token=')                
    .then(response => response.json())
    .then(data => {
        workingData = data;
        addBlockGroupLayer(
            workingData, 
            map,
            Env_OzoneConcentrations_isChecked = true,
            Env_PM25Concentrations_isChecked = true,
            Env_DieselPMConcentrations_isChecked = true,
            Env_TrafficProximity_isChecked = true,
            Env_AirToxicsEmissions_isChecked = true,
            Hea_AsthmaPrevalence_isChecked = true,
            Hea_COPDPrevalence_isChecked = true,
            Hea_HeartDiseasePrevalence_isChecked = true,
            Hea_DisabilityPrevalence_isChecked = true,
            Hea_CancerPrevalence_isChecked = true,
            Hea_LowLifeExpectancy_isChecked = true,
            SoDe_DidNotCompleteHighSchool_isChecked = true,
            SoDe_LowIncome_isChecked = true,
            SoDe_LimitedEnglishProficiency_isChecked = true,
            SoDe_PeopleOfColor_isChecked = true
        );
    }
);