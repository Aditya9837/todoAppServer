import http  from "http";

import nodemailer from 'nodemailer'
const server = http.createServer((request, response) => {
    const auth = nodemailer.createTransport({
        service: "gmail",
        secure : true,
        port : 465,
        auth: {
            user: "amit.ceg.official@gmail.com",
            pass: "ukcu fzpm mgms xhjx"

        }
    });

    const receiver = {
        from : "amit.ceg.official@gmail.com",
        to : "adityapatel9837@gmail.com",
        subject : "Node Js Mail Testing!",
        text : "Hello this is a text mail!"
    };

    auth.sendMail(receiver, (error, emailResponse) => {
        if(error)
        throw error;
        console.log("success!");
        response.end();
    });
    
});

server.listen(8080);