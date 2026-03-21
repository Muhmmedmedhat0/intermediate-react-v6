import { TeacherClientPage } from './clint-page';
import { fetchNotes } from './fetch-notes';

export default async function TeacherView() {
  const initialNotes = await fetchNotes();
  return (
    <TeacherClientPage initialNotes={initialNotes} fetchNotes={fetchNotes} />
  );
}
