import React, { Component } from 'react';
import {Breadcrumb, BreadcrumbItem, ListGroup, ListGroupItem} from 'reactstrap';
import Account from '../../models/Account';

interface ProfileProps {
    account?: Account;
    goBack: () => void;
}

class Profile extends Component<ProfileProps> {
    constructor(props: Readonly<ProfileProps>) {
        super(props);
    }

    render() {
        const { account, goBack } = { ...this.props };

        return (
            <div className="main-content">
                <Breadcrumb>
                    <BreadcrumbItem className="breadcrumb-link" onClick={goBack}>My Documents</BreadcrumbItem>
                    <BreadcrumbItem active>Profile</BreadcrumbItem>
                </Breadcrumb>
                <ListGroup>
                    <ListGroupItem className="justify-content-between">
                        {/*<img className="shared-with-image-single"*/}
                        {/*     src={account.profileimgUrl}*/}
                        {/*     alt="profile"*/}
                        {/*/>*/}
                        <div style={{marginLeft: '24px',display: 'inline-block'}}>
                            {/*{`${account.firstName} ${account.lastName}`}*/}
                            { account && account.username }
                        </div>
                    </ListGroupItem>
                </ListGroup>
            </div>
        );
    }
}

export default Profile;
