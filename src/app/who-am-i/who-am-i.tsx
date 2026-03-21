import { AsyncDatabase } from 'promised-sqlite3';
import type { User } from '../types/user';

// this page assumes that you are logged in as user 1
async function getWhoAmI(): Promise<User | undefined> {
  const db = await AsyncDatabase.open('./notes.db');
  return db.get('SELECT * FROM users WHERE id = ?', ['1']);
}

export default async function WhoAmI() {
  const user = await getWhoAmI();
  if (!user) return <p>User not found</p>;

  return (
    <div>
      <h1>Who Am I?</h1>
      <p>
        You are {user.name} and your id is {user.id}
      </p>
    </div>
  );
}
