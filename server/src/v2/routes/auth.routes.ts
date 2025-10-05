import express, {Router} from "express";
import passport from 'passport'
import { responseHandler } from "../../utils/responseHandler/responseHandler";
import { getCustomerWithEmail } from "../../queries/user.queries";
import { logErrorWithSource } from "../../config/logger";

const router:Router = express.Router();

// Auth with google
router.get('/google', (req: any, res, next) => {
    const redirectUrl = req.query.redirect ?  decodeURIComponent(req.query.redirect) : process.env.BASE_URL;
    req.session.redirectUrl = redirectUrl; // Store the redirect URL in the session
    next();
}, passport.authenticate('google', {
    scope: ['profile','email']
}))

router.get('/google/redirect', passport.authenticate('google', {
    successRedirect: process.env.BASE_URL,
    failureRedirect: '/api/v2/auth/login/failed'
}), (req: any, res) => {
    if(req.user){
        const redirectUrl = req.session.redirectUrl || "https://pickmymaid.com"; // Retrieve the stored redirect URL
        console.log(req.session.redirectUrl);
        delete req.session.redirectUrl; // Clean up the session data
        
        res.redirect(redirectUrl);
    }
})

//=====================================
//=   Apple Routes
//=====================================
router.get('/apple', (req: any, res, next) => {
    console.log(req.query.redirect, "redirectUrl")
    const redirectUrl = req.query.redirect
        ? decodeURIComponent(req.query.redirect)
        : process.env.BASE_URL;
    console.log(redirectUrl, 'redirect url before')
    req.session.redirectUrl = redirectUrl; // Store the redirect URL in the session
    console.log(req.session.redirectUrl, 'session url')
    next();
}, passport.authenticate('apple', { scope: ['name', 'email'] }));

router.get('/apple/redirect', passport.authenticate('apple', {
    failureRedirect: '/api/v2/auth/login/failed', // Redirect on failure
}), (req: any, res) => {
    if (req.user) {
        const redirectUrl = req.session.redirectUrl; // Retrieve the stored redirect URL
        delete req.session.redirectUrl; // Clean up the session data
        console.log(redirectUrl,'this is redirecturl from redirect')
        res.redirect(redirectUrl); // Redirect to the desired URL
    }
});




//=====================================
//=   FACEBOOK Routes
//=====================================
router.get('/facebook', passport.authenticate('facebook', {
    scope: ['public_profile', 'email']
}))
router.get('/facebook/redirect', passport.authenticate('facebook', {
    successRedirect: process.env.BASE_URL,
    failureRedirect: '/api/v2/auth/login/failed'
}), (req, res) => {
    if(req.user){
       res.redirect("https://pickmymaid.com" as string) 
    }
})

/*====================================
 *  Local Login Routes
 ====================================*/
router.post('/local',(req,res,next) => {
    return passport.authenticate('local',(err:any, user: any, info: any) => {
        if(err){ 
            responseHandler(res, 'INTERNAL_SERVER_ERROR', null, {message: info?.message || 'Something went wrong!'})
        }else if(!user){
            responseHandler(res, 'UNAUTHORIZED',null, info)
        }else{
            req.logIn(user, (err) => {
                if(err) responseHandler(res, 'INTERNAL_SERVER_ERROR', null, {message: 'Something went wrong!'})
                responseHandler(res, 'OK', user, {message: "Logged in successfully!"})
            })
        }
    })(req,res,next)
})

// Handling the login failure
router.get('/login/failed', (req,res) => {
    return responseHandler(res, "UNAUTHORIZED", {
        success: false,
        message: "User authentication failed"
    })
})

// Handling teh login success
router.get('/login/success', async (req,res) => {
    const user:any = req.user
    if(user && user?._id){
        delete user.password
        delete user.reset_token
        delete user.type
        return responseHandler(res,"OK", {
            user: user,
            message: "User has successfully authenticated",
        })
    }
    return responseHandler(res, "UNAUTHORIZED", null, {message: "You are not authenticated!"})
})

// Handling logout
router.get("/logout", (req,res) => {
    return req.logOut((err) => {
        if(err){
            return responseHandler(res,'INTERNAL_SERVER_ERROR', {
                message: "Something went wrong, Please try again!",
                err: err
            })
        }
        return responseHandler(res,'OK',{message: "Successfully logged out!"})
    })
})

router.post("/log-error", (req, res) => {
    logErrorWithSource({message: "Error with user data"}, {error_user: req.user, error_body: req.body})
    return responseHandler(res, "OK", {message: 'Saved successfully!'})
})



export default router;