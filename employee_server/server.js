import express from 'express';
const app = express();
import fetch from 'node-fetch';
import base64 from 'base-64';
import xml2js from 'xml2js';
import body_parser from 'body-parser';
import cors from 'cors';
import date from 'date-and-time';

app.use(body_parser.urlencoded({ extended: true }));

app.use(body_parser.json());

//  // For pipo cred
const username = "pouser@2"
const password = "Tech@2022"

app.use(cors({
    origin: ["http://localhost:4200"]
}));

const PORT = process.env.PORT || 3060;

var server_username;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.post('/login', async (req, res) => {
    console.log(req.body);
    server_username = req.body.uname;
    var req_url = "http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_RUTHU_EMP_LOGIN&receiverParty=&receiverService=&interface=SI_RUTHU_EMP_LOGIN&interfaceNamespace=http://ruthu_emp.com";
    var req_xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
                        <soapenv:Header/>
                        <soapenv:Body>
                        <urn:ZRUTHU_EP_LOGIN_FM>
                            <EMPLOYEE_ID>${server_username}</EMPLOYEE_ID>
                            <PASSWORD>${req.body.password}</PASSWORD>
                            <EMP_PROFILE>
                    
                            </EMP_PROFILE>
                        </urn:ZRUTHU_EP_LOGIN_FM>
                        </soapenv:Body>
                    </soapenv:Envelope>`

    const login_res = await fetch(req_url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'include',
        headers: {
            'Content-Type': 'text/xml',
            'Authorization': 'Basic ' + base64.encode(username + ':' + password)
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: req_xml
    }).then(res => res.text())

    xml2js.parseString(login_res, (err, data) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log(data);
            var out_data = data['SOAP:Envelope']['SOAP:Body'][0]['rfc:ZRUTHU_EP_LOGIN_FM.Response'][0]['MESSAGE']
            console.log(out_data);
            res.send(out_data);
        }
    });
});



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


app.post('/profile', async (req, res) => {
    var req_url = "http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_RUTHU_EMP_PROFILE&receiverParty=&receiverService=&interface=SI_RUTHU_EMP_PROFILE&interfaceNamespace=http://ruthu_emp.com";
    var req_xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
                        <soapenv:Header/>
                        <soapenv:Body>
                        <urn:ZRUTHU_EP_PROFILE_FM>
                            <EMPLOYEE_ID>${server_username}</EMPLOYEE_ID>
                            <COMPANY>

                            </COMPANY>
                            <COMPANY_ADDRESS>

                            </COMPANY_ADDRESS>
                        </urn:ZRUTHU_EP_PROFILE_FM>
                        </soapenv:Body>
                    </soapenv:Envelope>`

    const profile_res = await fetch(req_url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'include',
        headers: {
            'Content-Type': 'text/xml',
            'Authorization': 'Basic ' + base64.encode(username + ':' + password)
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: req_xml
    }).then(res => res.text())

    xml2js.parseString(profile_res, (err, data) => {
        if (err) {
            console.log(err);
        }
        else {
            var employee_profile = data['SOAP:Envelope']['SOAP:Body'][0]['rfc:ZRUTHU_EP_PROFILE_FM.Response'][0]['EMPLOYEE_PROFILE']
            var company = data['SOAP:Envelope']['SOAP:Body'][0]['rfc:ZRUTHU_EP_PROFILE_FM.Response'][0]['COMPANY'][0]['item']

                company.forEach(function (table) {

                    /////////////   Preceeding 0's    ////////////////
                    Object.entries(table).forEach(([key, value]) => {
                        table[key] = String(table[key]).replace(/^0+/, "");
                    });

                    /////////////   Empty replace    /////////////////
                    Object.entries(table).forEach(([key, value]) => {
                        if (value == "" || value == null) {
                            table[key] = "TBA";
                        }
                    });
                });

                employee_profile.forEach(function (table) {

                    /////////////   Preceeding 0's    ////////////////
                    Object.entries(table).forEach(([key, value]) => {
                        table[key] = String(table[key]).replace(/^0+/, "");
                    });

                    /////////////   Empty replace    /////////////////
                    Object.entries(table).forEach(([key, value]) => {
                        if (value == "" || value == null) {
                            table[key] = "TBA";
                        }
                    });
                });

                /////////////////   DATE    /////////////////////
                employee_profile.forEach(function (table) {
                    Object.entries(table).forEach(([key, value]) => {
                        if (key == 'BEGDA' || key == 'ENDDA') {
                            if (table[key] == "-00-00" || table[key] == "") {
                                table[key] = "TBA"
                            }
                            else {
                                const now = new Date(table[key]);
                                table[key] = date.format(now, 'DD-MM-YYYY');
                            }
                        }
                    })
                });

            var out_data = [employee_profile, company]
            // console.log(out_data[0]);
            // console.log(out_data[1]);
            res.send(out_data);
        }
    });
});


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


