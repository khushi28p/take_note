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
      // Main card styling: Uses bg-card (P5/P1), text-foreground (P1/P5), border-border (P2)
      className={`bg-card text-foreground rounded-xl border border-border/70 
                  shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out 
                  p-5 flex flex-col justify-between group relative 
                  ${gridRowSpanClass} 
                  min-h-[150px]
                  `}
    >
      <div className="flex justify-between items-start mb-3">
        {/* Note Title: Use text-primary (P3/P4) for a warm, punchy header */}
        <h3 className="text-xl font-extrabold text-primary leading-tight pr-8">
          {note.title}
        </h3>
        {/* AI Suggestion Indicator - Activated */}
        {/* {note.aiSuggestion && (
            <Sparkles 
                className="w-5 h-5 text-accent flex-shrink-0 ml-2 mt-0.5" // text-accent (P4/P2) for the icon
                title="AI Generated Suggestion" 
            />
        )} */}
      </div>

      {/* Note Description */}
      {note.description && (
          // text-muted-foreground (P1/P5) for secondary/body text for contrast with the title
          <p className="text-sm text-muted-foreground mb-4 flex-grow max-h-40 overflow-hidden">
              {note.description}
          </p>
      )}

      {/* AI Suggestion Section (if available) - Activated and Themed */}
      {/* {note.aiSuggestion && (
          <div 
            // Background is a light tint of accent, border is a stronger accent
            className="bg-accent/10 border border-accent/40 rounded-lg p-3 text-sm text-accent-foreground mb-4"
          >
              <strong className="flex items-center mb-1">
                  <Sparkles className="w-4 h-4 mr-1 text-accent" /> AI Insight:
              </strong>
              {note.aiSuggestion}
          </div>
      )} */}

      {/* Footer with Timestamp and Action Buttons */}
      <div className="flex items-center justify-between mt-auto pt-3 border-t border-border/50">
          <span className="text-xs text-muted-foreground">
              {/* Using a relative date format is often better for notes */}
              Created: {new Date(note.createdAt).toLocaleDateString()} 
          </span>

        {/* Action Buttons (now positioned with z-10 on top-right) */}
        {/* We keep the absolute positioning and hover effect for a cleaner look */}
        <div className="flex space-x-2 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200 absolute top-3 right-3 z-10">
              {onEdit && (
                  <Button 
                      onClick={() => onEdit(note.id)} 
                      // Edit button uses Secondary color: bg-secondary (P4/P2) for subtle action
                      className="bg-secondary text-secondary-foreground hover:bg-secondary/80 p-2 h-auto w-auto rounded-full"
                      title="Edit Note"
                  >
                      <Edit className="w-4 h-4" />
                  </Button>
              )}
              {onDelete && (
                  <Button 
                      onClick={() => onDelete(note.id)} 
                      // Delete button uses Destructive color: bg-destructive (Red) for clear warning
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/80 p-2 h-auto w-auto rounded-full"
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
