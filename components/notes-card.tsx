import React, { FC } from "react";
import { Sparkles, Edit, Trash2 } from "lucide-react";
import { Button } from "./ui/button";

interface NoteCardProps {
  note: {
    id: string;
    title: string;
    description?: string;
    aiSuggestion?: string;
    createdAt: string; // Or a Date object
  };
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const NotesCard: FC<NoteCardProps> = ({ note, onEdit, onDelete }) => {
  const contentLength =
    note.title.length +
    (note.description?.length || 0) +
    (note.aiSuggestion?.length || 0);
  let gridRowSpanClass = "row-span-1"; // Default small card

  if (contentLength > 250) {
    gridRowSpanClass = "lg:row-span-3 md:row-span-2"; // Large content, span more rows
  } else if (contentLength > 100) {
    gridRowSpanClass = "lg:row-span-2"; // Medium content, span 2 rows
  }

  return (
    <div
      // Main card styling: uses theme colors, rounded corners, shadow, and dynamic row span
      className={`bg-card text-foreground rounded-xl border border-border/70 
                        shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out 
                        p-5 flex flex-col justify-between group relative 
                        ${gridRowSpanClass} 
                        min-h-[150px]
                        `}
    >
      <div className="flex justify-between items-start mb-3">
        {/* Note Title */}
        <h3 className="text-xl font-extrabold text-primary leading-tight pr-8">
          {note.title}
        </h3>
        {/* AI Suggestion Indicator */}
        {/* {note.aiSuggestion && (
                    <Sparkles className="w-5 h-5 text-accent flex-shrink-0 ml-2" title="AI Generated Suggestion" />
                )} */}
      </div>

      {/* Note Description */}
      {note.description && (
                // Used max-h-40 to prevent small cards from overflowing too much
                <p className="text-sm text-muted-foreground mb-4 flex-grow max-h-40 overflow-hidden">
                    {note.description}
                </p>
            )}

      {/* AI Suggestion Section (if available) */}
      {/* {note.aiSuggestion && (
                <div className="bg-accent/10 border border-accent/40 rounded-lg p-3 text-sm text-accent-foreground mb-4">
                    <strong className="flex items-center mb-1">
                        <Sparkles className="w-4 h-4 mr-1 text-accent" /> AI Insight:
                    </strong>
                    {note.aiSuggestion}
                </div>
            )} */}

      {/* Footer with Timestamp and Action Buttons */}
      <div className="flex items-center justify-between mt-auto pt-3 border-t border-border/50">
                <span className="text-xs text-muted-foreground">
                    Created: {new Date(note.createdAt).toLocaleDateString()}
                </span>

        {/* Action Buttons (hidden by default, show on hover/focus) */}
        <div className="flex space-x-2 opacity-75 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200 absolute top-3 right-3 z-10">
                    {onEdit && (
                        <Button 
                            onClick={() => onEdit(note.id)} 
                            // Using the `Button` component imported above
                            className="bg-secondary text-secondary-foreground hover:bg-secondary/80 p-2 h-auto w-auto"
                            title="Edit Note"
                        >
                            <Edit className="w-4 h-4" />
                        </Button>
                    )}
                    {onDelete && (
                        <Button 
                            onClick={() => onDelete(note.id)} 
                            // Using the `Button` component imported above
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/80 p-2 h-auto w-auto"
                            title="Delete Note"
                        >
                            <Trash2 className="w-4 h-4" />
                        </Button>
                    )}
                </div>
      </div>
    </div>
  );
};

export default NotesCard;
