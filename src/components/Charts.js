import { MDBContainer } from 'mdbreact';
import React, { useState, useContext, useEffect } from 'react';
import { Line } from "react-chartjs-2";
import { ChartOptions, ChartConfig } from '../services/Chart';
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
        const date = new Date();

        if (Array.isArray(declarations)) {
            const currentYearDeclarations = declarations
                .map(declaration => {
                    return { ...declaration, date: new Date(declaration.date) }
                })
                .filter(declaration => {
                    if(date.getFullYear() === declaration.date.getFullYear()){
                        if(declaration.date.getMonth() <= date.getMonth()){
                            return true;
                        }
                    } else if(declaration.date.getFullYear() >= date.getFullYear()-1 ) {
                        if(declaration.date.getMonth() > date.getMonth()){
                            return true;
                        }
                    }
                });

            return currentYearDeclarations;
        }

        return [];
    }

    const getNumberOfDeclarations = (contagious, chartConfig) => {
        let dataSet = chartConfig.dataLine.labels.map(() => 0);

        if (Array.isArray(declarations)) {
            for (let i = 0; i < declarations.length; i++) {

                const currentDeclaration = declarations[i];
                const monthName = currentDeclaration.date.toLocaleString('fr', { month: 'long' });
                const monthNameCapitalized = monthName.charAt(0).toUpperCase() + monthName.slice(1);
                const indexOfDatas = state.dataLine.labels.indexOf(monthNameCapitalized);

                if (currentDeclaration.contagious === contagious) {

                    dataSet[indexOfDatas] = dataSet[indexOfDatas] + 1;

                }
            }

        }

        return dataSet;
    }

    const viewLoader = () => {

        if (hasSelectedSchool() && state != null) {
            if (declarations === null) {
                return (
                    <MDBContainer className="mt-4">
                        <div role="status" className="spinner-border text-primary text-center">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </MDBContainer>
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

    }, [declarations]);

    return viewLoader();
}

export default Charts;