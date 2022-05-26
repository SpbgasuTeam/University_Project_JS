
import express from 'express'
import cors from 'cors';
import {v4 as uuidv4} from 'uuid';
import * as fs from "fs";
const app = express();
app.use(cors());

function Add_json_DT(New_Json){

    var Data_B = fs.readFileSync('Server/DT_users.json','utf8');
    var Buf=JSON.parse(Data_B);
    //console.log(Buf)
    Buf.push(New_Json);

    fs.writeFile('Server/DT_users.json',JSON.stringify(Buf),(err)=>{
        if(err) console.log('Error');
    });
}
function Create_Dialog(Users){

    let dataM = JSON.parse(fs.readFileSync("Server/DT_Mail.json", "utf8"));
    //let Buf=JSON.parse(dataM);
    //console.log(dataM)
    dataM.push(Users);
    //console.log(JSON.stringify(dataM))

    fs.writeFile('Server/DT_Mail.json',JSON.stringify(dataM),(err)=>{
        if(err) console.log('Error');
    });
}
app.post("/Register", (req, res) => {
    req.on('data', requestBody => {
        const body = JSON.parse(requestBody.toString());
        const data = JSON.parse(fs.readFileSync("Server/DT_users.json", "utf8")) || {};

        var check = 0;
        data.forEach(element => {
            if (body.ID == element.ID) {
                check = 1;
            }
        })
        if (check == 1) {
            res.send(JSON.stringify("Bad_ID"))
        } else {
            //console.log(body);
            Add_json_DT(body);
            res.send(JSON.stringify("Reg_ok"));
        }
    })
});
app.post("/New_MSG", (req, res) => {
    req.on('data', requestBody => {
        const body = JSON.parse(requestBody);
        //console.log(JSON.parse(requestBody));
        let data = JSON.parse(fs.readFileSync("Server/DT_Mail.json", "utf8")) || {};
        const buf ={
            "ID_Sender":0,
            "Text":"",
            "Time":"24.05.2022"
        }

        //console.log(data);

        buf.ID_Sender =  body.ID_Sender;
        buf.Text = body.Text;
        buf.Time = body.Time;

        //console.log(buf);

        data.forEach(element => {
            if ((body.ID_Sender == element.ID[0] && body.ID_Getter == element.ID[1]) || (body.ID_Sender == element.ID[1] && body.ID_Getter == element.ID[0])) {
                element.All_Msg.push(buf)
            }
        })

        //onsole.log(data);

        fs.writeFile('Server/DT_Mail.json',JSON.stringify(data),(err)=>{
            if(err) console.log('Error');
        });

        res.send(JSON.stringify('Save'));
    })
})
app.post("/Login", (req, res) => {
    req.on('data', requestBody => {
        const body = JSON.parse(requestBody);
        const data = JSON.parse(fs.readFileSync("Server/DT_users.json", "utf-8"));
        var check=0;

        data.forEach(element => {
            if (body.ID == element.ID && body.Password == element.Password) {
                check = 1;
            }
        })

        if(check == 0){
            res.send(JSON.stringify("BAD_data"));
        }else{
            res.send(JSON.stringify("Good"));
        }
    })
})
app.post("/New_Dialog", (req, res) => {
    req.on('data', requestBody => {
        const body = JSON.parse(requestBody);
        const users = JSON.parse(fs.readFileSync(`Server/DT_users.json`, "utf-8"));
        let data  = JSON.parse(fs.readFileSync(`Server/DT_Mail.json`, "utf-8"));

        const buf = {"ID":[body.ID_Sender,body.ID_Getter],"All_Msg":[]}
        let check=0;
        let check2=0;
        //console.log((body.ID_Sender))
        //console.log((body.ID_Getter))
        users.forEach(element => {
            if (body.ID_Getter == element.ID) { check = 1;}
        });

        //console.log((data));

        if (check == 1) {
            data.forEach(element2 => {
                if ((body.ID_Sender == element2.ID[0] && body.ID_Getter == element2.ID[1]) || (body.ID_Sender == element2.ID[1] && body.ID_Getter == element2.ID[0])){
                    //res.send(JSON.stringify("Error!"));
                    check2=1;
                }else{
                    //check2=1;
                }
            });

            if(check2){
                res.send(JSON.stringify("Error!"));
            }else{
                Create_Dialog(buf);
                res.send(body.ID_Getter)
            }

        } else {
            res.send(JSON.stringify("Wrong_ID!"));
        }

    })
})
app.post("/Read", (req, res) => {
    req.on('data', requestBody => {
        const body = JSON.parse(requestBody.toString());
        const data = JSON.parse(fs.readFileSync(`Server/DT_Mail.json`, "utf-8"));
        let buf =[{
            "Sender":0,
            "Text":"",
            "Time":""
        }];
        data.forEach(element => {
            if ((body.ID_Sender == element.ID[0] && body.ID_Getter == element.ID[1]) || (body.ID_Sender == element.ID[1] && body.ID_Getter == element.ID[0])) {
                buf = element.All_Msg;
            }
        })
        res.send(buf);
    })
})
app.post("/Forgot", (req, res) => {
    req.on('data', requestBody => {
        const body = JSON.parse(requestBody.toString());
        const data = JSON.parse(fs.readFileSync("Server/DT_users.json", "utf-8"));
        let check=0;
        data.forEach(element => {
            if (body.ID==element.ID) {
                res.send(element.Password);
                check=1;
            }
        })
        if( check==0 ){res.send('BAD_ID');}

    })
})
app.post("/Get_Dialogs", (req, res) => {
    req.on('data', requestBody => {
        const body = JSON.parse(requestBody.toString());
        const data = JSON.parse(fs.readFileSync("Server/DT_Mail.json", "utf-8"));

        let buf=[];
        data.forEach(element => {

            if (body.My_ID == element.ID[0]){
                buf.push({"ID_Sender":element.ID[0],"ID_Getter":element.ID[1]})

            }
            else if(body.My_ID == element.ID[1]){
                buf.push({"ID_Sender":element.ID[1],"ID_Getter":element.ID[0]})
            }
        })
        buf.delete;
        res.send(buf);
    })
})
app.post("/Get_list_users", (req, res) => {
    req.on('data', requestBody => {
        //const body = JSON.parse(requestBody.toString());
        const data = JSON.parse(fs.readFileSync("Server/DT_users.json", "utf-8"));

        let buf=[];
        data.forEach(element => {
            buf.push(element.ID);

        })
        //buf.delete
        res.send(buf);
    })
})
app.listen(80)