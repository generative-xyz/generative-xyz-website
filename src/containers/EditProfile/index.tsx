import Heading from '@components/Heading';
import Text from '@components/Text';
import { Container } from 'react-bootstrap';
import FormEditProfile from './FormEditProfile';
import s from './styles.module.scss';

const EditProfile = () => {
  return (
    <Container className={s.wrapper}>
      <div className={s.setting}>
        <Heading as="h4" fontWeight="bold">
          Setting
        </Heading>
        <Text size="18" fontWeight="bold">
          Edit profile
        </Text>
      </div>
      <div className="h-divider"></div>
      <FormEditProfile />
    </Container>
  );
};

export default EditProfile;
