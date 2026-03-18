import Link from 'next/link';
import React from 'react';

export default function Home() {
  return (
    <div className="">
      <ul>
        <li>
          <Link href="/my-notes">My Notes</Link>
        </li>
        <li>
          <Link href="/write-note">Write a Note</Link>
        </li>
        <li>
          <Link href="/secret-teacher-feed">Secret Teacher Feed</Link>
        </li>
        <li>
          <Link href="/who-am-i">Who Am I?!</Link>
        </li>
      </ul>
    </div>
  );
}
