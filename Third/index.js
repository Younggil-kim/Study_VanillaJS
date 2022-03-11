const express = require('express');
const app = express();
// 파일이나 디렉토리 경로 작업 위한 모듈
const path = require("path");
app.use(express.json());

// URL 쿼리 스트링(URL뒤에 ?로 정보오는것) 파싱하는 것.
app.use(express.urlencoded({extended:true}))

app.use(express.static(path.join(__dirname, "src")))

// 루트 폴더 오면 index보여줘라
app.get("/",(req, res) => {
    res.sendFile(path.join(__dirname, "src/index.html"));
})

app.get("/question",(req, res) => {
    res.sendFile(path.join(__dirname, "src/component/question.html"));
})

app.get("/result/[1-5]",(req, res) => {
    res.sendFile(path.join(__dirname, "src/component/result.html"));
})

app.post("/submit", (req, res)=> {
    const data = req.body;
    let numberArr = [0,0,0,0,0];
    for(let i = 1 ; i < 11 ; i++){
        let developerNum = Number(data[`question-${i}`]);
        numberArr[developerNum-1] = numberArr[developerNum-1]+1
    }
    let maxValue = 0
    let maxValueIdx = 0;

    for(let i =0 ; i < numberArr.length; i++){
        if(numberArr[i] > maxValue){
            maxValue = numberArr[i]
            maxValueIdx = i;
        }
    }

    res.redirect("/result/"+(maxValueIdx+1));
})



app.listen(3000, () => {
    console.log("Server running on 3000");
})
