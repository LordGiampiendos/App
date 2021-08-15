import React, {Component} from 'react';
import $ from 'jquery';
import m1 from './ImmaginiWeb/Monopattino1.jpeg';
import m2 from './ImmaginiWeb/Monopattino2.jpg';
import m3 from './ImmaginiWeb/Monopattino3.jpg';
import { Link } from "react-router-dom";

class MonopattiniBND extends Component {

    componentDidMount() {
        $(document).ready(function() {
            $("#myInput").on("keyup", function() {
                var value = $(this).val().toLowerCase();
                $("#myTable tr").filter(function() {
                    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
                    return null
                });
            });
        });
    }
    
    render() {
        return (
            <div id="div2" className="container mt-3">
            <h2>Cerca il veicolo che preferisci:</h2>
            <input className="form-control" id="myInput" type="text" placeholder="Ricerca.."/>
            <br></br>
            <br></br>
            <table className="table table-bordered">
                <tbody id="myTable">
                    <tr>
                        <td><Link to="/prenota10">Monopattino Nero</Link><p>Noleggia a 1€ all'ora</p></td>
                        <td><Link to="/prenota10"><img id="img3" src={m1} alt="Immagine Monopattino"/></Link></td>
                    </tr>
                    <tr>
                        <td><Link to="/prenota11">Monopattino Grigio Scuuro</Link><p>Noleggia a 1€ all'ora</p></td>
                        <td><Link to="/prenota11"><img id="img3" src={m2} alt="Immagine Monopattino"/></Link></td>
                    </tr>      
                    <tr>
                        <td><Link to="/prenota12">Monopattino Bianco</Link><p>Noleggia a 1€ all'ora</p></td>
                        <td><Link to="/prenota12"><img id="img3" src={m3} alt="Immagine Monopattino"/></Link></td>
                    </tr>  
                </tbody>    
            </table>    
        </div>
        )
    }
}

export default MonopattiniBND;