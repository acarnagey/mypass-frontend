import React, { Component } from 'react';
import {Breadcrumb, BreadcrumbItem, ListGroup, ListGroupItem} from 'reactstrap';
import Account from '../../models/Account';
import StringUtil from '../../util/StringUtil';

interface AccountPageProps {
    account: Account;
    goBack: () => void;
}

class AccountPage extends Component<AccountPageProps> {
    constructor(props: Readonly<AccountPageProps>) {
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
                        <div className="account-circle">{StringUtil.getFirstUppercase(account.username)}</div>
                        <div style={{marginLeft: '24px',display: 'inline-block'}}>
                            {/*{`${account.firstName} ${account.lastName}`}*/}
                            { account.username }
                        </div>
                    </ListGroupItem>
                </ListGroup>
            </div>
        );
    }
}

export default AccountPage;
