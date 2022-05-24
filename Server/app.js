
import express from 'express'
import cors from 'cors';
import {v4 as uuidv4} from 'uuid';
import * as fs from "fs";


const app = express();
app.use(cors());


app.post("/login", (req, res) => {
    req.on('data', requestBody => {
        const body = JSON.parse(requestBody.toString());
        const data = JSON.parse(fs.readFileSync("./users.json", "utf-8"))[body.id];
        if (!data) {
            res.send(JSON.stringify("Error id"));
        } else {
            if (data.password !== body.password) {
                res.send(JSON.stringify("Error password"));
            } else {
                const messages = JSON.parse(fs.readFileSync(`${body.id}.json`, "utf-8"));
                res.send(JSON.stringify(messages));
            }
        }
    })
})

function Add_json_DT(New_Json){

    var Data_B = fs.readFileSync('Server/DT_users.json','utf8');
    var Buf=JSON.parse(Data_B);

    Buf.push(New_Json);

    fs.writeFile('Server/DT_users.json',JSON.stringify(Buf),(err)=>{
        if(err) console.log('Error');
    });
}

app.post("/Register", (req, res) => {
    req.on('data', requestBody => {
        const body = JSON.parse(requestBody.toString());
        //console.log(JSON.parse(requestBody.toString()));
        const data = JSON.parse(fs.readFileSync("server/DT_users.json", "utf8")) || {};

        var check = 0;
        data.forEach(element => {
            if (body.ID == element.ID) {
                check = 1;
            }
        })
        if (check == 1) {
            res.send(JSON.stringify("Bad_ID"))
        } else {
            console.log(body);
            Add_json_DT(body);
            //fs.writeFileSync(`./${body.id}.json`, JSON.stringify([]));
            //fs.writeFileSync(`./users.json`, JSON.stringify(data));
            res.send(JSON.stringify("Reg_ok"));
        }
    })
});

app.put("/new_message", (req, res) => {
    req.on('data', requestBody => {
        const body = JSON.parse(requestBody.toString());
        const users = JSON.parse(fs.readFileSync(`./users.json`, "utf-8"));
        console.log(users[body.recipient])
        if (users[body.recipient]) {
            const data = JSON.parse(fs.readFileSync(`${body.recipient}.json`, "utf-8"));
            body.check = false;
            body.sender = users[body.id].name;
            body.ui = uuidv4();
            data.unshift(body);
            fs.writeFileSync(`${body.recipient}.json`, JSON.stringify(data));
            res.send();
        } else {
            res.send(JSON.stringify("User 404"));
        }
    })
})

app.post("/messages", (req, res) => {
    req.on('data', requestBody => {
        const body = JSON.parse(requestBody.toString());
        console.log(JSON.parse(requestBody.toString()));

        const data = JSON.parse(fs.readFileSync(`${body.id}.json`, "utf-8"));
        console.log(data);
        res.send(JSON.stringify(data));
    })
})

app.post("/read", (req, res) => {
    req.on('data', requestBody => {
        const body = JSON.parse(requestBody.toString());
        const data = JSON.parse(fs.readFileSync(`${body.id}.json`, "utf-8"));
        for (let i = 0; i < data.length; i++) {
            if (data[i].ui === body.ui) {
                data[i].check = true;
            }
        }
        fs.writeFileSync(`${body.id}.json`, JSON.stringify(data));
        res.send();
    })
})

app.delete("/del_message", (req, res) => {
    req.on('data', requestBody => {
        const body = JSON.parse(requestBody.toString());

        const data = JSON.parse(fs.readFileSync(`${body.id}.json`, "utf-8"));
        const newData = data.filter(e => e.ui !== body.ui)
        console.log(newData);
        fs.writeFileSync(`${body.id}.json`, JSON.stringify(newData));
        res.send();
    })
})

app.delete("/delete_all", (req, res) => {
    req.on('data', requestBody => {
        const body = JSON.parse(requestBody.toString());
        fs.writeFileSync(`${body.id}.json`, JSON.stringify([]));
        res.send();
    })
})

app.listen(80)