"use client";
import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SendIcon } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { createThread } from "@/actions/create-resource-id";

const suggestionButtons = [
  "What is the weather in Tokyo?",
  "What is assistant-ui?",
];

export default function Init({ resourceId }: { resourceId: string }) {
  const [inputValue, setInputValue] = useState("");
  const { execute, isExecuting, isPending } = useAction(createThread);

  const handleSendMessage = (message: string = inputValue) => {
    if (message.trim()) {
      execute({ title: message });
      setInputValue("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const isLoading = isExecuting || isPending;

  return (
    <div className="min-h-screen flex flex-col items-center pt-16 px-4">
      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <span className="text-lg font-medium">C</span>
      </div>

      <h1 className="text-xl font-semibold mb-16">How can I help you today?</h1>

      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {suggestionButtons.map((suggestion, index) => (
          <Button
            key={index}
            variant="outline"
            className="rounded-full"
            onClick={() => handleSendMessage(suggestion)}
          >
            {suggestion}
          </Button>
        ))}
      </div>

      <div className="w-full max-w-md flex gap-2">
        <div className="relative flex-grow">
          <Input
            placeholder="hello"
            className="w-full pr-12 rounded-lg border-gray-200"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
          />
          <Button
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2 rounded-lg"
            onClick={() => handleSendMessage()}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            ) : (
              <SendIcon className="h-4 w-4" />
            )}
            <span className="sr-only">Send message</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
