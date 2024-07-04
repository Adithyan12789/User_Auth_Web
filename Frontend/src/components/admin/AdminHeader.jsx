
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FaSignInAlt } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import {LinkContainer} from 'react-router-bootstrap';
import { useAdminLogoutMutation } from '../../Slices/adminApiSlice.js';
import { adminLogout } from '../../Slices/adminAuthSlice.js';
import { useNavigate } from 'react-router-dom';

const AdminHeader = () => {

  const { adminInfo } = useSelector((state) => state.adminAuth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [adminLogoutApiCall] = useAdminLogoutMutation();

  const adminLogoutHandler = async () => {
    try {
      await adminLogoutApiCall().unwrap();
      dispatch(adminLogout());
      navigate('/admin');
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>

          <LinkContainer to='/admin'>
          <Navbar.Brand>Admin</Navbar.Brand>
          </LinkContainer>
          
          <Navbar.Toggle aria-controls='basic-navbar-nav' />

          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              { adminInfo ? (
                <>
                  <NavDropdown title={adminInfo.email} id='username'>
                    <NavDropdown.Item onClick={adminLogoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                <LinkContainer to='/adminLogin'>
                <Nav.Link>
                  <FaSignInAlt /> Sign In
                </Nav.Link>
                </LinkContainer>

                </>
              ) }
              

            </Nav>
          </Navbar.Collapse>

        </Container>
      </Navbar>
    </header>
  );
};

export default AdminHeader;