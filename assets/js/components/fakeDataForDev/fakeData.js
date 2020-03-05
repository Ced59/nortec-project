function fakeData() {
     //TODO Enlever ces exemples de projets quand requêtes axios
    return [
        {
            id: 0,
            name: "La grande fléche qui pique le cul du ciel",
            description: "Aussi appelée la dame de fer!",
            photo: "../img/projects-img/projects-general-img/0-project-img.jpg",
            adresse1: "Champ de Mars",
            adresse2: "",
            code_postal: "75000",
            ville: "Paris",
            date_debut: "2015-02-27",
            date_fin_reelle: "2020-02-29",
            date_fin_prevues:
                [
                    {
                        id: 0,
                        date: "2017-03-27"
                    },
                    {
                        id: 1,
                        date: "2017-04-27"
                    }
                ],
            nom_MOEX: "Capitaine Haddock",
            nom_OPC: "Tintin",
            contact_client: "moulinsart@herge.com"
        },
        {
            id: 1,
            name: "Planet Express",
            description: "Et mon *** c'est du téflon???",
            photo: "../img/projects-img/projects-general-img/1-project-img.jpg",
            adresse1: "346 rue de Leila",
            adresse2: "",
            code_postal: "59000",
            ville: "New New York",
            date_debut: "3000-02-27",
            date_fin_reelle: "",
            date_fin_prevues:
                [],
            nom_MOEX: "Bender Rodriguez",
            nom_OPC: "Professeur Fansthworm",
            contact_client: "bender@tordeur.com"
        },
        {
            id: 2,
            name: "Mmmmmmm Donuuuuuts",
            description: "D'oh!!!!",
            photo: "../img/projects-img/projects-general-img/2-project-img.jpg",
            adresse1: "742 Evergreen Terasse",
            adresse2: "",
            code_postal: "54000",
            ville: "Springfield",
            date_debut: "2020-03-27",
            date_fin_reelle: "",
            date_fin_prevues:
                [],
            nom_MOEX: "Homer Simpson",
            nom_OPC: "Bart Simpson",
            contact_client: "homer@simpsons.com"
        },
        {
            id: 3,
            name: "Le radôme",
            description: "Un super musée",
            photo: "../img/projects-img/projects-general-img/3-project-img.jpg",
            adresse1: "Le Radôme",
            adresse2: "Cité des Télécoms",
            code_postal: "22560",
            ville: "Pleumeur-Bodou",
            date_debut: "2020-02-19",
            date_fin_reelle: "",
            date_fin_prevues:
                [
                    {
                        id: 0,
                        date: "2020-03-27"
                    },
                    {
                        id: 1,
                        date: "2020-04-12"
                    }
                ],
            nom_MOEX: "Grande oreille",
            nom_OPC: "Telecom",
            contact_client: "contact@lacitedestelecoms.com"
        },
        {
            id: 4,
            name: "Fort-Mon-Chateau",
            description: "A l'assault Jacqouille!!!!",
            photo: "../img/projects-img/projects-general-img/4-project-img.jpg",
            adresse1: "27 rue des Sarrazins",
            adresse2: "",
            code_postal: "15000",
            ville: "Montmirail",
            date_debut: "2020-02-02",
            date_fin_reelle: "",
            date_fin_prevues:
                [
                    {
                        id: 0,
                        date: "2020-03-18"
                    },
                    {
                        id: 1,
                        date: "2020-10-20"
                    },
                    {
                        id: 2,
                        date: "2022-10-20"
                    }
                ],
            nom_MOEX: "Godefroy",
            nom_OPC: "Dame Ginette",
            contact_client: "jetrepassijefaiblis@jacqouille.com"
        },
        {
            id: 5,
            name: "Belle-Qui-Dort",
            description: "Un jour mon prince viendra.....",
            photo: "../img/projects-img/projects-general-img/5-project-img.jpg",
            adresse1: "666 allée des somnifères",
            adresse2: "Entrée B",
            code_postal: "00000",
            ville: "Dodo-sur-Isère",
            date_debut: "2018-02-27",
            date_fin_reelle: "2020-02-20",
            date_fin_prevues:
                [
                    {
                        id: 0,
                        date: "2019-03-27"
                    },
                    {
                        id: 1,
                        date: "2019-12-24"
                    }
                ],
            nom_MOEX: "Mickey",
            nom_OPC: "Donald",
            contact_client: "walt@disney.com"
        },
        {
            id: 6,
            name: "Empire State Building",
            description: "C'est haut mon capitaine!",
            photo: "../img/projects-img/projects-general-img/6-project-img.jpg",
            adresse1: "20 W 34th Street",
            adresse2: "",
            code_postal: "10001",
            ville: "New-York",
            date_debut: "2020-01-10",
            date_fin_reelle: "",
            date_fin_prevues:
                [
                    {
                        id: 0,
                        date: "2020-10-15"
                    }
                ],
            nom_MOEX: "Al Capone",
            nom_OPC: "Donald Trump",
            contact_client: "trump@orange.com"
        },
        {
            id: 7,
            name: "Music Arena",
            description: "Le coin des musiciens",
            photo: "../img/projects-img/projects-general-img/7-project-img.jpg",
            adresse1: "123 rue du Clair de la Lune",
            adresse2: "Chez Pierrot",
            code_postal: "98451",
            ville: "Sing Sing",
            date_debut: "2017-10-11",
            date_fin_reelle: "2020-01-03",
            date_fin_prevues:
                [
                    {
                        id: 0,
                        date: "2018-02-19"
                    },
                    {
                        id: 1,
                        date: "2019-12-15"
                    }
                ],
            nom_MOEX: "Wolfgang Amadeus Mozart",
            nom_OPC: "Ludwig Van Beethoven",
            contact_client: "doremi@fasollasi.com"
        },
        {
            id: 8,
            name: "Le paradis des poissons",
            description: "Le grand aquarium restaurant et tout et tout... Fruits de mer à volonté. Thon frais à la demande.",
            photo: "../img/projects-img/projects-general-img/8-project-img.jpg",
            adresse1: "56 Bikini Bottom Street",
            adresse2: "Chez Sponge Bob",
            code_postal: "32321",
            ville: "Glouglou Town",
            date_debut: "2015-05-12",
            date_fin_reelle: "",
            date_fin_prevues:
                [
                    {
                        id: 0,
                        date: "2017-12-02"
                    },
                    {
                        id: 1,
                        date: "2018-12-15"
                    },
                    {
                        id: 2,
                        date: "2020-12-15"
                    }
                ],
            nom_MOEX: "Nemo",
            nom_OPC: "La petite Sirène",
            contact_client: "boirelatasse@glouglou.com"
        }
    ];
}

