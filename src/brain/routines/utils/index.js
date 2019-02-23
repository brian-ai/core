const getGreetingTime = (m) => {
    let humanizedTime = null;

    if (!m || !m.isValid()) { return; }

    let split_afternoon = 12
    let split_evening = 17
    let currentHour = parseFloat(m.format("HH"));

    if (currentHour >= split_afternoon && currentHour <= split_evening) {
        humanizedTime = "afternoon";
    } else if (currentHour >= split_evening) {
        humanizedTime = "evening";
    } else {
        humanizedTime = "morning";
    }

    return {
        humanizedTime,
        sentence: `<amazon:auto-breaths>Good ${humanizedTime} boss!!!`
    };
}

export {
    getGreetingTime,
}