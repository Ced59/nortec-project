import React, {useEffect, useState} from 'react';
import fakeData from "../components/fakeDataForDev/fakeData";

const ListReportsByProject = ({ match }) => {
    const id = match.params;
    const [listReport, setListReport] = useState([]);
    const reports = fakeData.fakeListReports();

    const fetchReports = id => {
        console.log(reports);
        console.log(id);
        const idProject = parseInt(id.id, 10);
        const reportsByProject = reports.filter((r) => r.project.id === idProject);
        console.log(reportsByProject);
    };

    useEffect(() => {
        fetchReports(id);
    }, [id]);

    return (
        <div>
            <p>test route</p>
        </div>
    );
};

export default ListReportsByProject;