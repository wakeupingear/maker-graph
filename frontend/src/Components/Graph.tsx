import React, { ReactElement } from 'react'
import Node from './Node'

import Modal from 'react-modal';
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

interface Props {

}

Modal.setAppElement('#root');

export default function Graph({ }: Props): ReactElement {
    const [modalIsOpen, setIsOpen] = React.useState(false);
    function openModal() {
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
    }
    function goTo(subdomain: string) {
        window.location.href = "http://" + window.location.host + "/" + subdomain;
    }
    if (localStorage.getItem("profile") === null && false) openModal();
    const modal = (<div id="popup"><Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
    >
        <h2>Hold Up!</h2>
        <p>You haven't filled out a Profile.</p>
        <p>This is optional, but it allows for more personalized results.</p>
        <div className="horizontal">
            <div className="clickable" onClick={() => goTo("profile")}>Make it!</div>
            <div className="clickable" onClick={closeModal}>No thanks!</div>
        </div>
    </Modal></div>);

    return (
        <div className="App">
            {modal}
            <Node />
        </div>
    )
}
