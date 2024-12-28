import { Student, Course, AttendanceRecord, AttendanceReport } from '../types/database';

const DB_NAME = 'attendanceDB';
const DB_VERSION = 1;

export class IndexedDBService {
  private db: IDBDatabase | null = null;

  async initDB(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => {
        console.error("Database error:", request.error);
        reject(request.error);
      };

      request.onsuccess = () => {
        this.db = request.result;
        console.log("Database initialized successfully");
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        // Create stores with indexes
        if (!db.objectStoreNames.contains('students')) {
          const studentStore = db.createObjectStore('students', { keyPath: 'id' });
          studentStore.createIndex('studentId', 'studentId', { unique: true });
          studentStore.createIndex('email', 'email', { unique: true });
        }

        if (!db.objectStoreNames.contains('courses')) {
          const courseStore = db.createObjectStore('courses', { keyPath: 'id' });
          courseStore.createIndex('name', 'name', { unique: false });
        }

        if (!db.objectStoreNames.contains('attendanceRecords')) {
          const attendanceStore = db.createObjectStore('attendanceRecords', { keyPath: 'id' });
          attendanceStore.createIndex('courseId', 'courseId', { unique: false });
          attendanceStore.createIndex('date', 'date', { unique: false });
        }

        if (!db.objectStoreNames.contains('reports')) {
          const reportStore = db.createObjectStore('reports', { keyPath: 'id' });
          reportStore.createIndex('courseId', 'courseId', { unique: false });
          reportStore.createIndex('date', 'date', { unique: false });
        }
      };
    });
  }

  private getStore(storeName: string, mode: IDBTransactionMode = 'readonly'): IDBObjectStore {
    if (!this.db) throw new Error('Database not initialized');
    const transaction = this.db.transaction(storeName, mode);
    return transaction.objectStore(storeName);
  }

  // Generic CRUD operations
  async create<T>(storeName: string, data: T): Promise<T> {
    return new Promise((resolve, reject) => {
      const store = this.getStore(storeName, 'readwrite');
      const request = store.add(data);
      request.onsuccess = () => resolve(data);
      request.onerror = () => reject(request.error);
    });
  }

  async getAll<T>(storeName: string): Promise<T[]> {
    return new Promise((resolve, reject) => {
      const store = this.getStore(storeName);
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async getById<T>(storeName: string, id: string): Promise<T | undefined> {
    return new Promise((resolve, reject) => {
      const store = this.getStore(storeName);
      const request = store.get(id);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async update<T>(storeName: string, id: string, data: T): Promise<T> {
    return new Promise((resolve, reject) => {
      const store = this.getStore(storeName, 'readwrite');
      const request = store.put(data);
      request.onsuccess = () => resolve(data);
      request.onerror = () => reject(request.error);
    });
  }

  async delete(storeName: string, id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const store = this.getStore(storeName, 'readwrite');
      const request = store.delete(id);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  // Specialized queries
  async getStudentsByCourse(courseId: string): Promise<Student[]> {
    const course = await this.getById<Course>('courses', courseId);
    if (!course) return [];
    
    return Promise.all(
      course.students.map(id => this.getById<Student>('students', id))
    ).then(students => students.filter((s): s is Student => s !== undefined));
  }

  async getAttendanceRecordsByCourse(courseId: string): Promise<AttendanceRecord[]> {
    return new Promise((resolve, reject) => {
      const store = this.getStore('attendanceRecords');
      const index = store.index('courseId');
      const request = index.getAll(courseId);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async getReportsByCourse(courseId: string): Promise<AttendanceReport[]> {
    return new Promise((resolve, reject) => {
      const store = this.getStore('reports');
      const index = store.index('courseId');
      const request = index.getAll(courseId);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
}

// Create and export a singleton instance
export const db = new IndexedDBService();

// Initialize the database when the file is imported
db.initDB().catch(console.error);