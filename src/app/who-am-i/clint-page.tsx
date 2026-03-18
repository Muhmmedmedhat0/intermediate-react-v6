import type { ReactNode } from 'react';
import updateUsername from './update-user-name';

type Props = {
  children: ReactNode;
  id: number;
};

export default function ClientWhoAmIPage({ children, id }: Props) {
  return (
    <div>
      {children}
      <form action={updateUsername}>
        <h2>Enter new username</h2>
        <input type="text" name="username" placeholder="username" required />
        <input type="hidden" name="id" value={id} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
