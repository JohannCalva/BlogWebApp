import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
var posts = [];

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

function Post(title, author, content){
    this.title = title;
    this.author = author;
    this.content = content;
}

app.get("/", (req, res) => {
    res.render("index.ejs", {postsPublished: posts});
});

app.get("/new", (req, res) => {
    res.render("new-post.ejs");
});

app.post("/submit", (req, res) => {
    const newPost = new Post(req.body["title"], req.body["author"], req.body["content"]);
    posts.push(newPost);
    res.redirect("/");
});

app.post("/delete", (req, res) => {
    const postIndex = req.body["postIndex"];
    if(postIndex !== undefined && postIndex < posts.length){
        posts.splice(postIndex, 1);
    }
    res.redirect("/");
});

app.get("/edit", (req, res) => {
    const postIndex = req.query.postIndex;
    if(postIndex >= 0 && postIndex < posts.length) {
        const post = posts[postIndex];
        res.render("edit-form.ejs",{
            post,
            postIndex
        });
    }else{
        res.redirect("/");
    }
    
});

app.post("/save", (req, res) => {
    const postIndex = req.body["postIndex"];
    if(postIndex >= 0 && postIndex < posts.length) {
        posts[postIndex] = new Post(req.body["title"], req.body["author"], req.body["content"]);
    }
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});