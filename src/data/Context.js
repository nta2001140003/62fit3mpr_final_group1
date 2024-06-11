import React, { useContext, useReducer } from "react";
import { LABELS, NOTES, COLORS, TRASH } from "./DummyData";

const Context = React.createContext({
  notes: NOTES,
  trash: TRASH,
  colors: COLORS,
  labels: LABELS,

  addNote: ({ content }) => {},

  editNote: (noteId, { color, labelIds, content, isBookMarked }) => {},
  moveToTrash: (noteId) => {},

  restoreNote: (noteId) => {},
  deleteNote: (noteId) => {},
  emptyTrash: () => {},

  addLabel: (name) => {},
  editLabel: (labelId, { name }) => {},
  deleteLabel: (labelId) => {},
});

function reducer(state, action) {
  switch (action.type) {
    case "ADD_NOTE":
      return {
        ...state,
        notes: [
          ...state.notes,
          {
            id: new Date().toISOString() + Math.random().toString(),
            color: null,
            content: action.payload.content,
            labelIds: [],
            updateAt: new Date().toISOString(),
            isBookmarked: false,
          },
        ],
      };
    case "EDIT_NOTE":
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === action.payload.noteId
            ? {
                ...note,
                color: action.payload.color,
                labelIds: action.payload.labelIds,
                content: action.payload.content,
                updateAt: new Date().toISOString(),
                isBookmarked: action.payload.isBookmarked,
              }
            : note
        ),
      };
    case "MOVE_TO_TRASH":
      return {
        ...state,
        notes: state.notes.filter((note) => note.id !== action.payload.noteId),
        trash: [
          ...state.trash,
          state.notes.find((note) => note.id === action.payload.noteId),
        ],
      };
    case "RESTORE_NOTE":
      return {
        ...state,
        trash: state.trash.filter((note) => note.id !== action.payload.noteId),
        notes: [
          ...state.notes,
          state.trash.find((note) => note.id === action.payload.noteId),
        ],
      };
    case "DELETE_NOTE":
      return {
        ...state,
        trash: state.trash.filter((note) => note.id !== action.payload.noteId),
      };
    case "EMPTY_TRASH":
      return {
        ...state,
        trash: [],
      };
    case "ADD_LABEL":
      return {
        ...state,
        labels: [
          ...state.labels,
          {
            id: new Date().toISOString() + Math.random().toString(),
            name: action.payload.name,
          },
        ],
      };
    case "EDIT_LABEL":
      return {
        ...state,
        labels: state.labels.map((label) =>
          label.id === action.payload.labelId
            ? { ...label, name: action.payload.name }
            : label
        ),
      };
    case "DELETE_LABEL":
      return {
        ...state,
        labels: state.labels.filter(
          (label) => label.id !== action.payload.labelId
        ),
        notes: state.notes.map((note) => ({
          ...note,
          labelIds: note.labelIds.filter(
            (labelId) => labelId !== action.payload.labelId
          ),
        })),
        trash: state.trash.map((note) => ({
          ...note,
          labelIds: note.labelIds.filter(
            (labelId) => labelId !== action.payload.labelId
          ),
        })),
      };
    default:
      return state;
  }
}
function Provider({ children }) {
  const [state, dispatch] = useReducer(reducer, {
    notes: NOTES,
    trash: TRASH,
    colors: COLORS,
    labels: LABELS,
  });

  const addNote = ({ content }) => {
    dispatch({ type: "ADD_NOTE", payload: { content } });
  };

  const editNote = (noteId, { color, labelIds, content, isBookmarked }) => {
    dispatch({
      type: "EDIT_NOTE",
      payload: { noteId, color, labelIds, content, isBookmarked },
    });
  };

  const moveToTrash = (noteId) => {
    dispatch({ type: "MOVE_TO_TRASH", payload: { noteId } });
  };

  const restoreNote = (noteId) => {
    dispatch({ type: "RESTORE_NOTE", payload: { noteId } });
  };

  const deleteNote = (noteId) => {
    dispatch({ type: "DELETE_NOTE", payload: { noteId } });
  };

  const emptyTrash = () => {
    dispatch({ type: "EMPTY_TRASH" });
  };

  const addLabel = (name) => {
    dispatch({ type: "ADD_LABEL", payload: { name } });
  };

  const editLabel = (labelId, { name }) => {
    dispatch({ type: "EDIT_LABEL", payload: { labelId, name } });
  };

  const deleteLabel = (labelId) => {
    dispatch({ type: "DELETE_LABEL", payload: { labelId } });
  };

  return (
    <Context.Provider
      value={{
        notes: state.notes,
        trash: state.trash,
        colors: state.colors,
        labels: state.labels,
        addNote,
        editNote,
        moveToTrash,
        restoreNote,
        deleteNote,
        emptyTrash,
        addLabel,
        editLabel,
        deleteLabel,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export { Context, Provider };