function fakeListReports()
{
    return [
        {
            id: 0,
            project: projectById(7),
            redacteur: "Ced",
            dateRedaction: "2020-03-03T18:25:43",
            status: "in-progress",
            proprete_conformity: true,
            proprete_imputation: [],
            proprete_comment: "Tout est très propre !",
            proprete_comment_intern:
                "Ils ont pas été contents mais je m'en fous ils ont nettoyé!!",
            security_conformity: true,
            security_comment: "RAS",
            security_comment_intern:
                "Y'a fallu leur botter les fesses pour qu'ils mettent cette fichue barrière!",
            installations: "10 échafaudages, 5 tracto-pelles",
            lots: [
                {
                    id: 0,
                    numero_lot: "101ABC654",
                    libelle_lot: "POSE MOQUETTE",
                    nom_entreprise: "Le roi de la moquette"
                },
                {
                    id: 1,
                    nom_entreprise: "Béton Armé",
                    numero_lot: "102DEF",
                    libelle_lot: "COULAGE DE BETON"
                },
                {
                    id: 2,
                    nom_entreprise: "Durand Plomberie",
                    numero_lot: "102121FEF",
                    libelle_lot: "POSE ROBINETTERIE"
                },
                {
                    id: 3,
                    nom_entreprise: "Durand Plomberie",
                    numero_lot: "10210DSS",
                    libelle_lot: "INSTALLATION CHAUDIERE"
                },
                {
                    id: 4,
                    nom_entreprise: "Moulinsart Construction",
                    numero_lot: "10DSS",
                    libelle_lot: "POSE FENETRES"
                }
            ],
            photos: [
                {
                    id: 0,
                    link: "../img/projects-img/projects-general-img/8-project-img.jpg",
                    type: "security"
                },
                {
                    id: 1,
                    link: "../img/projects-img/projects-general-img/8-project-img.jpg",
                    type: "proprete"
                }
            ],
            echeances: []
        },
        {
            id: 1,
            project: projectById(1),
            redacteur: "Ced",
            dateRedaction: "2020-03-03T15:21:12",
            status: "clotured",
            proprete_conformity: true,
            proprete_imputation: [],
            proprete_comment: "Tout est très propre !",
            proprete_comment_intern:
                "Ils ont pas été contents mais je m'en fous ils ont nettoyé!!",
            security_conformity: true,
            security_comment: "RAS",
            security_comment_intern:
                "Y'a fallu leur botter les fesses pour qu'ils mettent cette fichue barrière!",
            installations: "10 échafaudages, 5 tracto-pelles",
            lots: [
                {
                    id: 0,
                    numero_lot: "101ABC654",
                    libelle_lot: "POSE MOQUETTE",
                    nom_entreprise: "Le roi de la moquette"
                },
                {
                    id: 1,
                    nom_entreprise: "Béton Armé",
                    numero_lot: "102DEF",
                    libelle_lot: "COULAGE DE BETON"
                },
                {
                    id: 2,
                    nom_entreprise: "Durand Plomberie",
                    numero_lot: "102121FEF",
                    libelle_lot: "POSE ROBINETTERIE"
                },
                {
                    id: 3,
                    nom_entreprise: "Durand Plomberie",
                    numero_lot: "10210DSS",
                    libelle_lot: "INSTALLATION CHAUDIERE"
                },
                {
                    id: 4,
                    nom_entreprise: "Moulinsart Construction",
                    numero_lot: "10DSS",
                    libelle_lot: "POSE FENETRES"
                }
            ],
            photos: [
                {
                    id: 2,
                    link: "../img/projects-img/projects-general-img/8-project-img.jpg",
                    type: "security"
                },
                {
                    id: 3,
                    link: "../img/projects-img/projects-general-img/8-project-img.jpg",
                    type: "proprete"
                }
            ],
            echeances: []
        },
        {
            id: 3,
            project: projectById(1),
            redacteur: "Ced",
            dateRedaction: "2020-03-03T08:59:01",
            status: "clotured",
            proprete_conformity: true,
            proprete_imputation: [],
            proprete_comment: "Tout est très propre !",
            proprete_comment_intern:
                "Ils ont pas été contents mais je m'en fous ils ont nettoyé!!",
            security_conformity: true,
            security_comment: "RAS",
            security_comment_intern:
                "Y'a fallu leur botter les fesses pour qu'ils mettent cette fichue barrière!",
            installations: "10 échafaudages, 5 tracto-pelles",
            lots: [
                {
                    id: 0,
                    numero_lot: "101ABC654",
                    libelle_lot: "POSE MOQUETTE",
                    nom_entreprise: "Le roi de la moquette"
                },
                {
                    id: 1,
                    nom_entreprise: "Béton Armé",
                    numero_lot: "102DEF",
                    libelle_lot: "COULAGE DE BETON"
                },
                {
                    id: 2,
                    nom_entreprise: "Durand Plomberie",
                    numero_lot: "102121FEF",
                    libelle_lot: "POSE ROBINETTERIE"
                },
                {
                    id: 3,
                    nom_entreprise: "Durand Plomberie",
                    numero_lot: "10210DSS",
                    libelle_lot: "INSTALLATION CHAUDIERE"
                },
                {
                    id: 4,
                    nom_entreprise: "Moulinsart Construction",
                    numero_lot: "10DSS",
                    libelle_lot: "POSE FENETRES"
                }
            ],
            photos: [
                {
                    id: 4,
                    link: "../img/projects-img/projects-general-img/8-project-img.jpg",
                    type: "security"
                },
                {
                    id: 5,
                    link: "../img/projects-img/projects-general-img/8-project-img.jpg",
                    type: "proprete"
                }
            ],
            echeances: []
        }
    ];
}

function projectById(id)
{
    const projects = fakeData();
    return projects[id];
}


export default {
    fakeListProjects: fakeData,
    fakeListReports
}