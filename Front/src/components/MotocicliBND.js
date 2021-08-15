import React, {Component} from 'react';
import $ from 'jquery';
import bmw from './ImmaginiWeb/Moto/Bmw s1000rr.jpg';
import vespa from './ImmaginiWeb/Moto/Vespa.jpg';
import kaw from './ImmaginiWeb/Moto/Kawasaki z750.jpg'
import { Link } from "react-router-dom";

class MotocicliBND extends Component {

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
                        <td><Link to="/prenota4">Bmw</Link><p>Noleggia a 7€ all'ora</p></td>
                        <td><Link to="/prenota4"><img id="img3" src={bmw} alt="Immagine Bmw"/></Link></td>
                    </tr>
                    <tr>
                        <td><Link to="/prenota5">Kawasaki</Link><p>Noleggia a 6€ all'ora</p></td>
                        <td><Link to="/prenota5"><img id="img3" src={kaw} alt="Immagine Kawasaki"/></Link></td>
                    </tr>
                    <tr>
                        <td><Link to="/prenota6">Vespa</Link><p>Noleggia a 3,5€ all'ora</p></td>
                        <td><Link to="/prenota6"><img id="img3" src={vespa} alt="Immagine Vespa"/></Link></td>
                    </tr>
                </tbody>    
            </table>    
        </div>
        )
    }
}

export default MotocicliBND;