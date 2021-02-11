import dayjs from "dayjs";

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

function formatDate(date) {
  if (date) {
    return dayjs(date).format("DD/MM/YYYY");
  }
}

function formatDateForm(date) {
  if (date) {
    return dayjs(date).format("YYYY-MM-DD");
  }
}

function formatDateHours(date) {
  return dayjs(date).format("DD/MM/YYYY à HH:mm:ss");
}

function now() {
  return dayjs();
}

function verifyDateExist(date) {
  if (dayjs(date).isSame("1900-01-01", 'year') || !date) {
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

function retard(dateFin, dateDebut) {
  if (dateFin !== "") {
    return dayjs(dateFin).diff(dayjs(dateDebut), "day");
  } else if (now().diff(dayjs(dateDebut), "day") > 0) {
    return now().diff(dayjs(dateDebut), "day");
  }
}

export default {
  determineStatus,
  formatDate,
  formatDateHours,
  verifyDateExist,
  formatDateForm,
  dateIsAfter,
  dateIsAfterDebut,
  now,
  retard,
};
