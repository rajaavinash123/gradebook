import React, { useEffect, useRef, useState } from "react";
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { saveAs } from 'file-saver';
import Data from '../Data.json';
import './DisplayData.css'
pdfMake.vfs = pdfFonts.pdfMake.vfs;
const downloadPdf = (jsonData) => {
    const docDefinition = {
        content: [
            { text: 'My JSON data in PDF format', style: 'header' },
            { text: JSON.stringify(jsonData, null, 2), style: 'body' }
        ],
        styles: {
            header: {
                fontSize: 18,
                bold: true,
                margin: [0, 0, 0, 10]
            },
            body: {
                fontSize: 14,
                margin: [0, 0, 0, 10]
            }
        }
    };

    // Generate the PDF document
    const pdfDocGenerator = pdfMake.createPdf(docDefinition);

    // Download the PDF document
    pdfDocGenerator.getBlob((blob) => {
        saveAs(blob, 'my-json-data.pdf');
    });
};

function DisplayData() {
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState("");
    const [updata, setUpdata] = useState([]);
    const [stats,setStats]=useState(false);
    const [check,setCheck]=useState();
    const filtermydata = (res) => {
        setFilter(res);
        // eslint-disable-next-line
        if (res == "all") {
            const mydata = Data.sort((a, b) => (a.Id > b.Id) ? 1 : (a.Id < b.Id) ? -1 : 0);
            // console.log(mydata);
            setUpdata(mydata);
        }
        // eslint-disable-next-line
        else if (res == "pass") {
            setFilter(res);
            setSearch(null);
            const mydata = Data.filter((data) => {
                return res.toLowerCase() === 'all' ? data : data.status.toLowerCase().includes(res);
            });
            setUpdata(mydata);
            console.log(mydata);
        }
        // eslint-disable-next-line
        else if (res == "fail") {
            setSearch(null);
            setFilter(res);
            const mydata = Data.filter((data) => {
                return res.toLowerCase() === 'all' ? data : data.status.toLowerCase().includes(res);
            });
            setUpdata(mydata);
            console.log(mydata);
        }
        // eslint-disable-next-line
        else if (res == "ascA_Z") {
            setFilter(res);
            const mydata = updata.sort((a, b) => (a.Name > b.Name) ? 1 : (a.Name < b.Name) ? -1 : 0);
            // console.log(mydata);
            setUpdata(mydata);
        }
        else if (res == "ascZ_A") {
            setFilter(res);
            const mydata = updata.sort((a, b) => (a.Name > b.Name) ? -1 : (a.Name < b.Name) ? 1 : 0);
            // console.log(mydata);
            setUpdata(mydata);
        }
        // eslint-disable-next-line
        else if (res == "numeric10_1") {
            setFilter(res);
            const mydata = updata.sort((a, b) => (a.Final_Grade > b.Final_Grade) ? -1 : (a.Final_Grade < b.Final_Grade) ? 1 : 0);
            console.log(mydata);
            setUpdata(mydata);
        }
        else if (res == "numeric1_10") {
            setFilter(res);
            const mydata = updata.sort((a, b) => (a.Final_Grade > b.Final_Grade) ? 1 : (a.Final_Grade < b.Final_Grade) ? -1 : 0);
            console.log(mydata);
            setUpdata(mydata);
        }
    }

    //max,min values getting from the json file
    var max=Data.reduce((max,current)=>{
        return (current.Final_Grade>max.Final_Grade)?current:max;
    })
    var min=Data.reduce((min,current)=>{
        return (current.Final_Grade<max.Final_Grade)?current:min;
    })
    var total=0;
    var avg=Data.forEach((element,index)=>{
        total=total+element.Final_Grade;
    })
    let passcnt=0;
    let failcnt=0;
    var fg0_6=0;
    var fg=Data.forEach((element,index)=>{
        if(element.Final_Grade>0 && element.Final_Grade<=7){
            fg0_6++;
        }
        if(element.status=="pass"){
            passcnt++;
        }
        if(element.status.toLowerCase()=="fail"){
            failcnt++;
        }
    })
    var fg6_7=0;
    var fg=Data.forEach((element,index)=>{
        if(element.Final_Grade>6 && element.Final_Grade<=7){
            fg6_7++;
        }
    })
    var fg7_8=0;
    var fg=Data.forEach((element,index)=>{
        if(element.Final_Grade>7 && element.Final_Grade<=8){
            fg7_8++;
        }
    })
    var fgg8=0;
    var fg=Data.forEach((element,index)=>{
        if(element.Final_Grade>8){
            fgg8++;
        }
    })

    const downloadmydata = () => {
        if (updata.length > 0) {
            downloadPdf(updata);
        }
        else {
            downloadPdf(Data);
        }

    }
    const trail=()=>{
        console.log("working");
    }
    useEffect(()=>{
        filtermydata(check);
    },[check]);

    const Details=(val)=>{
        const value=Data.filter((data)=>{
            return data.Id==val;
        })
        let show=`Email: ${value[0].Email} \n PhoneNum: ${value[0].Phone_Number}`;
        alert(show);
    }
    return (
        <>
            <div className="filterbtns">
                <button type='button' id='sort' onClick={() => filtermydata("all")}>All</button>
                <button type='button' id='sort' onClick={() => filtermydata("pass")}>Passed</button>
                <button type='button' id='sort' onClick={() => filtermydata("fail")}>Fail</button>
                <select onChange={(e)=>setCheck(e.target.value)}>
                    <option value="ascA_Z">
                        <button type='button' id='sort' onClick={() => filtermydata("asc")}>A-Z</button></option>
                    <option value="ascZ_A">
                        <button type='button' id='sort' onClick={() => filtermydata("asc")}>Z-A</button></option>
                </select>
                <select onChange={(e)=>setCheck(e.target.value)} >
                    <option value="numeric1_10" onClick={()=>console.log("check")}>
                    <button type='button' id='sort'>1-10</button>
                    </option>
                    <option value="numeric10_1">
                    <button type='button' id='sort'>10-1</button>
                    </option>
                </select>
            </div>
            <br></br>
            <form>
                <input type="text" onChange={(e) => setSearch(e.target.value)} placeholder="Search By Name...." />
            </form>
            <br /><br />
            <div>
                <div style={{ width: '100%' }}>
                    <table>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Tickets-Number</th>
                            <th>Topic</th>
                            <th>Exam</th>
                            <th>Rating-Grade</th>
                            <th>Final-Grade</th>
                            <th>status</th>
                            <th>Details</th>
                        </tr>
                        {
                            search == null && updata.length > 0 ? updata.map((data,index) => {
                                return (
                                    <>
                                        <tr>
                                            <td>{data.Id}</td>
                                            <td>{data.Name}</td>
                                            <td>{data.Ticket_Number}</td>
                                            <td>{data.Ticket_Topic}</td>
                                            <td>{data.Exam_Grade}</td>
                                            <td>{data.Rating_Grade}</td>
                                            <td>{data.Final_Grade}</td>
                                            <td>{data.status}</td>
                                            <td onClick={()=>Details(data.Id)}><button>details</button></td>
                                        </tr>
                                    
                                    </>
                                )
                            })
                                : Data.filter((data) => {
                                    return search.toLowerCase() === '' ? data : data.Name.toLowerCase().includes(search)
                                    }).map((data,index) => {
                                    return (
                                        <>
                                            <tr>
                                                <td>{data.Id}</td>
                                                <td>{data.Name}</td>
                                                <td>{data.Ticket_Number}</td>
                                                <td>{data.Ticket_Topic}</td>
                                                <td>{data.Exam_Grade}</td>
                                                <td>{data.Rating_Grade}</td>
                                                <td>{data.Final_Grade}</td>
                                                <td>{data.status}</td>
                                                <td onClick={()=>Details(data.Id)}><button>details</button></td>
                                            </tr>
                                        </>
                                        
                                    )
                                })
                        }
                    </table>
                </div>
            </div>
            <div className="tablebtns">
                        <button onClick={() => downloadmydata()}>Download PDF</button>
                        <button onClick={()=>setStats(!stats)}>show stats</button>
                        </div> <br />
            {stats?<table>
                <th>Status</th>
                <th>Count</th>
                <tr>
                    <td>Total no of students</td>
                    <td>{Data.length}</td>
                </tr>
                <tr>
                    <td>No of students passed</td>
                    <td>{passcnt}</td>
                </tr>
                <tr>
                    <td>No of students failed</td>
                    <td>{failcnt}</td>
                </tr>
                <tr>
                    <td>Average of all</td>
                    <td>{total/20}</td>
                </tr>
                <tr>
                    <td>Max of all</td>
                    <td>{max.Final_Grade}</td>
                </tr>
                <tr>
                    <td>Min of all</td>
                    <td>{min.Final_Grade}</td>
                </tr>
                <tr>
                    <td>Final Grade 0-6</td>
                    <td>{fg0_6}</td>
                </tr>
                <tr>
                    <td>Final Grade 6-7</td>
                    <td>{fg6_7}</td>
                </tr>
                <tr>
                    <td>Final Grade 7-8</td>
                    <td>{fg7_8}</td>
                </tr>
                <tr>
                    <td>All Grades greater than 8</td>
                    <td>{fgg8}</td>
                </tr>
            </table>:""
}
        </>
    )
}
export default DisplayData;

