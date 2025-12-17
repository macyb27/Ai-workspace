import { NextResponse } from 'next/server';

// CORS Helper – bleibt, weil wir keine Lust auf Browser-Drama haben
function addCORSHeaders(response) {
  response.headers.set('Access-Control-Allow-Origin', process.env.CORS_ORIGINS || '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  response.headers.set('Access-Control-Allow-Credentials', 'true');
  return response;
}

export async function OPTIONS() {
  return addCORSHeaders(new NextResponse(null, { status: 200 }));
}

// Haupt-Handler für GET und POST (wir fangen erstmal nur die an, Rest später bei Bedarf)
async function handler(request, { params }) {
  const { path = [] } = params;
  const method = request.method;

  try {
    // Health Check – immer schön haben
    if (path.length === 0 || path[0] === 'health') {
      return addCORSHeaders(NextResponse.json({ status: 'operational', timestamp: new Date().toISOString() }));
    }

    // Erster echter Agent-Endpoint: /api/chat (POST only)
    if (path[0] === 'chat' && method === 'POST') {
      const body = await request.json();

      // Minimalvalidation – wir bauen das später mit Zod aus
      if (!body.messages || !Array.isArray(body.messages)) {
        return addCORSHeaders(NextResponse.json({ error: 'messages array required' }, { status: 400 }));
      }

      // Placeholder für Agent-Logik – hier kommt später unser Mastermind-Agent-Swarm rein
      const responseText = `Agent received ${body.messages.length} messages. Mastermind orchestration incoming. Hold tight, we're building gods here.`;

      // Streaming-Ready von Anfang an (auch wenn wir noch plain JSON schicken)
      const stream = new ReadableStream({
        start(controller) {
          controller.enqueue(new TextEncoder().encode(JSON.stringify({ response: responseText })));
          controller.close();
        }
      });

      return addCORSHeaders(new NextResponse(stream, {
        headers: { 'Content-Type': 'application/json' },
      }));
    }

    // Tools Endpoint Placeholder – /api/tools
    if (path[0] === 'tools' && method === 'GET') {
      const tools = [
        { name: "get_weather", description: "Get current weather for a city" },
        { name: "search_knowledge", description: "Search internal knowledge base" },
        // mehr kommen, wenn wir sie bauen
      ];
      return addCORSHeaders(NextResponse.json({ tools }));
    }

    // 404 für alles andere – klartext
    return addCORSHeaders(NextResponse.json(
      { error: `Route /${path.join('/')} not implemented yet. We're cooking.` },
      { status: 404 }
    ));

  } catch (error) {
    console.error('API Error:', error);
    return addCORSHeaders(NextResponse.json(
      { error: 'Internal server error – but we're better than this' },
      { status: 500 }
    ));
  }
}

// Export nur was wir brauchen – PUT/DELETE/PATCH kommen, wenn wir sie wirklich wollen
export const GET = handler;
export const POST = handler;
