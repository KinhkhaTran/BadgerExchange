import React, { useEffect } from 'react';
import { collection, addDoc, getDocs, query, where, deleteDoc, doc } from 'firebase/firestore';
import { db } from './firebaseConfig';

const keywords = ['badger football',
  'badger basketball',
  'Wisconsin Badgers',
  'Badger sports',
  'Badger volleyball',
  'Badger hockey',
];

const clearFirestoreCollection = async (collectionName) => {
  try {
    const collectionRef = collection(db, collectionName);
    const snapshot = await getDocs(collectionRef);
    const deletePromises = snapshot.docs.map((docItem) => deleteDoc(doc(collectionRef, docItem.id)));
    await Promise.all(deletePromises);
    console.log(`Cleared all documents from ${collectionName}`);
  } catch (error) {
    console.error('Error clearing Firestore collection:', error.message);
  }
};

const fetchTicketmasterData = async () => {
  const apiKey = 'pOLI73xPJH89UoSbu7h5DvBfoqnoSoa3';
  const baseUrl = 'https://app.ticketmaster.com/discovery/v2/events.json';
  const eventCollectionRef = collection(db, 'eventListings');

  const dateRanges = [
    { start: '2024-12-01T00:00:00Z', end: '2024-12-30T23:59:59Z' },
    { start: '2025-01-01T00:00:00Z', end: '2025-02-28T23:59:59Z' },
    { start: '2025-03-01T00:00:00Z', end: '2025-04-30T23:59:59Z' },
  ];

  try {
    await clearFirestoreCollection('eventListings');

    for (const range of dateRanges) {
      for (const keyword of keywords) {
        let page = 0;
        let hasMorePages = true;

        while (hasMorePages) {
          const response = await fetch(
            `${baseUrl}?keyword=${encodeURIComponent(keyword)}&countryCode=US&startDateTime=${range.start}&endDateTime=${range.end}&page=${page}&apikey=${apiKey}`
          );
          const data = await response.json();

          if (data && data._embedded && data._embedded.events) {
            const events = data._embedded.events;

            await Promise.all(
              events.map(async (event) => {
                const price = event.priceRanges ? event.priceRanges[0]?.min : null;
                if (price !== null) {
                  const eventData = {
                    id: event.id,
                    game: event.name || 'Unknown Game',
                    sport: event.classifications[0]?.genre?.name || 'Unknown Sport',
                    date: event.dates?.start?.localDate || 'Unknown Date',
                    time: event.dates?.start?.localTime || 'Unknown Time',
                    venue: event._embedded?.venues[0]?.name || 'Unknown Venue',
                    price,
                  };
                  await addDoc(eventCollectionRef, eventData);
                }
              })
            );
          }

          hasMorePages = data.page && data.page.number < data.page.totalPages - 1;
          page++;
        }
      }
    }
  } catch (error) {
    console.error('Error populating Firestore:', error.message);
  }
};
const populateFirestore = async () => {
  try {
    await fetchTicketmasterData();
  } catch (error) {
    console.error('Error populating Firestore:', error.message);
  }
};

const PopulateDatabase = () => {
  useEffect(() => {
    populateFirestore();
  }, []);

  return (
    <div>
      <h1>Populating Firebase with Ticketmaster Data</h1>
      <p>Check the Firebase console to verify the data is being added.</p>
    </div>
  );
};

export default PopulateDatabase;
