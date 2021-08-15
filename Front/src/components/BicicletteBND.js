import React, {Component} from 'react';
import $ from 'jquery';
import bc from './ImmaginiWeb/Biciclette/Bici da Corsa.jpg';
import mb from './ImmaginiWeb/Biciclette/Mountain Bike.jpg';
import bp from './ImmaginiWeb/Biciclette/Bici da Passeggio.jpg';
import { Link } from "react-router-dom";

class BicicletteBND extends Component {

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
                        <td><Link to="/prenota7">Bici da Corsa</Link><p>Noleggia a 3€ all'ora</p></td>
                        <td><Link to="/prenota7"><img id="img3" src={bc} alt="Immagine Bici da corsa"/></Link></td>
                    </tr>
                    <tr>
                        <td><Link to="/prenota8">Mountain Bike</Link><p>Noleggia a 2,5€ all'ora</p></td>
                        <td><Link to="/prenota8"><img id="img3" src={mb} alt="Immagine Mountain bike"/></Link></td>
                    </tr>
                    <tr>
                        <td><Link to="/prenota9">Bici da Passeggio</Link><p>Noleggia a 2€ all'ora</p></td>
                        <td><Link to="/prenota9"><img id="img3" src={bp} alt="Immagine Bici da passeggio"/></Link></td>
                    </tr>
                </tbody>    
            </table>    
        </div>
        )
    }
}

export default BicicletteBND;