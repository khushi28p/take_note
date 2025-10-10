"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import NotesCard from "@/components/notes-card";
import TaskModal from "@/components/task-modal";
import { useNotesStore, NotesStore } from "@/store/notesStore";
import { useShallow } from "zustand/react/shallow";

export default function Dashboard() {
  const { notes, isModalOpen, title, description, isEditing, isLoading } =
    useNotesStore(
      useShallow((state: NotesStore) => ({ // Explicitly type for safety
        notes: state.notes,
        isModalOpen: state.isModalOpen,
        title: state.title,
        description: state.description,
        isEditing: state.isEditing,
        isLoading: state.isLoading,
      }))
    );

  const {
    getNotes,
    setIsModalOpen,
    setTitle,
    setDescription,
    handleModalClose,
    handleEditModal,
    handleCreateTask,
    handleEdit,
    handleDelete,
  } = useNotesStore(
      useShallow((state: NotesStore) => ({ // Explicitly type for safety
        getNotes: state.getNotes,
        setIsModalOpen: state.setIsModalOpen,
        setTitle: state.setTitle,
        setDescription: state.setDescription,
        handleModalClose: state.handleModalClose,
        handleEditModal: state.handleEditModal,
        handleCreateTask: state.handleCreateTask,
        handleEdit: state.handleEdit,
        handleDelete: state.handleDelete,
      }))
    );

  // Initial data fetch
  useEffect(() => {
    getNotes();
  }, [getNotes]);

  return (
    <div className=" flex flex-col p-4 w-full items-center justify-center">
      <Button
        className="border-2 font-extrabold text-lg px-8 py-6 cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        + Create
      </Button>

      <div className="mt-12 text-muted-foreground italic">
        Your tasks will appear here after creation.
      </div>

      <TaskModal
        isModalOpen={isModalOpen}
        title={title}
        description={description}
        isEditing={isEditing}
        isLoading={isLoading}
        // Pass the simplified store actions as props
        onClose={handleModalClose}
        onTitleChange={setTitle}
        onDescriptionChange={setDescription}
        onCreateTask={handleCreateTask}
        onUpdateTask={handleEdit}
      />

      <main className="w-full max-w-6xl mx-auto p-4 sm:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 grid-flow-row-dense">
          {notes.map((note, index) => (
            <NotesCard
              note={note}
              key={index}
              // Pass the store actions directly
              onEdit={handleEditModal}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
