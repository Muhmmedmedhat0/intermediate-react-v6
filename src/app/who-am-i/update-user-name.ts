'use server';
import { AsyncDatabase } from 'promised-sqlite3';
import { redirect } from 'next/navigation';

export async function updateUsername(formData: FormData) {
  const username = formData.get('username');
  const id = formData.get('id');

  if (!username || !id) {
    throw new Error('Username and id are required');
  }

  const db = await AsyncDatabase.open('./notes.db');
  await db.run('UPDATE users SET name = ? WHERE id = ?', [username, id]);
  redirect('/my-notes');
}
