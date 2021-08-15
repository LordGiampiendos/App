import React, {Component} from 'react';
import $ from 'jquery';
import panda from './ImmaginiWeb/Automobili/Panda.jpg';
import lambo from './ImmaginiWeb/Automobili/LamborghiniHuracane.jpg';
import audi from './ImmaginiWeb/Automobili/Audi A3.jpg';
import { Link } from "react-router-dom";

class AutomobiliBND extends Component {

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
                        <td><Link to="/prenota1">Lamborghini Huracane</Link><p>Noleggia a 9€ all'ora</p></td>
                        <td><Link to="/prenota1"><img id="img3" src={lambo} alt="Immagine Lamborghini"/></Link></td>
                    </tr>
                    <tr>
                        <td><Link to="/prenota2">Audi A3</Link><p>Noleggia a 7,5€ all'ora</p></td>
                        <td><Link to="/prenota2"><img id="img3" src={audi} alt="Immagine Audi"/></Link></td>
                    </tr>
                    <tr>
                        <td><Link to="/prenota3">Panda</Link><p>Noleggia a 5€ all'ora</p></td>
                        <td><Link to="/prenota3"><img id="img3" src={panda} alt="Immagine Panda"/></Link></td>
                    </tr>
                </tbody>    
            </table>    
        </div>
        )
    }
}

export default AutomobiliBND;