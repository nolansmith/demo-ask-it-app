import moment from 'moment';

const updateUserActivity = (req) => {
    req.session.user.lastActive = new Date();
    //req.session.user.pages = [...req.session.user.pages, req.url !== '/favicon.ico' ? req.url : undefined]
}

const getLastUserActivity = (req) => {

    let time = (new Date()).getTime() - req.session.user.lastActive;
    return {seconds: time/1000, minutes: Math.ceil(time/60000), hours: Math.floor(time/3600000)}

}

module.exports = {updateUserActivity,getLastUserActivity};