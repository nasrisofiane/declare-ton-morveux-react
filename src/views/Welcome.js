import React from 'react';
import Charts from '../components/Charts';
import Leaflet from '../components/Leaflet';
import SchoolsInput from '../components/SchoolsInput';
import SchoolStats from '../components/SchoolStats';

const Welcome = () => {

    return (
        <div>
            <div className="mt-4 d-flex justify-content-center">
                <SchoolsInput />
            </div>
            <SchoolStats />
            <Leaflet/>
            <Charts/>
        </div>
    );
}

export default Welcome;