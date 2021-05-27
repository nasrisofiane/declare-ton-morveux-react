import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useContext, useEffect } from 'react';
import { MDBBtn, MDBContainer, MDBInput } from 'mdbreact';
import { AppContext } from '../services/AppContext';
import ChildUpdateForm from './ChildUpdateForm';

const ChildrenList = () => {
    const { fetchMyChildren, user, myChildren } = useContext(AppContext);

    useEffect(() => {
        fetchMyChildren();
    }, [user.id]);

    const createAccordion = () => {
        return (
            <div class="accordion" id="accordionChildren">
                {myChildren.map((child, i) => {
                    const currentCollapseName = `collapse-${i}`;
                    const currentHeadingName = `heading-${i}`;

                    return (
                        <div key={i} class="accordion-item">
                            <h2 class="accordion-header" id={currentHeadingName}>
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={'#' + currentCollapseName} aria-expanded="false" aria-controls={currentCollapseName}>
                                    {child.firstName + ' ' + child.lastName}
                                </button>
                            </h2>

                            <div id={currentCollapseName} class="accordion-collapse collapse" aria-labelledby={currentHeadingName} data-bs-parent="#accordionChildren">
                                <div class="accordion-body">
                                    <p>{child.school.name}</p>
                                    
                                    <ChildUpdateForm id={child.id} isSick={child.sick} isContagious={child.contagious} />
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        );
    }

    return (
        <MDBContainer>
            {createAccordion()}
            {/* <td>{child.lastName}</td>
                                    <td>{child.firstName}</td>
                                    <td>{child.school.name}</td>
                                    <td>{child.sick ? 'Oui' : 'Non'}</td>
                                    <td>{child.contagious ? 'Oui' : 'Non'}</td>
                                    <td>@mdo</td> */}
        </MDBContainer>
    );
}

export default ChildrenList;