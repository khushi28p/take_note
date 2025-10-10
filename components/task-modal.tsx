"use client";

import { FC, MouseEvent, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles } from "lucide-react";
import { Loader2 } from "lucide-react";

// Define the props the TaskModal component will accept
interface TaskModalProps {
  isModalOpen: boolean;
  title: string;
  description: string;
  isEditing: boolean;
  isLoading: boolean;
  // Handlers
  onClose: () => void;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onCreateTask: () => void;
  onUpdateTask: () => void;
}

const TaskModal: FC<TaskModalProps> = ({
  isModalOpen,
  title,
  description,
  isEditing,
  isLoading,
  onClose,
  onTitleChange,
  onDescriptionChange,
  onCreateTask,
  onUpdateTask,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close handler that only fires if the click is on the backdrop itself
  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === modalRef.current) {
      onClose();
    }
  };

  if (!isModalOpen) return null;

  const actionButtonText = isEditing ? "Update Task" : "Create Task";
  const actionButtonHandler = isEditing ? onUpdateTask : onCreateTask;

  const renderButtonContent = () => {
    if (isLoading) {
      // Spinning Loader animation
      return (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Loading...
        </>
      );
    }
    // Default text and icon
    return (
      <>
        <Sparkles className="inline w-4 h-4 mr-1" /> {actionButtonText}
      </>
    );
  };

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs animate-fade-in-down"
      onClick={handleBackdropClick}
    >
      <div
        className="bg-card text-foreground p-6 md:p-8 rounded-2xl 
                   shadow-[0_20px_50px_rgba(var(--color-ring)_/_0.3)] border border-primary/50 
                   w-11/12 max-w-lg transform animate-zoom-in"
      >
        <div className="flex items-center justify-between border-b border-border/70 pb-4 mb-6">
          <h2 className="text-3xl font-extrabold text-primary flex items-center">
            <Sparkles className="w-5 h-5 mr-2 text-primary" />
            {isEditing ? "Edit Task" : "Create Task"}
          </h2>
          <Button
            onClick={onClose}
            className="bg-secondary text-secondary-foreground hover:bg-secondary/80 p-2 h-auto w-auto rounded-full shadow-none"
            disabled={isLoading} // Disable close button while loading
          >
            &times;
          </Button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1 text-foreground">
              Title
            </label>
            <Input
              placeholder="E.g., Design Hero Section for App"
              aria-label="Task Title"
              value={title}
              onChange={(e) => onTitleChange(e.target.value)}
              disabled={isLoading} // Disable input while loading
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1 text-foreground">
              Description (Optional)
            </label>
            <Textarea
              placeholder="Add details, links, or context here..."
              aria-label="Task Description"
              value={description}
              onChange={(e) => onDescriptionChange(e.target.value)}
              disabled={isLoading} // Disable textarea while loading
            />
          </div>
        </div>

        <div className="flex space-x-4 mt-8">
          <Button
            className="flex-1 bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-md cursor-pointer"
            onClick={onClose}
            disabled={isLoading} // Disable cancel button while loading
          >
            Cancel
          </Button>
          
          <Button
            className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 shadow-2xl shadow-primary/40 cursor-pointer"
            onClick={actionButtonHandler}
            disabled={!title || isLoading} // Disable if title is empty OR if loading
          >
            {renderButtonContent()}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;