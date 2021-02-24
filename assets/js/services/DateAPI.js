import dayjs from "dayjs";
var customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

function determineStatus(dateDebut, dateFinReelle, dateFinPrevue) {
  let status = "";

  if (dateFinReelle === "") {
    if (dayjs().isBefore(dateDebut)) {
      status = "no_start";
    } else if (dayjs().isAfter(dateFinPrevue)) {
      status = "late";
    } else {
      status = "in_progress";
    }
  } else {
    if (dayjs().diff(dateFinReelle, "day") > 7) {
      status = "archived";
    } else {
      status = "finished";
    }
  }

  return status;
}

function determineEcheanceStatus(
  dateDebut,
  dateCloture,
  dateFinPrevue,
  dateReport
) {
  let status = "";

  if (!dateCloture) {
    if (dayjs().isBefore(dateDebut)) {
      status = "no_start";
    } else if (dayjs(dateReport).isAfter(dateFinPrevue)) {
      status = "late";
    } else {
      status = "in_progress";
    }
  } else {
    status = "finished";
  }
  return status;
}

function formatDate(date) {
  if (date) {
    return dayjs(date).format("DD/MM/YYYY");
  }
}

function formatDateForm(date) {
  if (date) {
    return date.split("T")[0];
  }
}

function formatDateFormConst(date) {
  if (date) {
    let year = dayjs(date).year();
    let month = dayjs(date).month() + 1;
    if (month < 10) {
      month = "0" + month;
    }
    let day = dayjs(date).date();
    if (day < 10) {
      day = "0" + day;
    }
    return year + "-" + month + "-" + day;
  }
}

function formatDateHours(date) {
  return dayjs(date).format("DD/MM/YYYY à HH:mm:ss");
}

function now() {
  return dayjs();
}

function verifyDateExist(date) {
  if (!dayjs(date).isAfter("1901-01-01") || !date) {
    return "";
  } else {
    return date;
  }
}

function dateIsAfter(dateToCompare, dateDebut, dateFinPrevues) {
  if (!dateIsAfterDebut(dateToCompare, dateDebut)) {
    return false;
  }

  let higherDate = "1900-01-01T00:00:00+00:00";

  dateFinPrevues.map((date) => {
    if (!dayjs(higherDate).isAfter(date.date)) {
      higherDate = date.date;
    }
  });

  return dayjs(dateToCompare).isAfter(higherDate);
}

function dateIsAfterDebut(dateToCompare, dateDebut) {
  return dayjs(dateToCompare).isAfter(dateDebut);
}

function retard(dateFin, dateDebut, dateReport) {
  if (dateFin) {
    return dayjs(dateFin).diff(dayjs(dateDebut), "day");
  } else if (dayjs(dateReport).diff(dayjs(dateDebut), "day") > 0) {
    return dayjs(dateReport).diff(dayjs(dateDebut), "day");
  }
}

export default {
  determineStatus,
  determineEcheanceStatus,
  formatDate,
  formatDateHours,
  verifyDateExist,
  formatDateForm,
  formatDateFormConst,
  dateIsAfter,
  dateIsAfterDebut,
  now,
  retard,
};
