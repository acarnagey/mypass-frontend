import React, {Component, Fragment} from 'react';
// import AgentService from '../../api/AgentService';
import DocumentSummary from './DocumentSummary';
import DocumentDetail from './DocumentDetail';
import folderImage from '../../img/folder.png';
import {Button, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row} from 'reactstrap';
import './HomePage.scss';
import Profile from './Profile';
import SearchInput from '../common/SearchInput';
import Chevron from '../common/Chevron';
import AddNewDocument from './AddNewDocument';
import Account from '../../models/Account';
import Document from '../../models/Document';

// import Dropzone from 'react-dropzone';

interface HomeState {
  account?: Account;
  searchedDocuments: [Document?];
  documentSelected?: Document;
  isProfile: boolean;
  sortAsc: boolean;
  showModal: boolean;
}

class HomePage extends Component<{}, HomeState> {

    constructor(props: Readonly<{}>) {
        super(props);

        this.state = {
            account: undefined,
            searchedDocuments: [],
            documentSelected: undefined,
            isProfile: false,
            sortAsc: true,
            showModal: false
        };
    }

    async componentDidMount() {
        const { sortAsc } = { ...this.state };
        // TODO use /api/my-account
        // const account: [Document?] = []; // (await AgentService.getDocuments(account.accountId)).documents;
        // this.setState({ searchedDocuments: this.sortDocuments(documents, sortAsc) });
    }

    handleSearchDocuments(query: string) {
        // const { documents, sortAsc } = { ...this.state };
        // let searchedDocuments = documents
        //     .filter(document => {
        //         return document.type.toLowerCase().indexOf(query.toLowerCase()) !== -1
        //     });
        // searchedDocuments = this.sortDocuments(searchedDocuments, sortAsc);
        // this.setState({searchedDocuments});
    }

    toggleSort() {
        let { sortAsc, searchedDocuments } = { ...this.state };
        sortAsc = !sortAsc;
        searchedDocuments = this.sortDocuments(searchedDocuments, sortAsc);
        this.setState({ sortAsc, searchedDocuments });
    }

    sortDocuments(documents: [Document?], sortAsc: boolean) {
        return documents.sort((docA: Document, docB: Document) => {
            if (docA.type < docB.type) {
              return sortAsc ? -1 : 1;
            }
            if (docA.type > docB.type) {
              return sortAsc ? 1 : -1;
            }
            return 0;
        });
    }

    handleSelectDocument(document?: Document) {
        this.setState({documentSelected: document});
    }

    goToProfile() {
        this.setState({documentSelected: undefined, isProfile: true});
    }

    goBack() {
        this.setState({documentSelected: undefined, isProfile: false});
    }

    handleAddNew() {
        this.toggleModal();
    }

    toggleModal() {
        const { showModal } = { ...this.state };
        this.setState({showModal: !showModal});
    }

    renderModal() {
        const { showModal } = { ...this.state };

        return (
            <Fragment>
                <Modal isOpen={showModal} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Upload Document</ModalHeader>
                    <ModalBody>
                        {/*<Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>*/}
                        {/*    {({getRootProps, getInputProps}) => (*/}
                        {/*        <section>*/}
                        {/*            <div {...getRootProps()}>*/}
                        {/*                <input {...getInputProps()} />*/}
                        {/*                <p>Drag 'n' drop some files here, or click to select files</p>*/}
                        {/*            </div>*/}
                        {/*        </section>*/}
                        {/*    )}*/}
                        {/*</Dropzone>*/}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggleModal}>Confirm</Button>{' '}
                        <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </Fragment>
        );
    }

    renderTopBar() {
        const { account } = { ...this.state };

        return (
            <div id="home-top-bar">
                <div id="home-logo">
                    <img className="logo" src={`${window.location.origin}/${folderImage}`} alt="Logo" />
                </div>
                <Row id="home-search">
                    <Col style={{display: 'flex'}}>
                        <SearchInput handleSearch={this.handleSearchDocuments} />
                    </Col>
                </Row>
                <div id="home-profile" onClick={this.goToProfile}>
                    {/*<img className="account-profile-image" src={account.profileimgUrl} />*/}
                </div>
            </div>
        );
    }

    renderProfile() {
        const { account } = { ...this.state };
        const { isProfile } = { ...this.state };

        if(isProfile) {
            return (
                <Profile goBack={this.goBack} account={account} />
            );
        }
        return (
          <Fragment />
        );
    }

    renderMyDocuments() {
        const { searchedDocuments, documentSelected, isProfile, sortAsc } = { ...this.state };

        if(!documentSelected && !isProfile) {
            return (
                <div className="main-content">
                    <div className="big-title">My Documents</div>
                    <div className="subtitle">Sort by <span style={{cursor: 'pointer'}} onClick={this.toggleSort}>NAME <Chevron isAscending={sortAsc} /></span></div>
                    <Row>
                        <Col
                            sm="12"
                            md="6"
                            lg="4"
                            className="document-add-new"
                        >
                            <AddNewDocument handleAddNew={this.handleAddNew} />
                        </Col>
                        { searchedDocuments.map((document, idx) => {
                            return (
                                <Col
                                    sm="12"
                                    md="6"
                                    lg="4"
                                    key={idx}
                                    onClick={() => this.handleSelectDocument(document)}
                                    className="document-summary-container"
                                >
                                    <DocumentSummary document={document} documentIdx={idx++} />
                                </Col>
                            );
                        })}
                    </Row>
                </div>
            );
        }
        return <Fragment/>;
    }

    renderDocumentDetail() {
        const { documentSelected } = { ...this.state };

        if(documentSelected) {
            return (
                <DocumentDetail document={documentSelected} goBack={this.goBack} />
            );
        }

        return (
            <Fragment/>
        );
    }

    render() {
        return (
            <div id="home-container">
                { this.renderModal() }
                { this.renderTopBar() }
                <div className="home-content">
                    <div className="home-side" />
                    <div className="home-main">
                        { this.renderProfile() }
                        { this.renderMyDocuments() }
                        { this.renderDocumentDetail() }
                    </div>
                </div>
            </div>
        );
    }
}

export default HomePage;
