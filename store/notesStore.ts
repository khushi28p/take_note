import {create} from 'zustand';
import { devtools } from 'zustand/middleware';
import { toast } from 'sonner';

interface Note {
    id: string;
    title: string;
    description: string | null;
    createdAt: string;
}

interface NotesState {
  notes: Note[];
  isModalOpen: boolean;
  title: string;
  description: string;
  isEditing: boolean;
  editingNoteId: string | null;
  isLoading: boolean;
}

interface NotesActions {
  setIsModalOpen: (open: boolean) => void;
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  handleModalClose: () => void; 
  
  getNotes: () => Promise<void>;
  handleEditModal: (id: string) => void;
  handleCreateTask: () => Promise<void>;
  handleEdit: () => Promise<void>;
  handleDelete: (id: string) => Promise<void>;
}

export type NotesStore = NotesState & NotesActions;

export const useNotesStore = create<NotesStore>()(
    devtools(
        (set, get) => ({
            notes: [],
            isModalOpen: false,
            title: "",
            description: "",
            isEditing: false,
            editingNoteId: null,
            isLoading: false,

            setIsModalOpen: (open) => set({ isModalOpen: open }),
            setTitle: (title) => set({ title }),
            setDescription: (description) => set({ description }),

            handleModalClose: () => set({
                isModalOpen: false,
                title: "",
                description: "",
                isEditing: false,
                editingNoteId: null,
            }),

            getNotes: async () => {
                try {
                const res = await fetch("/api/notes");
                const data = await res.json();
                set({ notes: data });
                } catch (error) {
                console.error("Failed to fetch notes:", error);
                toast.error("Failed to load tasks.");
                }
            },

            handleEditModal: (id: string) => {
                const { notes } = get();
                const noteToEdit = notes.find((n: any) => n.id === id); 

                if (!noteToEdit) return;

                set({
                isEditing: true,
                isModalOpen: true,
                editingNoteId: id,
                title: noteToEdit.title,
                description: noteToEdit.description || "",
                });
            },

            handleCreateTask: async () => {
                const { title, description, handleModalClose, getNotes } = get();
                if (!title) return;

                set({ isLoading: true });
                
                try {
                const res = await fetch("/api/notes", {
                    method: "POST",
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify({ title, description }),
                });

                if (res.ok) {
                    handleModalClose();
                    await getNotes();
                    toast.success("Task created successfully.");
                } else {
                    toast.error("Failed to create task on server.");
                }
                } catch (error) {
                console.error("Failed to create task:", error);
                toast.error("Could not connect to the server.");
                } finally {
                set({ isLoading: false });
                }
            },

            handleEdit: async () => {
                const { editingNoteId, title, description, handleModalClose, getNotes } = get();
                if (!editingNoteId || !title) return;

                set({ isLoading: true });

                try {
                const res = await fetch(`/api/notes/${editingNoteId}`, {
                    method: "PUT",
                    headers: { "Content-type": "application/json" },
                    body: JSON.stringify({ title, description }),
                });

                if (res.ok) {
                    handleModalClose();
                    await getNotes();
                    toast.success("Task updated successfully.");
                } else {
                    toast.error("Failed to update task on server.");
                }
                } catch (error) {
                console.error("Failed to update task:", error);
                toast.error("Could not connect to the server.");
                } finally {
                set({ isLoading: false });
                }
            },

            handleDelete: async(id: string) => {
                const originalNotes = get().notes;
                set((state) => ({ notes: state.notes.filter(note => note.id !== id) }));

                try {
                    const res = await fetch(`/api/notes/${id}`, {
                        method: "DELETE",
                    });

                    if (res.ok) {
                        toast.success("Task deleted successfully!!!");
                    } else{
                        // Revert state if API call failed
                        set({ notes: originalNotes });
                        toast.error("Failed to delete task.");
                        await getNotes(); // Re-fetch to ensure sync
                    }
                    }
                    catch (error) {
                // Revert state if network call failed
                set({ notes: originalNotes });
                toast.error("Could not connect to server to delete task.");
                await getNotes(); // Re-fetch to ensure sync
                }
            },
        }),
        {name: 'notes-store'}
    )
)