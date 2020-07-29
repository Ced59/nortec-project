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
            codePostal: "75000",
            ville: "Paris",
            dateDebut: "2015-02-27",
            dateFinReelle: "2020-02-29",
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
            nomMOEX: "Capitaine Haddock",
            nomOPC: "Tintin",
            contactClient: "moulinsart@herge.com"
        },
        {
            id: 1,
            name: "Planet Express",
            description: "Et mon *** c'est du téflon???",
            photo: "../img/projects-img/projects-general-img/1-project-img.jpg",
            adresse1: "346 rue de Leila",
            adresse2: "",
            codePostal: "59000",
            ville: "New New York",
            dateDebut: "3000-02-27",
            dateFinReelle: "",
            date_fin_prevues:
                [],
            nomMOEX: "Bender Rodriguez",
            nomOPC: "Professeur Fansthworm",
            contactClient: "bender@tordeur.com"
        },
        {
            id: 2,
            name: "Mmmmmmm Donuuuuuts",
            description: "D'oh!!!!",
            photo: "../img/projects-img/projects-general-img/2-project-img.jpg",
            adresse1: "742 Evergreen Terasse",
            adresse2: "",
            codePostal: "54000",
            ville: "Springfield",
            dateDebut: "2020-03-27",
            dateFinReelle: "",
            date_fin_prevues:
                [],
            nomMOEX: "Homer Simpson",
            nomOPC: "Bart Simpson",
            contactClient: "homer@simpsons.com"
        },
        {
            id: 3,
            name: "Le radôme",
            description: "Un super musée",
            photo: "../img/projects-img/projects-general-img/3-project-img.jpg",
            adresse1: "Le Radôme",
            adresse2: "Cité des Télécoms",
            codePostal: "22560",
            ville: "Pleumeur-Bodou",
            dateDebut: "2020-02-19",
            dateFinReelle: "",
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
            nomMOEX: "Grande oreille",
            nomOPC: "Telecom",
            contactClient: "contact@lacitedestelecoms.com"
        },
        {
            id: 4,
            name: "Fort-Mon-Chateau",
            description: "A l'assault Jacqouille!!!!",
            photo: "../img/projects-img/projects-general-img/4-project-img.jpg",
            adresse1: "27 rue des Sarrazins",
            adresse2: "",
            codePostal: "15000",
            ville: "Montmirail",
            dateDebut: "2020-02-02",
            dateFinReelle: "",
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
            nomMOEX: "Godefroy",
            nomOPC: "Dame Ginette",
            contactClient: "jetrepassijefaiblis@jacqouille.com"
        },
        {
            id: 5,
            name: "Belle-Qui-Dort",
            description: "Un jour mon prince viendra.....",
            photo: "../img/projects-img/projects-general-img/5-project-img.jpg",
            adresse1: "666 allée des somnifères",
            adresse2: "Entrée B",
            codePostal: "00000",
            ville: "Dodo-sur-Isère",
            dateDebut: "2018-02-27",
            dateFinReelle: "2020-02-20",
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
            nomMOEX: "Mickey",
            nomOPC: "Donald",
            contactClient: "walt@disney.com"
        },
        {
            id: 6,
            name: "Empire State Building",
            description: "C'est haut mon capitaine!",
            photo: "../img/projects-img/projects-general-img/6-project-img.jpg",
            adresse1: "20 W 34th Street",
            adresse2: "",
            codePostal: "10001",
            ville: "New-York",
            dateDebut: "2020-01-10",
            dateFinReelle: "",
            date_fin_prevues:
                [
                    {
                        id: 0,
                        date: "2020-10-15"
                    }
                ],
            nomMOEX: "Al Capone",
            nomOPC: "Donald Trump",
            contactClient: "trump@orange.com"
        },
        {
            id: 7,
            name: "Music Arena",
            description: "Le coin des musiciens",
            photo: "../img/projects-img/projects-general-img/7-project-img.jpg",
            adresse1: "123 rue du Clair de la Lune",
            adresse2: "Chez Pierrot",
            codePostal: "98451",
            ville: "Sing Sing",
            dateDebut: "2017-10-11",
            dateFinReelle: "2020-01-03",
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
            nomMOEX: "Wolfgang Amadeus Mozart",
            nomOPC: "Ludwig Van Beethoven",
            contactClient: "doremi@fasollasi.com"
        },
        {
            id: 8,
            name: "Le paradis des poissons",
            description: "Le grand aquarium restaurant et tout et tout... Fruits de mer à volonté. Thon frais à la demande.",
            photo: "../img/projects-img/projects-general-img/8-project-img.jpg",
            adresse1: "56 Bikini Bottom Street",
            adresse2: "Chez Sponge Bob",
            codePostal: "32321",
            ville: "Glouglou Town",
            dateDebut: "2015-05-12",
            dateFinReelle: "",
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
            nomMOEX: "Nemo",
            nomOPC: "La petite Sirène",
            contactClient: "boirelatasse@glouglou.com"
        }
    ];
}