app.post('/leave-request', async (req, res) => {
    var req_url = "http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_RUTHU_EMP_LEAVE_REQUEST&receiverParty=&receiverService=&interface=SI_RUTHU_EMP_LEAVE_REQUEST&interfaceNamespace=http://ruthu_emp.com";
    var req_xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
                        <soapenv:Header/>
                        <soapenv:Body>
                        <urn:ZRUTHU_EP_LEAVE_REQUEST_FM>
                            <EMPLOYEE_ID>${server_username}</EMPLOYEE_ID>
                            <LEAVE_TAB>
                                
                            </LEAVE_TAB>
                        </urn:ZRUTHU_EP_LEAVE_REQUEST_FM>
                        </soapenv:Body>
                    </soapenv:Envelope>`

    const invoice_res = await fetch(req_url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'include',
        headers: {
            'Content-Type': 'text/xml',
            'Authorization': 'Basic ' + base64.encode(username + ':' + password)
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: req_xml
    }).then(res => res.text())

    xml2js.parseString(invoice_res, (err, data) => {
        if (err) {
            console.log(err);
        }
        else {
            var out_data = data['SOAP:Envelope']['SOAP:Body'][0]['rfc:ZRUTHU_EP_LEAVE_REQUEST_FM.Response'][0]['LEAVE_TAB'][0]['item']

            if (out_data == null) {
                console.log("emptyyyyyyyyyy")
            }
            else {
                out_data.forEach(function (table) {

                    /////////////   Preceeding 0's    ////////////////
                    Object.entries(table).forEach(([key, value]) => {
                        table[key] = String(table[key]).replace(/^0+/, "");
                    });

                    /////////////   Empty replace    /////////////////
                    Object.entries(table).forEach(([key, value]) => {
                        if (value == "" || value == null) {
                            table[key] = "TBA";
                        }
                    });
                });

                /////////////////   DATE    /////////////////////
                out_data.forEach(function (table) {
                    Object.entries(table).forEach(([key, value]) => {
                        if (key == 'VALIDEND' || key == 'VALIDBEGIN') {
                            if (table[key] == "-00-00" || table[key] == "") {
                                table[key] = "TBA"
                            }
                            else {
                                const now = new Date(table[key]);
                                table[key] = date.format(now, 'DD-MM-YYYY');
                            }
                        }
                    })
                });
            }
            // console.log(out_data);
            res.send(out_data);
        }
    });
});


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


app.post('/payslip', async (req, res) => {
    var req_url = "http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_RUTHU_EMP_PAYSLIP&receiverParty=&receiverService=&interface=SI_RUTHU_EMP_PAYSLIP&interfaceNamespace=http://ruthu_emp.com";
    var req_xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
                        <soapenv:Header/>
                        <soapenv:Body>
                        <urn:ZRUTHU_EP_PAYSLIP_FM>
                            <EMPLOYEE_ID>${server_username}</EMPLOYEE_ID>
                            <PAYSLIP_TAB>

                            </PAYSLIP_TAB>
                        </urn:ZRUTHU_EP_PAYSLIP_FM>
                        </soapenv:Body>
                    </soapenv:Envelope>`

    const po_res = await fetch(req_url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'include',
        headers: {
            'Content-Type': 'text/xml',
            'Authorization': 'Basic ' + base64.encode(username + ':' + password)
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: req_xml
    }).then(res => res.text())

    xml2js.parseString(po_res, (err, data) => {
        if (err) {
            console.log(err);
        }
        else {
            var out_data = data['SOAP:Envelope']['SOAP:Body'][0]['rfc:ZRUTHU_EP_PAYSLIP_FM.Response'][0]['PAYSLIP_TAB'][0]['item']

            if (out_data == null) {
                console.log("emptyyyyyyyyyy")
            }
            else {
                out_data.forEach(function (table) {

                    /////////////   Preceeding 0's    ////////////////
                    Object.entries(table).forEach(([key, value]) => {
                        table[key] = String(table[key]).replace(/^0+/, "");
                    });

                    /////////////   Empty replace    /////////////////
                    Object.entries(table).forEach(([key, value]) => {
                        if (value == "" || value == null) {
                            table[key] = "TBA";
                        }
                    });
                });

                /////////////////   DATE    /////////////////////
                out_data.forEach(function (table) {
                    Object.entries(table).forEach(([key, value]) => {
                        if (key == 'FPBEGIN' || key == 'FPEND' || key == 'BONUSDATE'
                            || key == 'PAYDATE') {
                            if (table[key] == "-00-00" || table[key] == "") {
                                table[key] = "TBA"
                            }
                            else {
                                const now = new Date(table[key]);
                                table[key] = date.format(now, 'DD-MM-YYYY');
                            }
                        }
                    })
                });
            }
            // console.log(out_data);
            res.send(out_data);
        }
    });
});


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


