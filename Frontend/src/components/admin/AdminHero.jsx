import { Container, Card } from 'react-bootstrap';

const AdminHero = () => {
  return (
    <div className=' py-5'>
      <Container className='d-flex justify-content-center'>
        <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75'>
          <h1 className='text-center mb-4'>Admin</h1>
          <p className='text-center mb-4'>
            Welcome, This is Admin Home Page.
          </p>
        </Card>
      </Container>
    </div>
  );
};

export default AdminHero;