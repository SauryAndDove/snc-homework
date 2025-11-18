import { pool } from '../config/db';

export async function countActiveRegistration(eventId: number, student: string) {
    const [rows] = await pool.query(
        'SELECT COUNT(*) as cnt FROM form WHERE event_id = ? AND student_id = ?',
        [eventId, student]
    );
    return (rows as any[])[0].cnt as number;
}

export async function insertRegistration(form: {
    eventId: number;
    studentName: string;
    studentId: string;
    college: string;
    phone: string;
    remarks?: string;
}) {
    const { eventId, studentName, studentId, college, phone, remarks } = form;
    const [result] = await pool.query(
        'INSERT INTO form (event_id, student_name, student_id, college, phone, remarks) VALUES (?, ?, ?, ?, ?, ?)',
        [eventId, studentName, studentId, college, phone, remarks ?? null],
    );
    return (result as any).insertId as number;
}