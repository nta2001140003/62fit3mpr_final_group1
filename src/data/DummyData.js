import Label from "../models/Label";
import Note from "../models/Note";
export const LABELS = [
  new Label("l1", "React Native"),
  new Label("l2", "Final Exam"),
  new Label("l3", "Mini Project"),
  new Label("l4", "Team Work"),
  new Label("l5", "React Basic"),
];

export const COLORS = [
  null,
  "lightseagreen",
  "skyblue",
  "lightcoral",
  "lightpink",
  "lightgreen",
  "lightblue",
  "orange",
  "palegreen",
];

export const NOTES = [
  new Note(
    "n1",
    null,
    ["l1", "l2"],
    "Final Project Preparation",
    new Date("2024-5-10T12:30:00"),
    false
  ),
  new Note(
    "n2",
    COLORS[3],
    ["l3"],
    "For out mini project",
    new Date("2024-5-10T12:35:00"),
    true
  ),
  new Note(
    "n3",
    COLORS[4],
    ["l2"],
    "Second note!",
    new Date("2024-4-20T15:30:00"),
    false
  ),
  new Note(
    "n4",
    COLORS[5],
    ["l1"],
    "OK the first note here!",
    new Date("2024-4-20T12:25:00"),
    false
  ),
];

export const TRASH = [
  new Note(
    "n5",
    COLORS[6],
    ["l4"],
    "This is a trashed note",
    new Date("2024-4-20T12:25:00"),
    false
  ),
  new Note(
    "n6",
    COLORS[7],
    ["l5"],
    "This is another trashed note",
    new Date("2024-4-20T12:25:00"),
    false
  ),
  new Note(
    "n7",
    COLORS[0],
    ["l1"],
    "This is a trashed note",
    new Date("2024-4-20T12:25:00"),
    false
  ),
];
