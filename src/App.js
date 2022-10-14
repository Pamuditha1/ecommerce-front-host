import { useState, useEffect } from "react";
import Main from "./Main";
import "react-toastify/dist/ReactToastify.css";
import "./css/accept.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function App() {
  const [show, setShow] = useState(false);
  const [checked, setChecked] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    handleShow();
  }, []);

  return (
    <>
      <Main />
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={handleClose}
        style={{ color: "black" }}
      >
        <Modal.Header>
          <Modal.Title>Customized Cookie Preferences</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="row mb-3">
              <div className="col-12 border-bottom border-secondary">
                <p>
                  We use cookies and similar tools for the following purposes.
                </p>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-12 border-bottom border-secondary">
                <h5>Essential</h5>
                <p>
                  Essential cookies are necessary to deliver our site's content
                  and services and cannot be deactivated.
                </p>
              </div>
            </div>
            <div className="row mb-3 border-bottom border-secondary">
              <div className="col-12">
                <h5>Performance</h5>
              </div>
              <div className="col-9">
                <p>
                  Performance cookies provide anonymous statistics about how
                  customers navigate our site so we can improve site experience
                  and performance
                </p>
              </div>
              <div className="col-3">
                <input
                  className="ml-5"
                  id="ga4"
                  type="checkbox"
                  checked={checked}
                  onChange={() => setChecked((s) => !s)}
                />{" "}
                <span style={{ color: "black" }}>Allow</span>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <p>
                  You may review and change your choices at any time by clicking
                  the cookie preferences in the footer of the site. Please refer
                  to our privacy policy for more information.
                </p>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save preferences
          </Button>
        </Modal.Footer>
      </Modal>
      {/* <button
        id="accept-btn"
        className="accept-btn"
        name="accept-btn"
        style={{ position: "fixed", bottom: 50, right: 50 }}
      >
        Accept
      </button>
      <button
        id="deny-btn"
        className="deny-btn"
        name="deny-btn"
        style={{ position: "fixed", bottom: 150, right: 50 }}
      >
        Deny
      </button> */}
    </>
  );
}

export default App;
