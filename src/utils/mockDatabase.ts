import { Student, Course, AttendanceRecord, AttendanceReport } from '../types/database';

class IndexedDBService {
  private db: IDBDatabase | null = null;
  private readonly DB_NAME = 'attendanceDB';
  private readonly DB_VERSION = 1;

  async init(): Promise<void> {
    if (this.db) return;

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.DB_NAME, this.DB_VERSION);

      request.onerror = () => reject(request.error);

      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        
        if (!db.objectStoreNames.contains('courses')) {
          db.createObjectStore('courses', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('students')) {
          const studentStore = db.createObjectStore('students', { keyPath: 'id' });
          studentStore.createIndex('studentId', 'studentId', { unique: true });
          studentStore.createIndex('email', 'email', { unique: true });
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

  private async ensureConnection(): Promise<void> {
    if (!this.db) {
      await this.init();
    }
  }

  private getStore(storeName: string, mode: IDBTransactionMode = 'readonly'): IDBObjectStore {
    if (!this.db) throw new Error('Database not initialized');
    const transaction = this.db.transaction(storeName, mode);
    return transaction.objectStore(storeName);
  }

  async create<T extends { id: string }>(storeName: string, data: T): Promise<T> {
    await this.ensureConnection();
    return new Promise((resolve, reject) => {
      const store = this.getStore(storeName, 'readwrite');
      const request = store.add(data);
      request.onsuccess = () => resolve(data);
      request.onerror = () => reject(request.error);
    });
  }

  async getAll<T>(storeName: string): Promise<T[]> {
    await this.ensureConnection();
    return new Promise((resolve, reject) => {
      const store = this.getStore(storeName);
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async getById<T>(storeName: string, id: string): Promise<T | undefined> {
    await this.ensureConnection();
    return new Promise((resolve, reject) => {
      const store = this.getStore(storeName);
      const request = store.get(id);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async update<T extends { id: string }>(storeName: string, data: T): Promise<T> {
    await this.ensureConnection();
    return new Promise((resolve, reject) => {
      const store = this.getStore(storeName, 'readwrite');
      const request = store.put(data);
      request.onsuccess = () => resolve(data);
      request.onerror = () => reject(request.error);
    });
  }

  async delete(storeName: string, id: string): Promise<void> {
    await this.ensureConnection();
    return new Promise((resolve, reject) => {
      const store = this.getStore(storeName, 'readwrite');
      const request = store.delete(id);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async getByIndex<T>(storeName: string, indexName: string, value: any): Promise<T[]> {
    await this.ensureConnection();
    return new Promise((resolve, reject) => {
      const store = this.getStore(storeName);
      const index = store.index(indexName);
      const request = index.getAll(value);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
}

const dbService = new IndexedDBService();

// Database Operations
export const db = {
  students: {
    create: (student: Student) => dbService.create('students', student),
    getAll: () => dbService.getAll<Student>('students'),
    getById: (id: string) => dbService.getById<Student>('students', id),
    update: (student: Student) => dbService.update('students', student),
    delete: (id: string) => dbService.delete('students', id),
  },
  courses: {
    create: (course: Course) => dbService.create('courses', course),
    getAll: () => dbService.getAll<Course>('courses'),
    getById: (id: string) => dbService.getById<Course>('courses', id),
    update: (course: Course) => dbService.update('courses', course),
    delete: (id: string) => dbService.delete('courses', id),
  },
  attendance: {
    create: (record: AttendanceRecord) => dbService.create('attendanceRecords', record),
    getAll: () => dbService.getAll<AttendanceRecord>('attendanceRecords'),
    getByCourse: (courseId: string) => dbService.getByIndex<AttendanceRecord>('attendanceRecords', 'courseId', courseId),
    update: (record: AttendanceRecord) => dbService.update('attendanceRecords', record),
    delete: (id: string) => dbService.delete('attendanceRecords', id),
  },
  reports: {
    create: (report: AttendanceReport) => dbService.create('reports', report),
    getAll: () => dbService.getAll<AttendanceReport>('reports'),
    getByCourse: (courseId: string) => dbService.getByIndex<AttendanceReport>('reports', 'courseId', courseId),
    update: (report: AttendanceReport) => dbService.update('reports', report),
    delete: (id: string) => dbService.delete('reports', id),
  },
};

// Initialize the database when the file is imported
dbService.init().catch(console.error);