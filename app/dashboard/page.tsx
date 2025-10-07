"use client";

import Modal from "@/components/modal";
import { Button } from "@/components/ui/button";
import { useCallback, useEffect, useState } from "react";
import { FC, MouseEvent, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles } from "lucide-react";
import NotesCard from "@/components/notes-card";

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [notes, setNotes] = useState([]);

  const modalRef = useRef<HTMLDivElement>(null);

  const getNotes = async() => {
    const res = await fetch("/api/notes");

    const data = await res.json();

    console.log(data);
    setNotes(data);
  }

  useEffect(() => {
    getNotes();
  }, []);

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleCreateTask = async() => {
    const res = await fetch("/api/notes", {method: "POST", headers: {"content-type": "application/json"}, body: JSON.stringify({title, description})});

    setTitle("");
    setDescription("");
    setIsModalOpen(false);

    if(res.ok) getNotes();
  }

  // Close handler that only fires if the click is on the backdrop itself
  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === modalRef.current) {
      handleModalClose();
    }
  };

  return (
    <div className=" flex flex-col p-4 w-full items-center justify-center">
      <Button
        className="border-2 font-extrabold text-lg px-8 py-6 cursor-pointer"
        onClick={() => setIsModalOpen(!isModalOpen)}
      >
        + Create
      </Button>

      <div className="mt-12 text-muted-foreground italic">
        Your tasks will appear here after creation.
      </div>

      {isModalOpen && (
        <div
          ref={modalRef}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs animate-fade-in-down"
          onClick={handleBackdropClick}
        >
          {/* 2. Modal Content Card (centered) */}
          <div
            className="bg-card text-foreground p-6 md:p-8 rounded-2xl 
                            shadow-[0_20px_50px_rgba(var(--color-ring)_/_0.3)] border border-primary/50 
                            w-11/12 max-w-lg transform animate-zoom-in"
          >
            <div className="flex items-center justify-between border-b border-border/70 pb-4 mb-6">
              <h2 className="text-3xl font-extrabold text-primary flex items-center">
                {/* Primary colored sparkle icon for visual interest */}
                <Sparkles className="w-5 h-5 mr-2 text-primary" /> Create Task
              </h2>
              <Button
                onClick={handleModalClose}
                className="bg-secondary text-secondary-foreground hover:bg-secondary/80 p-2 h-auto w-auto rounded-full shadow-none"
              >
                &times;
              </Button>
            </div>

            <div className="space-y-4">
              {/* Task Title Input */}
              <div>
                <label className="block text-sm font-semibold mb-1 text-foreground">
                  Title
                </label>
                <Input
                  placeholder="E.g., Design Hero Section for App"
                  aria-label="Task Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              {/* Task Description Textarea */}
              <div>
                <label className="block text-sm font-semibold mb-1 text-foreground">
                  Description (Optional)
                </label>
                <Textarea
                  placeholder="Add details, links, or context here..."
                  aria-label="Task Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              {/* AI Prompt Input - Highlighted as a key feature */}
              {/* <div className="pt-2 border-t border-border/50">
                        <label className=" text-sm font-semibold mb-1 text-accent-foreground flex items-center">
                            <Sparkles className="w-4 h-4 mr-1 text-accent" /> AI Suggestion Prompt
                        </label>
                        <Input 
                            placeholder="E.g., Suggest 5 steps for this task" 
                            aria-label="AI Suggestion Prompt"
                            className="bg-accent/10 border-accent/50 focus:border-accent"
                        />
                    </div> */}
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 mt-8">
              <Button
                className="flex-1 bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-md cursor-pointer"
                onClick={handleModalClose} // Uses the clean closure function
              >
                Cancel
              </Button>
              <Button
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 shadow-2xl shadow-primary/40 cursor-pointer"
                onClick={handleCreateTask} // Placeholder for submission
              >
                <Sparkles className="inline w-4 h-4 mr-1" /> Create Task
              </Button>
            </div>
          </div>
        </div>
      )}

      <div>
        {notes.map((note, index) => (
          <NotesCard
            note={note}
            key={index}
            onEdit={() => "Edit"} 
            onDelete={() => "Delete"} 
          />
        ))}
      </div>
    </div>
  );
}
