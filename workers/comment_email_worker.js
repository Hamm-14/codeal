const queue = require('../config/kue');

const commentMailer = require('../mailers/comments_mailer');

queue.process('emails',function(job,done){
    commentMailer.newComment(job.data);
    done();
});