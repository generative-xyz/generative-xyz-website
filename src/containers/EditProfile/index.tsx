import Heading from '@components/Heading';
import Text from '@components/Text';
import { Container } from 'react-bootstrap';
import FormEditProfile from './FormEditProfile';
import s from './styles.module.scss';
import ButtonIcon from '@components/ButtonIcon';
import { useRouter } from 'next/router';

const EditProfile = () => {
  const router = useRouter();
  return (
    <Container>
      <ButtonIcon
        variants="ghost"
        onClick={() => router.back()}
        className={s.back_btn}
      >
        Back
      </ButtonIcon>
      <div className={s.wrapper}>
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
      </div>
    </Container>
  );
};

export default EditProfile;
