function logCheckboxStates() {
    let checkboxes = document.querySelectorAll('#controls input[type="checkbox"]');
    let checkboxStates = {};

    checkboxes.forEach(checkbox => {
        checkboxStates[checkbox.id] = checkbox.checked;
    });

    return checkboxStates;
}

document.querySelectorAll('#controls input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', (event) => {
        removeNonTileLayers(map);
        checkboxStates = logCheckboxStates();
        addBlockGroupLayer(
            workingData, 
            map,
            Env_OzoneConcentrations_isChecked = checkboxStates.Env_OzoneConcentrations_toggle,
            Env_PM25Concentrations_isChecked = checkboxStates.Env_PM25Concentrations_toggle,
            Env_DieselPMConcentrations_isChecked = checkboxStates.Env_DieselPMConcentrations_toggle,
            Env_TrafficProximity_isChecked = checkboxStates.Env_TrafficProximity_toggle,
            Env_AirToxicsEmissions_isChecked = checkboxStates.Env_AirToxicsEmissions_toggle,
            Hea_AsthmaPrevalence_isChecked = checkboxStates.Hea_AsthmaPrevalence_toggle,
            Hea_COPDPrevalence_isChecked = checkboxStates.Hea_COPDPrevalence_toggle,
            Hea_HeartDiseasePrevalence_isChecked = checkboxStates.Hea_HeartDiseasePrevalence_toggle,
            Hea_DisabilityPrevalence_isChecked = checkboxStates.Hea_DisabilityPrevalence_toggle,
            Hea_CancerPrevalence_isChecked = checkboxStates.Hea_CancerPrevalence_toggle,
            Hea_LowLifeExpectancy_isChecked = checkboxStates.Hea_LowLifeExpectancy_toggle,
            SoDe_DidNotCompleteHighSchool_isChecked = checkboxStates.SoDe_DidNotCompleteHighSchool_toggle,
            SoDe_LowIncome_isChecked = checkboxStates.SoDe_LowIncome_toggle,
            SoDe_LimitedEnglishProficiency_isChecked = checkboxStates.SoDe_LimitedEnglishProficiency_toggle,
            SoDe_PeopleOfColor_isChecked = checkboxStates.SoDe_PeopleOfColor_toggle
        );
    });
});