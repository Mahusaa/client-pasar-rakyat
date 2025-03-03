// app/api/sse/route.ts
import { NextRequest } from 'next/server';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getDatabase } from 'firebase-admin/database';

// Initialize Firebase Admin if not already initialized
if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  });
}

export async function GET(req: NextRequest) {
  const encoder = new TextEncoder();

  // Create a readable stream
  const stream = new ReadableStream({
    async start(controller) {
      // Send initial heartbeat
      controller.enqueue(encoder.encode('event: connected\ndata: connected\n\n'));

      // Set up Firebase RTDB listener
      const db = getDatabase();
      const countersRef = db.ref('foodCounters'); // Adjust path as needed

      // Initial data load
      const snapshot = await countersRef.once('value');
      const data = snapshot.val();
      controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'initial', data })}\n\n`));

      // Set up listeners
      countersRef.on('child_added', (snapshot) => {
        const data = snapshot.val();
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({
          type: 'added',
          id: snapshot.key,
          data
        })}\n\n`));
      });

      countersRef.on('child_changed', (snapshot) => {
        const data = snapshot.val();
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({
          type: 'changed',
          id: snapshot.key,
          data
        })}\n\n`));
      });

      countersRef.on('child_removed', (snapshot) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({
          type: 'removed',
          id: snapshot.key
        })}\n\n`));
      });

      // Handle disconnection
      req.signal.addEventListener('abort', () => {
        countersRef.off();
        controller.close();
      });
    }
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive'
    }
  });
}

export const dynamic = 'force-dynamic';
