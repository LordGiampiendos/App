import React, {Component} from 'react';
import $ from 'jquery';
import panda from './ImmaginiWeb/Automobili/Panda.jpg';
import lambo from './ImmaginiWeb/Automobili/LamborghiniHuracane.jpg';
import audi from './ImmaginiWeb/Automobili/Audi A3.jpg';
import bmw from './ImmaginiWeb/Moto/Bmw s1000rr.jpg';
import vespa from './ImmaginiWeb/Moto/Vespa.jpg';
import kaw from './ImmaginiWeb/Moto/Kawasaki z750.jpg'
import bc from './ImmaginiWeb/Biciclette/Bici da Corsa.jpg';
import mb from './ImmaginiWeb/Biciclette/Mountain Bike.jpg';
import bp from './ImmaginiWeb/Biciclette/Bici da Passeggio.jpg';
import m1 from './ImmaginiWeb/Monopattino1.jpeg';
import m2 from './ImmaginiWeb/Monopattino2.jpg';
import m3 from './ImmaginiWeb/Monopattino3.jpg';
import { Link } from "react-router-dom";

class VeicoliBND extends Component {

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
                    <tr>
                        <td><Link to="/prenota10">Monopattino Nero</Link><p>Noleggia a 1€ all'ora</p></td>
                        <td><Link to="/prenota10"><img id="img3" src={m1} alt="Immagine Monopattino"/></Link></td>
                    </tr>
                    <tr>
                        <td><Link to="/prenota11">Monopattino Grigio Scuro</Link><p>Noleggia a 1€ all'ora</p></td>
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

export default VeicoliBND;