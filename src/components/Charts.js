import { MDBContainer } from 'mdbreact';
import React, { useState, useContext, useEffect } from 'react';
import { Line } from "react-chartjs-2";
import {ChartOptions, ChartConfig} from '../services/Chart';
import { AppContext } from '../services/AppContext';

const Charts = () => {

    const { schools } = useContext(AppContext);
    const [declarations, setDeclarations] = useState(null);

    const fetchDeclarationsDate = () => {
        fetch(`${process.env.REACT_APP_API_URL}/api/declarations/${schools.selectedSchool.id}`)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
            })
            .then(declarations => setDeclarations(getDeclarationsCurrentYear(declarations)));
    }

    const hasSelectedSchool = () => {
        return Object.keys(schools.selectedSchool).length > 0;
    }

    const [state, setState] = useState(null);

    const getDeclarationsCurrentYear = (declarations) => {
        const currentYear = new Date();

        if (Array.isArray(declarations)) {
            const currentYearDeclarations = declarations
                .map(declaration => {
                    return { ...declaration, date: new Date(declaration.date) }
                })
                .filter(declaration => currentYear.getFullYear() === declaration.date.getFullYear());

            return currentYearDeclarations;
        }

        return [];
    }

    const getNumberOfDeclarations = (contagious, chartConfig) => {
        let dataSet = chartConfig.dataLine.labels.map(() => 0);

        if (Array.isArray(declarations)) {
            for (let i = 0; i < declarations.length; i++) {
                const currentDeclaration = declarations[i];

                if (currentDeclaration.contagious === contagious) {
                    const declarationMonth = currentDeclaration.date.getMonth();

                    dataSet[declarationMonth] = dataSet[declarationMonth] + 1;

                }
            }

            console.log(dataSet);

        }

        return dataSet;
    }

    const viewLoader = () => {

        if (hasSelectedSchool() && state != null) {
            if (declarations === null) {
                return (
                    <div className="spinner-border text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                );
            } else {
                return (
                    <MDBContainer>
                        <h3 className="mt-5">Graphique de l'année actuelle</h3>
                        <Line data={state.dataLine} options={ChartOptions} />
                    </MDBContainer>
                )
            }

        } else {

            return (
                <div>
                </div>
            )
        }
    }

    useEffect(() => {
        if (hasSelectedSchool()) {
            fetchDeclarationsDate();
        }
    }, [schools.selectedSchool]);

    useEffect(() => {
        let newState = ChartConfig();
        newState.dataLine.datasets[0].data = getNumberOfDeclarations(false, newState);
        newState.dataLine.datasets[1].data = getNumberOfDeclarations(true, newState);

        setState(newState);

        console.log('DECLARATIONS HAS CHANGED');
    }, [declarations]);

    useEffect(() =>{

        return () => console.log('UNMOUNTED CHART');
    }, []);

    return viewLoader();
}

export default Charts;