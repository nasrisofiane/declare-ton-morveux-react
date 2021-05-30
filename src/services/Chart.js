
const ChartConfig = () => {

    const generateMonthFromNow = () => {
        let months = [];

        for (let i = 11; i >= 0; i--) {
            let now = new Date();
            now.setMonth(now.getMonth() - i);

            let month = now.toLocaleString('fr', { month: 'long' });
            month = month.substring(0,1).toLocaleUpperCase() + month.substring(1, month.length);

            months.push(month);
        }

        

        return months;
    }

    generateMonthFromNow();

    return {
        dataLine: {
            labels: generateMonthFromNow(),

            datasets: [
                {
                    label: "Malades non contagieux",
                    fill: true,
                    lineTension: 0.3,
                    backgroundColor: "rgba(225, 204,230, .3)",
                    borderColor: "rgb(205, 130, 158)",
                    borderCapStyle: "butt",
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: "miter",
                    pointBorderColor: "rgb(205, 130,1 58)",
                    pointBackgroundColor: "rgb(255, 255, 255)",
                    pointBorderWidth: 10,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgb(0, 0, 0)",
                    pointHoverBorderColor: "rgba(220, 220, 220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: null
                },
                {
                    label: "Malades contagieux",
                    fill: true,
                    lineTension: 0.3,
                    backgroundColor: "rgba(184, 185, 210, .3)",
                    borderColor: "rgb(35, 26, 136)",
                    borderCapStyle: "butt",
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: "miter",
                    pointBorderColor: "rgb(35, 26, 136)",
                    pointBackgroundColor: "rgb(255, 255, 255)",
                    pointBorderWidth: 10,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgb(0, 0, 0)",
                    pointHoverBorderColor: "rgba(220, 220, 220, 1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: null
                }
            ]
        }
    }
}

const ChartOptions = () => {
    return {
        responsive: true,
    }
}

export { ChartOptions, ChartConfig };