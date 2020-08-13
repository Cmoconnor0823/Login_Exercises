//middleware makes that checks to see if user is authenticated before gives access to page (route)
module.exports = {
    ensureAuthenticated: function(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }
        res.redirect('/');
    }
};