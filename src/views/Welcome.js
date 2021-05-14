import React, { useState, useEffect } from 'react';
import SchoolsInput from '../components/SchoolsInput';
import SchoolStats from '../components/SchoolStats';

const Welcome = () => {

    return (
        <div>
            <div className="mt-4 d-flex justify-content-center">
                <SchoolsInput />
            </div>
            <SchoolStats />
        </div>
    );
}

export default Welcome;