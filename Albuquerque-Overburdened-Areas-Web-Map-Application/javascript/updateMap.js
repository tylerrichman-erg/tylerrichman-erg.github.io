function removeNonTileLayers(map) {
    map.eachLayer(function(layer) {
        if (!(layer instanceof L.TileLayer)) {
            map.removeLayer(layer);
        }
    });
}

function addBlockGroupLayer(
    dataJSON, 
    map,
    Env_OzoneConcentrations_isChecked,
    Env_PM25Concentrations_isChecked,
    Env_DieselPMConcentrations_isChecked,
    Env_TrafficProximity_isChecked,
    Env_AirToxicsEmissions_isChecked,
    Env_NO2Concentrations_isChecked,
    Env_SuperfundProximity_isChecked,
    Hea_AsthmaPrevalence_isChecked,
    Hea_COPDPrevalence_isChecked,
    Hea_HeartDiseasePrevalence_isChecked,
    Hea_DisabilityPrevalence_isChecked,
    Hea_CancerPrevalence_isChecked,
    Hea_LowLifeExpectancy_isChecked,
    SoDe_DidNotCompleteHighSchool_isChecked,
    SoDe_LowIncome_isChecked,
    SoDe_LimitedEnglishProficiency_isChecked,
    SoDe_PeopleOfColor_isChecked
) {
    // Add calculations to the pulled dataset
    let OBAMapScoreArray = [];
    for (let i = 0; i < dataJSON.features.length; i++) {
        dataJSON.features[i].properties.AverageSelectedEnvironmentalIndicators_Exposure = calcAverageSelectedEnvironmentalIndicators_Exposure(
            dataJSON.features[i].properties.Env_OzoneConcentrations,
            dataJSON.features[i].properties.Env_PM25Concentrations,
            dataJSON.features[i].properties.Env_DieselPMConcentrations,
            dataJSON.features[i].properties.Env_TrafficProximity,
            dataJSON.features[i].properties.Env_AirToxicsEmissions,
            dataJSON.features[i].properties.Env_NO2Concentrations,
            Env_OzoneConcentrations_isChecked,
            Env_PM25Concentrations_isChecked,
            Env_DieselPMConcentrations_isChecked,
            Env_TrafficProximity_isChecked,
            Env_AirToxicsEmissions_isChecked,
            Env_NO2Concentrations_isChecked
        );

        dataJSON.features[i].properties.AverageSelectedEnvironmentalIndicators_Sources = calcAverageSelectedEnvironmentalIndicators_Sources(
            dataJSON.features[i].properties.Env_SuperfundProximity,
            Env_SuperfundProximity_isChecked
        );

        dataJSON.features[i].properties.AverageSelectedHealthIndicators = calcAverageSelectedHealthIndicators(
            dataJSON.features[i].properties.Hea_AsthmaPrevalence,
            dataJSON.features[i].properties.Hea_COPDPrevalence,
            dataJSON.features[i].properties.Hea_HeartDiseasePrevalence,
            dataJSON.features[i].properties.Hea_DisabilityPrevalence,
            dataJSON.features[i].properties.Hea_CancerPrevalence,
            dataJSON.features[i].properties.Hea_LowLifeExpectancy,
            Hea_AsthmaPrevalence_isChecked,
            Hea_COPDPrevalence_isChecked,
            Hea_HeartDiseasePrevalence_isChecked,
            Hea_DisabilityPrevalence_isChecked,
            Hea_CancerPrevalence_isChecked,
            Hea_LowLifeExpectancy_isChecked
        );

        dataJSON.features[i].properties.AverageSelectedSocialDeterminantsOfHealthIndicators = calcAverageSelectedSocialDeterminantsOfHealthIndicators(
            dataJSON.features[i].properties.SoDe_DidNotCompleteHighSchool,
            dataJSON.features[i].properties.SoDe_LowIncome,
            dataJSON.features[i].properties.SoDe_LimitedEnglishProficiency,
            dataJSON.features[i].properties.SoDe_PeopleOfColor,
            SoDe_DidNotCompleteHighSchool_isChecked,
            SoDe_LowIncome_isChecked,
            SoDe_LimitedEnglishProficiency_isChecked,
            SoDe_PeopleOfColor_isChecked
        );

        dataJSON.features[i].properties.PollutionBurdenIndex = calcPollutionBurdenIndex(dataJSON.features[i].properties.AverageSelectedEnvironmentalIndicators_Exposure, dataJSON.features[i].properties.AverageSelectedEnvironmentalIndicators_Sources);
        dataJSON.features[i].properties.VulnerablePopulationsIndex = calcVulnerablePopulationsIndex(dataJSON.features[i].properties.AverageSelectedHealthIndicators, dataJSON.features[i].properties.AverageSelectedSocialDeterminantsOfHealthIndicators);
        dataJSON.features[i].properties.OBAMapScore = calcOBAMapScore(dataJSON.features[i].properties.PollutionBurdenIndex, dataJSON.features[i].properties.VulnerablePopulationsIndex);

        OBAMapScoreArray.push(dataJSON.features[i].properties.OBAMapScore);
    }

    var OBAMapScore80Pctile = calculate80thPercentile(OBAMapScoreArray);

    var testnum = 9.85;
    console.log(roundHalfUp(testnum, 1));
    
    L.geoJSON(dataJSON, {
        style: function(feature) {
            return {
                color: 'black',
                weight: 1,
                fillOpacity: 0.6,
                fillColor: isNaN(feature.properties.AverageSelectedEnvironmentalIndicators_Exposure) &&
                    isNaN(feature.properties.AverageSelectedEnvironmentalIndicators_Sources) &&
                    isNaN(feature.properties.AverageSelectedHealthIndicators) &&
                    isNaN(feature.properties.AverageSelectedSocialDeterminantsOfHealthIndicators)
                ? 'transparent'
                : feature.properties.OBAMapScore >= OBAMapScore80Pctile ? '#007FFF' : 'transparent'
                }
            },
            onEachFeature: function(feature, layer) {                  
                layer.bindPopup(
                    "<u><b>Census Block Group Stats </b></u><br>" + 
                    "<br><b>Census Block Group ID:</b> " +
                    feature.properties.BlockGroupID + 
                    "<br><b>Average Selected Environmental Indicators (Exposure):</b> " + 
                    roundHalfUp(feature.properties.AverageSelectedEnvironmentalIndicators_Exposure, 3) + 
                    "<br><b>Average Selected Environmental Indicators (Sources):</b> " + 
                    roundHalfUp(feature.properties.AverageSelectedEnvironmentalIndicators_Sources, 3) + 
                    "<br><b>Average Selected Health Indicators:</b> " +
                    roundHalfUp(feature.properties.AverageSelectedHealthIndicators, 3) + 
                    "<br><b>Average Selected Social Determinants of Health Indicators:</b> " +
                    roundHalfUp(feature.properties.AverageSelectedSocialDeterminantsOfHealthIndicators, 3) +
                    "<br><b>Pollution Burden Index:</b> " +
                    roundHalfUp(feature.properties.PollutionBurdenIndex, 3) + 
                    "<br><b>Vulnerable Populations Index:</b> " +
                    roundHalfUp(feature.properties.VulnerablePopulationsIndex, 3) +
                    "<br><b>OBA Map Score:</b> " +
                    roundHalfUp(feature.properties.OBAMapScore, 3) + 
                    "<br><b>OBA Map Score Percentile:</b> " +
                    roundHalfUp(percentRankInc(OBAMapScoreArray, feature.properties.OBAMapScore), 1) + "%",
                    {minWidth: 450}
                );
            }
    }).addTo(map);
}