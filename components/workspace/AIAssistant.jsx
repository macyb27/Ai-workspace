'use client';

import { useChat } from 'ai/react';
import { Send } from 'lucide-react';
import { useState } from 'react';

export default function AIAssistant() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
  });

  return (
    <div className="flex flex-col h-full bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-4">
      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`p-3 rounded-lg max-w-[80%] ${
              m.role === 'user'
                ? 'bg-green-900/50 ml-auto'
                : 'bg-white/10 mr-auto'
            }`}
          >
            <p className="text-sm text-white/90">{m.content}</p>
          </div>
        ))}
        {isLoading && (
          <div className="p-3 rounded-lg bg-white/10 mr-auto">
            <p className="text-sm text-white/60">Thinking...</p>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-green-500"
          value={input}
          placeholder="Ask the AI Assistant..."
          onChange={handleInputChange}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="p-2 bg-green-600 hover:bg-green-500 rounded-lg transition"
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
}
