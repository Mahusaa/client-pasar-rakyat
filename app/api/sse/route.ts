import { initializeApp } from "firebase/app";
import { NextRequest } from "next/server";
import { getDatabase, ref, onChildAdded, onChildChanged, onChildRemoved, get } from 'firebase/database';



const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_DATABASEURL,
  projectId: process.env.NEXT_PUBLIC_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_APPID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENTID,
};


const app = initializeApp(firebaseConfig);


export async function GET(req: NextRequest) {
  const encoder = new TextEncoder();

  // Create a readable stream
  const stream = new ReadableStream({
    async start(controller) {
      controller.enqueue(encoder.encode('event: connected\ndata: connected\n\n'));

      const db = getDatabase(app);
      const countersRef = ref(db, 'foodCounters');

      try {
        // Initial data load
        const snapshot = await get(countersRef);
        const data = snapshot.val();
        if (data) {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'initial', data })}\n\n`));
        }

        // Set up listeners
        onChildAdded(countersRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({
              type: 'added',
              id: snapshot.key,
              data,
            })}\n\n`));
          }
        });

        onChildChanged(countersRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({
              type: 'changed',
              id: snapshot.key,
              data,
            })}\n\n`));
          }
        });

        onChildRemoved(countersRef, (snapshot) => {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({
            type: 'removed',
            id: snapshot.key,
          })}\n\n`));
        });

        // Handle disconnection
        req.signal.addEventListener('abort', () => {
          controller.close();
        });
      } catch (error) {
        console.error('Stream error:', error);
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
}


export const dynamic = 'force-dynamic';