function fakeListReports() {
    return [
        {
            id: 0,
            project: projectById(7),
            redacteur: "Ced",
            dateRedaction: "2020-03-03T18:25:43",
            status: "in-progress",
            proprete_conformity: true,
            proprete_imputation: [], //pas implémenté
            proprete_comment: "Tout est très propre !",
            proprete_comment_intern:
                "Ils ont pas été contents mais je m'en fous ils ont nettoyé!!",
            securityConformity: true,
            propreteAccessComment: "RAS",
            propreteAccessCommentIntern:
                "Y'a fallu leur botter les fesses pour qu'ils mettent cette fichue barrière!",
            installations: "10 échafaudages, 5 tracto-pelles",
            lots: [
                {
                    id: 0,
                    numeroLot: "101ABC674",
                    libelleLot: "FOURNISSEUR SPECIAL",
                    entreprise: companyById(3),
                    effectifPrevu: 5,
                    effectifConstate: 2
                },
                {
                    id: 1,
                    numeroLot: "10242342DEF",
                    libelleLot: "INSTALLATION TELEPHONE",
                    entreprise: companyById(4),
                    effectifPrevu: 5,
                    effectifConstate: 4
                },
                {
                    id: 2,
                    numeroLot: "102AZZZAA1FEF",
                    libelleLot: "INSTALLATION FIBRE",
                    entreprise: companyById(4),
                    effectifPrevu: 5,
                    effectifConstate: 7
                },
                {
                    id: 3,
                    numeroLot: "102EEZDSS",
                    libelleLot: "MISE EN PLACE ANTENNES SPECIALES",
                    entreprise: companyById(4),
                    effectifPrevu: 5,
                    effectifConstate: 0
                },
                {
                    id: 4,
                    numeroLot: "10DSSQSDSSDHJH",
                    libelleLot: "FOURNITURE ELECTRICITE",
                    entreprise: companyById(2),
                    effectifPrevu: 5,
                    effectifConstate: 5
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
            propreteAccessConformity: "noconform",
            propreteIccessImputation:
                [
                    {
                        id: 0,
                        company: companyById(0),
                        pourcent: 25
                    },
                    {
                        id: 1,
                        company: companyById(1),
                        pourcent: 25
                    },
                    {
                        id: 2,
                        company: companyById(2),
                        pourcent: 25
                    },
                    {
                        id: 3,
                        company: companyById(3),
                        pourcent: 25
                    },
                    {
                        id: 4,
                        company: companyById(4),
                        pourcent: 0
                    }

                ],
            propreteAccessComment: "4 entreprises sur 5 devront payer",
            propreteAccessCommentIntern: "C'etait dégueulasse !!!",
            propreteCommuneConformity: false,
            proprete_commune_imputation:
                [
                    {
                        id: 0,
                        company: companyById(0),
                        commentaire: "Doit nettoyer les toilettes",
                        percent: 25
                    },
                    {
                        id: 1,
                        company: companyById(1),
                        commentaire: "Doit sortir ses poubelles",
                        percent: 25
                    },
                    {
                        id: 2,
                        company: companyById(2),
                        commentaire: "Ne doit plus laisser trainer ses boites de Donuts",
                        percent: 25
                    },
                    {
                        id: 3,
                        company: companyById(3),
                        commentaire: "Les couillère en or c'est fini!",
                        percent: 25
                    },
                    {
                        id: 4,
                        company: companyById(4),
                        commentaire: "Très bien cette semaine!",
                        percent: 0
                    }

                ],
            propreteCommuneComment: "Veillez a effectuez cela avant que l'on demande a une entreprise svp",
            propreteCommuneCommentIntern: "J'en ai marre de voir leur merde trainer partout, va falloir durcir",
            securityConformity: false,
            securityConmment_imputations: [
                {
                    id: 0,
                    company: companyById(0),
                    commentaire: "Reparer les barrière de sécurité"
                },
                {
                    id: 1,
                    company: companyById(1),
                    commentaire: "Enlever les piquet non utile"
                },
                {
                    id: 2,
                    company: companyById(2),
                    commentaire: "Arrêter la surcharge de plutonium!!!!"
                },
                {
                    id: 3,
                    company: companyById(3),
                    commentaire: ""
                },
                {
                    id: 4,
                    company: companyById(4),
                    commentaire: ""
                }

            ],
            securityConmment: "RAS",
            securityConmmentIntern:
                "Y'a fallu leur botter les fesses pour qu'ils mettent cette fichue barrière!",
            installations: "10 échafaudages, 5 tracto-pelles",
            lots: [
                {
                    id: 5,
                    numeroLot: "101ABC654",
                    libelleLot: "POSE MOQUETTE",
                    entreprise: companyById(0),
                    effectifPrevu: 5,
                    effectifConstate: 5
                },
                {
                    id: 6,
                    numeroLot: "102DEF",
                    libelleLot: "COULAGE DE BETON",
                    entreprise: companyById(1),
                    effectifPrevu: 5,
                    effectifConstate: 2
                },
                {
                    id: 7,
                    numeroLot: "102121FEF",
                    libelleLot: "POSE ROBINETTERIE",
                    entreprise: companyById(3),
                    effectifPrevu: 5,
                    effectifConstate: 10
                },
                {
                    id: 8,
                    numeroLot: "10210DSS",
                    libelleLot: "INSTALLATION VIDEO SURVEILLANCE",
                    entreprise: companyById(4),
                    effectifPrevu: 5,
                    effectifConstate: 5
                },
                {
                    id: 9,
                    numeroLot: "10DSS",
                    libelleLot: "FOURNITURE ELECTRICITE",
                    entreprise: companyById(2),
                    effectifPrevu: 5,
                    effectifConstate: 0
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
            propreteAccessComment: "Tout est très propre !",
            propreteAccessCommentIntern:
                "Ils ont pas été contents mais je m'en fous ils ont nettoyé!!",
            securityConformity: true,
            securityConmment: "RAS",
            securityConmmentIntern:
                "Y'a fallu leur botter les fesses pour qu'ils mettent cette fichue barrière!",
            installations: "10 échafaudages, 5 tracto-pelles",
            lots: [
                {
                    id: 10,
                    numeroLot: "101ABC614154",
                    libelleLot: "ENQUETES CRIM",
                    entreprise: companyById(3)
                },
                {
                    id: 11,
                    numeroLot: "10211120DEF",
                    libelleLot: "POSE DES JUDAS",
                    entreprise: companyById(4)
                },
                {
                    id: 12,
                    numeroLot: "1021211148511FEF",
                    libelleLot: "POSE ROBINETTERIE",
                    entreprise: companyById(5)
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

function fakeListCompanies() {
    return [
        {
            id: 0,
            nom: "Le roi de la moquette",
            adresse1: "36 quai des Orfèvres",
            adresse2: "",
            codePostal: "75000",
            ville: "Paris",
            mail1: "moquetteman@raslamoquette.com",
            mail2: "razmoket@cesttouffu.org"
        },
        {
            id: 1,
            nom: "Béton Armé",
            adresse1: "56 rue betonnée",
            adresse2: "Dans le béton",
            codePostal: "56123",
            ville: "Béton-City",
            mail1: "ilestdurmonbeton@arme.com",
            mail2: ""
        },
        {
            id: 2,
            nom: "Centrale nucléaire de Springfield",
            adresse1: "777 rue de l'atome",
            adresse2: "Derrière Chez Mr Burns",
            codePostal: "78451",
            ville: "Springfield",
            mail1: "montyburns@enfoire.com",
            mail2: "wellonsmithers@larbin.com"
        },
        {
            id: 3,
            nom: "Lux",
            adresse1: "666 rue de l'enfer",
            adresse2: "",
            codePostal: "78451",
            ville: "Los Angeles",
            mail1: "lucifermorningstar@hell.com",
            mail2: "lieutenantdan@ducon.com"
        },
        {
            id: 4,
            nom: "NSA",
            adresse1: "9800 Savage Road",
            adresse2: "Derrière toi",
            codePostal: "74451",
            ville: "Maryland",
            mail1: "bigbrothervousregarde@cia.com",
            mail2: ""
        },
        {
            id: 5,
            nom: "Bender Company",
            adresse1: "Future Street",
            adresse2: "Teflon Village",
            codePostal: "74411",
            ville: "New New York",
            mail1: "benderrodriguez@teflon.com",
            mail2: ""
        }

    ];
}


function companyById(id) {
    const companies = fakeListCompanies();
    const companyById = filterById(companies, id);

    return companyById[0];
}

function projectById(id) {
    const projects = fakeData();
    const projectById = filterById(projects, id);

    return projectById[0];
}

function reportById(id) {
    const reports = fakeListReports();
    const reportById = filterById(reports, id);

    return reportById[0];
}

function filterById(tab, id) {
    return tab.filter(
        t => t.id === id
    );
}


export default {
    fakeListProjects: fakeData,
    fakeListReports,
    reportById,
    fakeListCompanies,
    companyById
}
