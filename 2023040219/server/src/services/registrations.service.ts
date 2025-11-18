import { countActiveRegistration, insertRegistration } from '../repositories/registrations.repository';
import { findEventById } from '../repositories/events.repository';

export async function createRegistration(eventId: number, body: {
    student_name: string; student_id: string; college: string; phone: string; remarks?: string;
}) {
    const event = await findEventById(eventId);
    if (!event) throw new Error('活动不存在');
    // 简单状态/截止时间检查
    if (event.status !== 0) throw new Error('活动不可报名');
    if (new Date(event.signup_deadline + 'T23:59:59') < new Date()) throw new Error('已过报名截止时间');

    const dup = await countActiveRegistration(eventId, body.student_id);
    if (dup > 0) throw new Error('请勿重复报名');

    const id = await insertRegistration({
        eventId,
        studentName: body.student_name,
        studentId: body.student_id,
        college: body.college,
        phone: body.phone,
        remarks: body.remarks,
    });
    return id;
}
