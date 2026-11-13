"use strict";
//  User Class 
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    id;
    name;
    email;
    password;
    phone;
    _age;
    // Aggregation: User can have multiple Notebooks
    notebooks = [];
    constructor(id, name, email, password, phone, age) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.age = age;
    }
    // Age validation
    set age(value) {
        if (value < 18 || value > 60) {
            throw new Error("Age must be between 18 and 60");
        }
        this._age = value;
    }
    get age() {
        return this._age;
    }
    displayInfo() {
        console.log(`ID: ${this.id}`);
        console.log(`Name: ${this.name}`);
        console.log(`Email: ${this.email}`);
        console.log(`Phone: ${this.phone}`);
        console.log(`Age: ${this.age}`);
    }
    // Add a Notebook to the user's collection
    addNotebook(notebook) {
        this.notebooks.push(notebook);
    }
}
//  Admin Class
class Admin extends User {
    constructor(id, name, email, password, phone, age) {
        super(id, name, email, password, phone, age);
    }
    // Admin can manage Notes
    manageNotes(notebook, note) {
        notebook.addNote(note);
        console.log("Admin added a new note successfully");
    }
}
//  Note Class
class Note {
    id;
    title;
    content;
    // Association with User
    author;
    // Reference to the author's ID
    userId;
    constructor(id, title, content, author) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.author = author;
        this.userId = author.id;
    }
    preview() {
        const maxLength = 30;
        if (this.content.length <= maxLength) {
            return this.content;
        }
        return this.content.substring(0, maxLength) + "...";
    }
}
// NoteBook Class - Composition
class NoteBook {
    // Composition: Notebook contains Notes
    notes = [];
    name;
    constructor(name) {
        this.name = name;
    }
    addNote(note) {
        this.notes.push(note);
        console.log("Note added successfully");
    }
    removeNote(noteId) {
        this.notes = this.notes.filter(note => note.id !== noteId);
    }
    getAllNotes() {
        return [...this.notes];
    }
}
// Storage Class 
class Storage {
    items = [];
    addItem(item) {
        this.items.push(item);
    }
    removeItem(index) {
        if (index < 0 || index >= this.items.length) {
            throw new Error("Invalid index");
        }
        this.items.splice(index, 1);
    }
    getAllItems() {
        return [...this.items];
    }
}
// Create Users
const user1 = new User(1, "Mai", "mai@example.com", "123456", "01000000000", 20);
// Create Admin
const admin = new Admin(2, "Ahmed", "admin@example.com", "admin123", "01100000000", 30);
// Create Notebooks
const notebook1 = new NoteBook("Study Notes");
const notebook2 = new NoteBook("Personal Notes");
// Aggregation: User owns Notebooks
user1.addNotebook(notebook1);
user1.addNotebook(notebook2);
// Create Notes
const note1 = new Note(1, "TypeScript", "TypeScript is a programming language built on JavaScript", user1);
const note2 = new Note(2, "OOP", "OOP is based on classes and objects", user1);
// Composition: Add Notes to Notebook
notebook1.addNote(note1);
notebook1.addNote(note2);
// Admin manages Notes
admin.manageNotes(notebook2, note1);
// Display User Info
user1.displayInfo();
// Preview a Note
console.log(note1.preview());
// Get all Notes
console.log(notebook1.getAllNotes());
// Generics Testing
const stringStorage = new Storage();
stringStorage.addItem("Hello");
stringStorage.addItem("TypeScript");
console.log(stringStorage.getAllItems());
const numberStorage = new Storage();
numberStorage.addItem(10);
numberStorage.addItem(20);
console.log(numberStorage.getAllItems());
