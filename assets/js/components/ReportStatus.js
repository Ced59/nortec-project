import DateAPI from "../services/DateAPI";

export const STATUS_REPORT_LABELS = {
  clotured: "Clôturé non envoyé",
  in_progress: "En cours de rédaction",
  sent: "Clôturé envoyé",
  validating: "En attente de validation",
};

export const STATUS_CLASSES = {
  no_start: "info",
  in_progress: "warning",
  finished: "success",
  late: "danger",
};

export const STATUS_LABEL = {
  no_start: "Pas démarré",
  in_progress: "En cours",
  finished: "Fini",
  late: "En retard",
};

export function statusEcheanceClasses(
  dateDebut,
  dateCloture,
  dateFinPrevue,
  dateReport
) {
  return STATUS_CLASSES[
    DateAPI.determineEcheanceStatus(
      dateDebut,
      dateCloture,
      dateFinPrevue,
      dateReport
    )
  ];
}

export function statusEcheanceLabel(
  dateDebut,
  dateCloture,
  dateFinPrevue,
  dateReport
) {
  return STATUS_LABEL[
    DateAPI.determineEcheanceStatus(
      dateDebut,
      dateCloture,
      dateFinPrevue,
      dateReport
    )
  ];
}
