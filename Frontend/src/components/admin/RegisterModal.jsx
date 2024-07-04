import { useState } from 'react';
import { Button, Modal, Form as BootstrapForm } from 'react-bootstrap';
import { useAddNewUserMutation } from '../../Slices/adminApiSlice.js';
import { toast } from 'react-toastify';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const RegisterModal = ({ showModal, closeModal, refetchData }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [addUserByAdmin] = useAddNewUserMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.error('All fields are required');
      return;
    }

    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    try {
      const responseFromApiCall = await addUserByAdmin({
        name,
        email,
        password,
      }).unwrap();
      toast.success('User Added Successfully');
      closeModal();
      refetchData();
    } catch (err) {
      toast.error(err?.data?.message || err?.error);
    }
  };

  return (
    <Modal show={showModal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Register New User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <BootstrapForm onSubmit={handleSubmit}>
          <BootstrapForm.Group controlId="name">
            <BootstrapForm.Label>Name</BootstrapForm.Label>
            <BootstrapForm.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </BootstrapForm.Group>
          <BootstrapForm.Group controlId="email">
            <BootstrapForm.Label>Email</BootstrapForm.Label>
            <BootstrapForm.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </BootstrapForm.Group>
          <BootstrapForm.Group controlId="password">
            <BootstrapForm.Label>Password</BootstrapForm.Label>
            <BootstrapForm.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </BootstrapForm.Group>
        </BootstrapForm>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Cancel
        </Button>
        <Button variant="primary" type="submit">
          Register
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
