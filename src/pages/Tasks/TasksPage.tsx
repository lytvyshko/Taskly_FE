import { useLogout } from '@/hooks/useLogout.ts';

export const TasksPage = () => {
  const { mutate: logoutMutation } = useLogout();

  return <button onClick={() => logoutMutation()}>logout</button>;
};
