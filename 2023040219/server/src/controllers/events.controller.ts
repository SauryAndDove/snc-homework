import type { Request, Response } from 'express';
import { findAllEvents } from '../repositories/events.repository';

export async function getEvents(req: Request, res: Response) {
    try {
        const events = await findAllEvents();
        
        const formattedEvents = events.map(event => ({
            id: event.id,
            title: event.title,
            status: event.status,
            statusText: getStatusText(event.status),
            location: event.location,
            start_time: event.start_time,
            description: event.description,
            signup_deadline: event.signup_deadline,
        }));
        
        res.json(formattedEvents);
    } catch (error: any) {
        console.error('获取活动列表失败:', error);
        res.status(500).json({ message: '获取活动列表失败' });
    }
}

function getStatusText(status: number): string {
    const map: { [key: number]: string } = {
        0: '未开始',
        1: '进行中',
        2: '已结束',
        3: '已取消'
    };
    return map[status] || '未知';
}