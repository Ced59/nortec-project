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

function formatDateHours(date)
{
    return moment(date).format('DD/MM/YYYY à h:mm:ss' );
}

function verifyDateExist(date) {
    if (moment(date).isSame('1900-01-01'))
    {
        return "";
    }
}

export default {
    determineStatus,
    formatDate,
    formatDateHours,
    verifyDateExist
}

