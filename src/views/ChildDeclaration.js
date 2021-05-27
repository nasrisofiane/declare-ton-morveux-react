import React, { useContext } from 'react';
import ChildrenInput from '../components/ChildrenInput';
import ChildrenList from '../components/ChildrenList';
import { AppContext } from '../services/AppContext';

const ChildDeclaration = () => {
    const { fetchMyAccount } = useContext(AppContext);

    return (
        <div>
            <ChildrenInput />
            <ChildrenList />
        </div>
    );
}

export default ChildDeclaration;