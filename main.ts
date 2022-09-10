import express from "express";
import { createServer } from "http";
import cors from "cors";
import helmet from "helmet";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// serve ejs files
app.set("view engine", "ejs");
app.set("views", "views");

const httpServer = createServer(app);

// Router
app.get("/", (req, res, next) => {
    res.render("home");
});

app.get("/sign-up", (req, res, next) => {
    res.render("sign-up");
});

app.get("/services", (req, res, next) => {
    res.render("services");
});

app.get("/about", (req, res, next) => {
    res.redirect(
        "https://github.com/ScarletAIO/API#mission"
    );
});

app.get("/contact", (req, res, next) => {
    res.render("support");
});

httpServer.listen(3000, () => {
    console.log("listening on *:3000");
});

function analyzeDemo(msg: string) {
    fetch("https://api.scarletai.xyz/v3/analyze/msg", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer null",
                "X-Scarlet-Origin": "Landing-Demo-Input"
            },
            body: JSON.stringify({
                "message": msg
            })
        }).then((res: Response) => {
            return res.json();
        }).then((data: any) => {
            console.info(`Received ScarletAI Response: ${JSON.stringify(data)}`);
            // Send to client
            data = JSON.stringify(data);
            return data;
        }).catch((err: any | unknown) => {
            console.error(err);
            return err;
        });
}