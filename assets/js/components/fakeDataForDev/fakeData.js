function fakeData() {
    const projects = [
        {
            id: 0,
            name: "La grande fléche qui pique le cul du ciel",
            description: "Aussi appelée la dame de fer!",
            photo: "../img/projects-img/projects-general-img/0-project-img.jpg",
            statut: "finished",
            adresse1: "Champ de Mars",
            adresse2: "",
            code_postal: "75000",
            ville: "Paris",
            date_debut: "27/02/2020",
            date_fin_reelle: "20/07/2020",
            date_fin_prevues:
                [
                    {
                        id: 0,
                        date: "27/03/2020"
                    },
                    {
                        id: 1,
                        date: "27/04/2020"
                    }
                ],
            nom_MOEX: "Capitaine Haddock",
            nom_OPC: "Tintin",
            contact_client: "moulinsart@herge.com"
        },
        {
            id: 1,
            name: "Ma maison",
            description: "On peut y faire quelques travaux??",
            photo: "../img/projects-img/projects-general-img/1-project-img.jpg",
            statut: "no_start",
            adresse1: "346 rue de Surprise",
            adresse2: "",
            code_postal: "59000",
            ville: "Bonne-Tranche-Sur-Mer",
            date_debut: "27/02/2020",
            date_fin_reelle: "",
            date_fin_prevues:
                [
                    {
                        id: 0,
                        date: "27/03/2020"
                    },
                    {
                        id: 1,
                        date: "27/04/2020"
                    }
                ],
            nom_MOEX: "Capitaine Haddock",
            nom_OPC: "Tintin",
            contact_client: "moulinsart@herge.com"
        },
        {
            id: 2,
            name: "Mon jardin",
            description: "Un petit nettoyage serait pas de refus :-)",
            photo: "../img/projects-img/projects-general-img/2-project-img.jpg",
            statut: "in_progress",
            adresse1: "346 rue de Surprise",
            adresse2: "",
            code_postal: "59000",
            ville: "Bonne-Tranche-Sur-Mer",
            date_debut: "27/02/2020",
            date_fin_reelle: "",
            date_fin_prevues:
                [
                    {
                        id: 0,
                        date: "27/03/2020"
                    },
                    {
                        id: 1,
                        date: "27/04/2020"
                    }
                ],
            nom_MOEX: "Capitaine Haddock",
            nom_OPC: "Tintin",
            contact_client: "moulinsart@herge.com"
        },
        {
            id: 3,
            name: "Le radôme",
            description: "Un super musée",
            photo: "../img/projects-img/projects-general-img/3-project-img.jpg",
            statut: "finished",
            adresse1: "Le Radôme",
            adresse2: "Cité des Télécoms",
            code_postal: "22560",
            ville: "Pleumeur-Bodou",
            date_debut: "27/02/2020",
            date_fin_reelle: "20/07/2020",
            date_fin_prevues:
                [
                    {
                        id: 0,
                        date: "27/03/2020"
                    },
                    {
                        id: 1,
                        date: "27/04/2020"
                    }
                ],
            nom_MOEX: "Capitaine Haddock",
            nom_OPC: "Tintin",
            contact_client: "moulinsart@herge.com"
        },
        {
            id: 4,
            name: "Fort-Mon-Chateau",
            description: "A l'assault Jacqouille!!!!",
            photo: "../img/projects-img/projects-general-img/4-project-img.jpg",
            statut: "in_progress",
            adresse1: "27 rue des Sarrazins",
            adresse2: "",
            code_postal: "15000",
            ville: "Montmirail",
            date_debut: "27/02/2020",
            date_fin_reelle: "",
            date_fin_prevues:
                [
                    {
                        id: 0,
                        date: "27/03/2020"
                    },
                    {
                        id: 1,
                        date: "27/04/2020"
                    }
                ],
            nom_MOEX: "Capitaine Haddock",
            nom_OPC: "Tintin",
            contact_client: "moulinsart@herge.com"
        },
        {
            id: 5,
            name: "Belle-Qui-Dort",
            description: "Un jour mon prince viendra.....",
            photo: "../img/projects-img/projects-general-img/5-project-img.jpg",
            statut: "archived",
            adresse1: "666 allée des somnifères",
            adresse2: "Entrée B",
            code_postal: "00000",
            ville: "Dodo-sur-Isère",
            date_debut: "27/02/2020",
            date_fin_reelle: "20/07/2020",
            date_fin_prevues:
                [
                    {
                        id: 0,
                        date: "27/03/2020"
                    },
                    {
                        id: 1,
                        date: "27/04/2020"
                    }
                ],
            nom_MOEX: "Capitaine Haddock",
            nom_OPC: "Tintin",
            contact_client: "moulinsart@herge.com"
        },
        {
            id: 6,
            name: "Empire State Building",
            description: "C'est haut mon capitaine!",
            photo: "../img/projects-img/projects-general-img/6-project-img.jpg",
            statut: "in_progress",
            adresse1: "20 W 34th Street",
            adresse2: "",
            code_postal: "10001",
            ville: "New-York",
            date_debut: "27/02/2020",
            date_fin_reelle: "",
            date_fin_prevues:
                [
                    {
                        id: 0,
                        date: "27/03/2020"
                    },
                    {
                        id: 1,
                        date: "27/04/2020"
                    }
                ],
            nom_MOEX: "Capitaine Haddock",
            nom_OPC: "Tintin",
            contact_client: "moulinsart@herge.com"
        },
        {
            id: 7,
            name: "Music Arena",
            description: "Le coin des musiciens",
            photo: "../img/projects-img/projects-general-img/7-project-img.jpg",
            statut: "archived",
            adresse1: "123 rue du Clair de la Lune",
            adresse2: "Chez Pierrot",
            code_postal: "98451",
            ville: "Sing Sing",
            date_debut: "27/02/2020",
            date_fin_reelle: "20/07/2020",
            date_fin_prevues:
                [
                    {
                        id: 0,
                        date: "27/03/2020"
                    },
                    {
                        id: 1,
                        date: "27/04/2020"
                    }
                ],
            nom_MOEX: "Capitaine Haddock",
            nom_OPC: "Tintin",
            contact_client: "moulinsart@herge.com"
        },
        {
            id: 8,
            name: "Le paradis des poissons",
            description: "Le grand aquarium restaurant et tout et tout... Fruits de mer à volonté. Thon frais à la demande.",
            photo: "../img/projects-img/projects-general-img/8-project-img.jpg",
            statut: "in_progress",
            adresse1: "56 Bikini Bottom Street",
            adresse2: "Chez Sponge Bob",
            code_postal: "32321",
            ville: "Glouglou Town",
            date_debut: "27/02/2020",
            date_fin_reelle: "",
            date_fin_prevues:
                [
                    {
                        id: 0,
                        date: "27/03/2020"
                    },
                    {
                        id: 1,
                        date: "27/04/2020"
                    }
                ],
            nom_MOEX: "Capitaine Haddock",
            nom_OPC: "Tintin",
            contact_client: "moulinsart@herge.com"
        }
    ]; //TODO Enlever ces exemples de projets quand requêtes axios

    return projects;
}

export default {
    fakeListProjects: fakeData
}