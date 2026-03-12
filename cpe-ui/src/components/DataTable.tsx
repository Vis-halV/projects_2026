import { useState, useEffect } from "react";
import moment from "moment";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";


interface xmlResType {
    "id": number,
    "cpe_title": string,
    "cpe_22_uri": string,
    "cpe_23_uri": string,
    "reference_links": string[],
    "cpe_22_deprecation_date": Date,
    "cpe_23_deprecation_date": Date
}


export default function DataTable() {

    const[xmldata, setXmlData] = useState<xmlResType[]>([]);

    // response [{"id":1,"cpe_title":"sample title","cpe_22_uri":"sample cpe22 uri","cpe_23_uri":"sample cpe23 uri","reference_links":["sample reference link"],"cpe_22_deprecation_date":"2023-12-31T18:30:00.000Z","cpe_23_deprecation_date":"2024-12-31T18:30:00.000Z"}]

    useEffect(() => {
    fetch("http://localhost:5000/xmldata")
        .then((res) => res.json())
        .then((data) => {
            setXmlData(data); 
        })
        .catch((err) => console.error(err));
    }, []); 

    console.log(xmldata); 


    return(
        <>
            <div className="max-w-7xl mx-auto flex items-center justify-center pt-[2rem]">
                <Table>
                <TableCaption>Parsed data from the xml file.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>cpe_title</TableHead>
                        <TableHead>cpe_22_uri</TableHead>
                        <TableHead>cpe_23_uri</TableHead>
                        <TableHead>reference_links</TableHead>
                        <TableHead>cpe_22_deprecation_date</TableHead>
                        <TableHead>cpe_23_deprecation_date</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {xmldata && xmldata.map((item) => ( 
                        <TableRow key={item.id} > 
                            <TableCell className="line-clamp-1">{item.id}</TableCell>
                            <TableCell className="textWrap truncate">{item.cpe_title}</TableCell>
                            <TableCell className="textWrap truncate">{item.cpe_22_uri}</TableCell>
                            <TableCell className="textWrap truncate">{item.cpe_23_uri}</TableCell>
                            <TableCell>
                                {item.reference_links?.join(", ")} 
                            </TableCell>
                            <TableCell>
                                {item.cpe_22_deprecation_date 
                                    ? moment(item.cpe_22_deprecation_date).format('MM DD, YYYY') 
                                    : 'N/A'}
                            </TableCell>
                            <TableCell>
                                {item.cpe_23_deprecation_date 
                                    ? moment(item.cpe_23_deprecation_date).format('MM DD, YYYY') 
                                    : 'N/A'}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                </Table>
            </div>
        </>
    )
}

