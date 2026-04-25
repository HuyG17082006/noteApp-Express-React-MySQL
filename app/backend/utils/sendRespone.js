export default (res, {
    resStatus = 200,
    message = '',
    data,
    ...rest
} = {}) => {

    const payload = { message };

    if (data !== undefined && data !== null) {
        payload.data = data;
    }

    Object.assign(payload, rest);

    return res.status(resStatus).json(payload);
};