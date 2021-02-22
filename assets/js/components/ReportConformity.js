import { toast } from 'react-toastify';
import ReportsAPI from '../services/ReportsAPI';

const handleSubmitConformity = async (conformitySection, conformity, fetchReport, idReport) => {
  const reportConformity = { [conformitySection]: conformity };
  try {
    await ReportsAPI.update(idReport, reportConformity);
    toast.success("Statut de la conformité enregistré avec succès!");
    fetchReport(idReport);
  } catch (e) {
    console.log(e);
    console.log(e.response);
    toast.error(
      "Une erreur est survenue lors de la mise à jour de la conformité"
    );
  }
};

export default handleSubmitConformity;