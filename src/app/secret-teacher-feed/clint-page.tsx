'use client';
import { useState, useEffect, useRef } from 'react';
import type { Note } from '../../types/note';

type Props = {
  fetchNotes: (since?: number | null) => Promise<Note[]>;
  initialNotes?: Note[];
};

export default function TeacherClientPage({ fetchNotes, initialNotes }: Props) {
  const [notes, setNotes] = useState<Note[]>(initialNotes ?? []);
  const notesRef = useRef<Note[]>(notes);

  useEffect(() => {
    notesRef.current = notes;
  }, [notes]);

  useEffect(() => {
    let mounted = true;

    const fetchAndAppend = async () => {
      const since = notesRef.current.length
        ? notesRef.current[notesRef.current.length - 1].id
        : null;
      try {
        const newNotes = await fetchNotes(since);
        if (!mounted || !newNotes?.length) return;
        setNotes((prev) => {
          const lastId = prev.length ? prev[prev.length - 1].id : 0;
          const filtered = newNotes.filter((n) => n.id > lastId);
          return filtered.length ? [...prev, ...filtered] : prev;
        });
      } catch (err) {
        // swallow errors for polling; could add logging here
      }
    };

    // immediate fetch and periodic polling
    fetchAndAppend();
    const interval = setInterval(fetchAndAppend, 5000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [fetchNotes]);

  return (
    <div>
      <h1>Teacher&apos;s View</h1>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <fieldset>
              <h2>
                from: {note.from_user} | to: {note.to_user}
              </h2>
              <p>{note.note}</p>
            </fieldset>
          </li>
        ))}
      </ul>
    </div>
  );
}
