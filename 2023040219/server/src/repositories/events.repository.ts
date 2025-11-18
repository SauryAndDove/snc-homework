import { pool } from '../config/db';

export async function findEventById(id: number) {
    console.log('查询活动 ID:', id, '类型:', typeof id);
    const [rows] = await pool.query('SELECT * FROM events WHERE id = ?', [id]);
    console.log('查询结果:', rows);
    return (rows as any[])[0];
}

export async function findAllEvents() {
    const [rows] = await pool.query('SELECT * FROM events ORDER BY start_time');
    return rows as any[];
}