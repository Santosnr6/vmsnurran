export const validateAuthBody = (req, res, next) => {
    if(!req.body) {
        next({
            status : 401,
            message : 'Missing request body'
        });
    }
    const { username, password } = req.body;
    if(!username || !password) {
        next({
            status : 401,
            message : 'Both username and password are required'
        });
    }
    next();
}