import { 
    A_SECOND_TO_MILI_SECOND,
    A_MINUTE_TO_MILI_SECOND, 
    AN_HOUR_TO_MILI_SECOND, 
    A_DAY_TO_MILI_SECOND 
} from "./constant";

export const formatDate = (date) => {
    const d = new Date(date);

    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();

    const hour = String(d.getHours()).padStart(2, '0');
    const minute = String(d.getMinutes()).padStart(2, '0');

    const timeSinceCreated = Date.now() - d

    if (timeSinceCreated > A_DAY_TO_MILI_SECOND)
        return `${Math.ceil(timeSinceCreated / A_DAY_TO_MILI_SECOND)} ngày trước`;

    if (timeSinceCreated > AN_HOUR_TO_MILI_SECOND)
        return `${Math.ceil(timeSinceCreated / AN_HOUR_TO_MILI_SECOND)} giờ trước`;

    if (timeSinceCreated > A_MINUTE_TO_MILI_SECOND)
        return `${Math.ceil(timeSinceCreated / AN_HOUR_TO_MILI_SECOND)} phút trước`;

    if (timeSinceCreated > A_SECOND_TO_MILI_SECOND)
        return `${Math.ceil(timeSinceCreated / A_SECOND_TO_MILI_SECOND)} giây trước`;

    return `${day}/${month}/${year} - ${hour}:${minute}`;
};
