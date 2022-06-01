import React, { useEffect, useState } from "react";
import Plot from 'react-plotly.js';

function Grafica() {
    const [graph, setGraph] = useState();
    const [layout, setLayout] = useState();
    const [st_id, setId] = useState(0);

    const opts = ['BHU', 'JNU', 'DU']
    // Function to collect data
    const getApiData = async () => {
        const response = await fetch(
        "http://localhost:8080/graph-pure-plotly/"+st_id.toString()
        ).then((response) => response.json());
        setGraph(response.data);
        setLayout(response.layout);
    };

    useEffect(() => {
        getApiData();
    }, [st_id]); 

    function handleClick(e) {
        setId(e.target.value);
    }

    return (
        <div className="graph-comp" >
            <div className="graph-setts">
                <select onChange={(e) => handleClick(e)}>{
                    opts.map( (x,y) => 
                    <option key={y}  value={y}>{x}</option> )
                }</select>
            </div>
            <div className="graph-plotly">
                <Plot data={graph} layout={layout}></Plot>
            </div>
        </div>
    );
}

export default Grafica;