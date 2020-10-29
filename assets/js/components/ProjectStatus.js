import DateAPI from "../services/DateAPI";

export const STATUS_CLASSES = {
    no_start: "info",
    in_progress: "warning",
    finished: "success",
    archived: "primary",
    late: "danger"
};

export const STATUS_LABEL = {
    no_start: "Pas démarré",
    in_progress: "En cours",
    finished: "Fini",
    archived: "Archivé",
    late: "En retard"
};

export function determineStatusClasses(dateDebut, dateFin, dateFinPrevue){

    return STATUS_CLASSES[DateAPI.determineStatus(dateDebut, DateAPI.verifyDateExist(dateFin), dateFinPrevue)];

}

export function determineStatusLabel(dateDebut, dateFin, dateFinPrevue){

    return STATUS_LABEL[DateAPI.determineStatus(dateDebut, DateAPI.verifyDateExist(dateFin), dateFinPrevue)];

}