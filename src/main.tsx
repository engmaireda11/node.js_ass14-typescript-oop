

//  User Class 


class User {
    public readonly id: number;
    public name: string;
    public email: string;
    private password: string;
    public phone: string;

    private _age: number;

    // Aggregation: User can have multiple Notebooks
    public notebooks: NoteBook[] = [];

    constructor(
        id: number,
        name: string,
        email: string,
        password: string,
        phone: string,
        age: number
    ) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.age = age;
    }

    // Age validation
    public set age(value: number) {
        if (value < 18 || value > 60) {
            throw new Error("Age must be between 18 and 60");
        }

        this._age = value;
    }

    public get age(): number {
        return this._age;
    }

    public displayInfo(): void {
        console.log(`ID: ${this.id}`);
        console.log(`Name: ${this.name}`);
        console.log(`Email: ${this.email}`);
        console.log(`Phone: ${this.phone}`);
        console.log(`Age: ${this.age}`);
    }

    // Add a Notebook to the user's collection
    public addNotebook(notebook: NoteBook): void {
        this.notebooks.push(notebook);
    }
}



//  Admin Class


class Admin extends User {

    constructor(
        id: number,
        name: string,
        email: string,
        password: string,
        phone: string,
        age: number
    ) {
        super(id, name, email, password, phone, age);
    }

    // Admin can manage Notes
    public manageNotes(
        notebook: NoteBook,
        note: Note
    ): void {
        notebook.addNote(note);
        console.log("Admin added a new note successfully");
    }
}



//  Note Class


class Note {
    public readonly id: number;
    public title: string;
    public content: string;

    // Association with User
    public readonly author: User;

    // Reference to the author's ID
    public readonly userId: number;

    constructor(
        id: number,
        title: string,
        content: string,
        author: User
    ) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.author = author;
        this.userId = author.id;
    }

    public preview(): string {
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
    private notes: Note[] = [];

    public name: string;

    constructor(name: string) {
        this.name = name;
    }

    public addNote(note: Note): void {
        this.notes.push(note);
        console.log("Note added successfully");
    }

    public removeNote(noteId: number): void {
        this.notes = this.notes.filter(
            note => note.id !== noteId
        );
    }

    public getAllNotes(): Note[] {
        return [...this.notes];
    }
}



// Storage Class 


class Storage<T> {

    private items: T[] = [];

    public addItem(item: T): void {
        this.items.push(item);
    }

    public removeItem(index: number): void {
        if (index < 0 || index >= this.items.length) {
            throw new Error("Invalid index");
        }

        this.items.splice(index, 1);
    }

    public getAllItems(): T[] {
        return [...this.items];
    }
}






// Create Users
const user1 = new User(
    1,
    "Mai",
    "mai@example.com",
    "123456",
    "01000000000",
    20
);

// Create Admin
const admin = new Admin(
    2,
    "Ahmed",
    "admin@example.com",
    "admin123",
    "01100000000",
    30
);

// Create Notebooks
const notebook1 = new NoteBook("Study Notes");
const notebook2 = new NoteBook("Personal Notes");

// Aggregation: User owns Notebooks
user1.addNotebook(notebook1);
user1.addNotebook(notebook2);

// Create Notes
const note1 = new Note(
    1,
    "TypeScript",
    "TypeScript is a programming language built on JavaScript",
    user1
);

const note2 = new Note(
    2,
    "OOP",
    "OOP is based on classes and objects",
    user1
);

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
const stringStorage = new Storage<string>();
stringStorage.addItem("Hello");
stringStorage.addItem("TypeScript");

console.log(stringStorage.getAllItems());

const numberStorage = new Storage<number>();
numberStorage.addItem(10);
numberStorage.addItem(20);

console.log(numberStorage.getAllItems());

