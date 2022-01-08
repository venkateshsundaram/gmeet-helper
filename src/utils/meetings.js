import { generateString } from "./text";

export function getMeetingParams() {
    const startDate = new Date();
    const endDate = new Date(startDate.getTime() + 3600000);
    const isoStartDate = new Date(
        startDate.getTime() - new Date().getTimezoneOffset() * 60 * 1000
    ).toISOString().split('.')[0];
    const isoEndDate = new Date(
        endDate.getTime() - new Date().getTimezoneOffset() * 60 * 1000
    ).toISOString().split('.')[0];

    return {
        summary: 'Instant Google Meeting',
        description: 'Google Meeting created using gmeet-helper',
        start: {
            dateTime: isoStartDate,
            timeZone: 'Asia/Kolkata',
        },
        end: {
            dateTime: isoEndDate,
            timeZone: 'Asia/Kolkata',
        },
        conferenceData: {
            createRequest: { requestId: generateString(10) },
        },
    };
}