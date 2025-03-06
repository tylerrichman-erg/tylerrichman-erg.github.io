// Function to get the average environmental indicator value
function calcAverageSelectedEnvironmentalIndicators(
    Env_OzoneConcentrations,
    Env_PM25Concentrations,
    Env_DieselPMConcentrations,
    Env_TrafficProximity,
    Env_AirToxicsEmissions,
    Env_OzoneConcentrations_isChecked = true,
    Env_PM25Concentrations_isChecked = true,
    Env_DieselPMConcentrations_isChecked = true,
    Env_TrafficProximity_isChecked = true,
    Env_AirToxicsEmissions_isChecked = true
) {
    var countNonNull = 0;
    var sumNonNull = 0;

    let list = [];

    if (Env_OzoneConcentrations_isChecked){
        list.push(Env_OzoneConcentrations);
    }
    if (Env_PM25Concentrations_isChecked){
        list.push(Env_PM25Concentrations);
    }
    if (Env_DieselPMConcentrations_isChecked){
        list.push(Env_DieselPMConcentrations);
    }
    if (Env_TrafficProximity_isChecked){
        list.push(Env_TrafficProximity);
    }
    if (Env_AirToxicsEmissions_isChecked){
        list.push(Env_AirToxicsEmissions);
    }

    for (let i = 0; i < list.length; i++) {
        if (list[i] != null){
            sumNonNull = sumNonNull + list[i];
            countNonNull++;
        }
    }

    avgNonNull = sumNonNull / countNonNull;

    if (countNonNull === 0){
        avgNonNull = NaN;
    }

    return avgNonNull;
}

// Function to get the average health indicator value
function calcAverageSelectedHealthIndicators(
    Hea_AsthmaPrevalence,
    Hea_COPDPrevalence,
    Hea_HeartDiseasePrevalence,
    Hea_DisabilityPrevalence,
    Hea_CancerPrevalence,
    Hea_LowLifeExpectancy,
    Hea_AsthmaPrevalence_isChecked = true,
    Hea_COPDPrevalence_isChecked = true,
    Hea_HeartDiseasePrevalence_isChecked = true,
    Hea_DisabilityPrevalence_isChecked = true,
    Hea_CancerPrevalence_isChecked = true,
    Hea_LowLifeExpectancy_isChecked = true
) {
    var countNonNull = 0;
    var sumNonNull = 0;

    let list = [];

    if (Hea_AsthmaPrevalence_isChecked){
        list.push(Hea_AsthmaPrevalence);
    }
    if (Hea_COPDPrevalence_isChecked){
        list.push(Hea_COPDPrevalence);
    }
    if (Hea_HeartDiseasePrevalence_isChecked){
        list.push(Hea_HeartDiseasePrevalence);
    }
    if (Hea_DisabilityPrevalence_isChecked){
        list.push(Hea_DisabilityPrevalence);
    }
    if (Hea_CancerPrevalence_isChecked){
        list.push(Hea_CancerPrevalence);
    }
    if (Hea_LowLifeExpectancy_isChecked){
        list.push(Hea_LowLifeExpectancy);
    }

    for (let i = 0; i < list.length; i++) {
        if (list[i] != null){
            sumNonNull = sumNonNull + list[i];
            countNonNull++;
        }
    }

    avgNonNull = sumNonNull / countNonNull;

    if (countNonNull === 0){
        avgNonNull = NaN;
    }

    return avgNonNull;
}

// Function to get the average social determinants of health indicator value
function calcAverageSelectedSocialDeterminantsOfHealthIndicators(
    SoDe_DidNotCompleteHighSchool,
    SoDe_LowIncome,
    SoDe_LimitedEnglishProficiency,
    SoDe_PeopleOfColor,
    SoDe_DidNotCompleteHighSchool_isChecked = true,
    SoDe_LowIncome_isChecked = true,
    SoDe_LimitedEnglishProficiency_isChecked = true,
    SoDe_PeopleOfColor_isChecked = true
) {
    var countNonNull = 0;
    var sumNonNull = 0;

    let list = [];

    if (SoDe_DidNotCompleteHighSchool_isChecked){
        list.push(SoDe_DidNotCompleteHighSchool);
    }
    if (SoDe_LowIncome_isChecked){
        list.push(SoDe_LowIncome);
    }
    if (SoDe_LimitedEnglishProficiency_isChecked){
        list.push(SoDe_LimitedEnglishProficiency);
    }
    if (SoDe_PeopleOfColor_isChecked){
        list.push(SoDe_PeopleOfColor);
    }

    for (let i = 0; i < list.length; i++) {
        if (list[i] != null){
            sumNonNull = sumNonNull + list[i];
            countNonNull++;
        }
    }

    avgNonNull = sumNonNull / countNonNull;

    if (countNonNull === 0){
        avgNonNull = NaN;
    }

    return avgNonNull;
}

// Calculate Pollution Burden Index
function calcPollutionBurdenIndex(AverageSelectedEnvironmentalIndicators) {
    if (Number.isNaN(AverageSelectedEnvironmentalIndicators)) {
        return 1;
    } else {
        return AverageSelectedEnvironmentalIndicators / 1.5;
    }
}

// Calculate Pollution Burden Index
function calcVulnerablePopulationsIndex(AverageSelectedHealthIndicators, AverageSelectedSocialDeterminantsOfHealthIndicators) {
    if (Number.isNaN(AverageSelectedHealthIndicators) && Number.isNaN(AverageSelectedSocialDeterminantsOfHealthIndicators)) {
        return 1;
    } else if (Number.isNaN(AverageSelectedHealthIndicators)) {
        return AverageSelectedSocialDeterminantsOfHealthIndicators / 2;
    } else if (Number.isNaN(AverageSelectedSocialDeterminantsOfHealthIndicators)) {
        return AverageSelectedHealthIndicators / 2;
    } else {
        return (AverageSelectedHealthIndicators + AverageSelectedSocialDeterminantsOfHealthIndicators) / 2;
    }
}

// Calculate OBA Map Score
function calcOBAMapScore(PollutionBurdenIndex, VulnerablePopulationsIndex) {
    return PollutionBurdenIndex * VulnerablePopulationsIndex;
}

// Calculate 80th Percentile
function calculate80thPercentile(arr) {
    const sortedArr = [...arr].sort((a, b) => a - b);
    const index = (sortedArr.length - 1) * 0.8;
    const lowerIndex = Math.floor(index);
    const upperIndex = Math.ceil(index);
    if (lowerIndex === upperIndex) {
        return sortedArr[lowerIndex];
    } else {
        const lowerValue = sortedArr[lowerIndex];
        const upperValue = sortedArr[upperIndex];
        return lowerValue + (upperValue - lowerValue) * (index - lowerIndex);
    }
}