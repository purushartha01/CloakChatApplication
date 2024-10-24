
module.exports=(req, res, next) => {
    const date=new Date(Date.now());
    console.log(`Path: ${req.url} Method: ${req.method} at Time:  ${date.toLocaleString()}`);
    req.currUserId={};
    next();
}