import moment from "moment";


function determineStatus(dateDebut, dateFinReelle) {
    let status = "";

    if (!dateFinReelle)
    {
        if (moment().isBefore(dateDebut))
        {
            status = "no_start";
        }
        else
        {
            status = "in_progress";
        }
    }
    else
    {
        if (moment().diff(dateFinReelle, 'days') > 7)
        {
            status = "archived";
        }
        else
        {
            status = "finished";
        }
    }
    return status;
}

function formatDate(date)
{
    return moment(date).format('DD/MM/YYYY');
}

export default {
    determineStatus,
    formatDate
}

