import Stepper from '@/components/Stepper';
import { useProfile } from '@/providers/ProfileProvider';

export default function ProfileCard() {
  const profile = useProfile();

  return profile ? (
    <Stepper
      icon="icofont-id-card"
      variant="profile"
      values={[
        { title: 'Name', value: profile.name },
        { title: 'Job', value: profile.job },
        {
          title: 'Email',
          type: 'obfuscated',
          value: profile.email,
        },
        { title: 'Location', value: profile.location },
      ]}
      className="ml-7 -mt-5"
    />
  ) : null;
}