app.post('/payslip-pdf', async (req, res) => {
    var req_url = "";
    var req_xml = ``

    const rfq_res = await fetch(req_url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'include',
        headers: {
            'Content-Type': 'text/xml',
            'Authorization': 'Basic ' + base64.encode(username + ':' + password)
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: req_xml
    }).then(res => res.text())

    xml2js.parseString(rfq_res, (err, data) => {
        if (err) {
            console.log(err);
        }
        else {
            var out_data = data['SOAP:Envelope']['SOAP:Body'][0]['rfc:ZRUTHU_EMP_PAYSLIP_PDF_FM.Response']

            if (out_data == null) {
                console.log("emptyyyyyyyyyy")
            }
            else {
                out_data.forEach(function (table) {

                    /////////////   Preceeding 0's    ////////////////
                    Object.entries(table).forEach(([key, value]) => {
                        table[key] = String(table[key]).replace(/^0+/, "");
                    });

                    /////////////   Empty replace    /////////////////
                    Object.entries(table).forEach(([key, value]) => {
                        if (value == "" || value == null) {
                            table[key] = "TBA";
                        }
                    });
                });

                /////////////////   DATE    /////////////////////
                out_data.forEach(function (table) {
                    Object.entries(table).forEach(([key, value]) => {
                        if (key == 'ERDAT' || key == 'ANGDT' || key == 'BNDDT'
                            || key == 'AUDAT' || key == 'VDATU') {
                            if (table[key] == "-00-00" || table[key] == "") {
                                table[key] = "TBA"
                            }
                            else {
                                const now = new Date(table[key]);
                                table[key] = date.format(now, 'DD-MM-YYYY');
                            }
                        }
                    })
                });
            }
            // console.log(out_data);
            res.send(out_data);
        }
    });
});


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


app.listen(PORT, () => {
    console.log("server listening on 3060");
});