import type { Request, Response } from 'express';
import { createRegistration } from '../services/registrations.service';

export async function postRegistration(req: Request, res: Response) {
    const eventId = Number(req.params.id);
    const { student_name, student_id, college, phone, remarks } = req.body;
    if (!eventId || !student_name || !student_id || !college || !phone) {
        return res.status(400).json({ message: '参数不完整' });
    }
    try {
        const id = await createRegistration(eventId, { student_name, student_id, college, phone, remarks });
        res.status(201).json({ message: 'ok', id });
    } catch (err: any) {
        res.status(400).json({ message: err.message ?? '报名失败' });
    }
}
