import {
  Modal, Button,
} from 'react-bootstrap';

const HotelCalendar = ({ showCalendar, handleCloseCalendar }) => {
  <Modal show={showCalendar} onHide={handleCloseCalendar}>
    <Modal.Header closeButton>
      <Modal.Title>Modal heading</Modal.Title>
    </Modal.Header>
    <Modal.Body>Woohoo, youe reading this text in a modal!</Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleCloseCalendar}>
        Close
      </Button>
      <Button variant="primary" onClick={handleCloseCalendar}>
        Save Changes
      </Button>
    </Modal.Footer>
  </Modal>;
};

export default HotelCalendar;
