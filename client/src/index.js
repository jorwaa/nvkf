//import { application } from 'express';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class FormRoot extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imp_name: "",
            numProducts: 1,
            data: {},
            products: [0],
            submitTxt: 'Send inn'
        };

        //Event handlers:
        this.getData = this.getData.bind(this);
        this.addProduct = this.addProduct.bind(this);
        this.inputChanged = this.inputChanged.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.sendProductData = this.sendProductData.bind(this);
        this.getPostResponse = this.getPostResponse.bind(this);
        this.renderProductList = this.renderProductList.bind(this);
        this.awaitPostResponse = this.awaitPostResponse.bind(this);
        this.renderImporterInfo = this.renderImporterInfo.bind(this);
        this.renderSingleProduct = this.renderSingleProduct.bind(this);
    }

    render() {
        return (
        <div className='form'>
            <form id='scheme' onSubmit={this.handleSubmit}>
                <div className='info'>
                    <h1>Registreringsskjema for vinsmaking</h1>
                    <hr></hr>
                    <p><b>Merk: </b> Denne nettsiden støttes ikke av Internet Explorer.</p>
                    <p>Ved bruk av denne nettleseren, fyll heller inn skjemaet du
                        <a href="https://docs.google.com/forms/d/e/1FAIpQLSccVTMiwCyowU5nPCGWjisLBgpgnaf43VoEg7ULE4FUMOXGJQ/viewform?vc=0&c=0&w=1"> finner her. </a>
                    </p>
                    <p> Skriv inn info om {"vin"}!</p>
                    <p>{this.state.imp_name}</p>
                </div>
                {this.renderImporterInfo()}
                {this.renderProductList()}
            </form>
        </div>
        );
    }

    renderImporterInfo() {
        return (
            <div id="importerInfo">
                <label htmlFor="navn">Importør: *</label>
                <br></br>
                <input id="navn" name="navn" type="text" onChange={evt => this.setState({imp_name: evt.target.value})} required></input>
                <br></br>
                <label htmlFor="kontakt">Kontaktperson hos importør, navn: <span className="req"> * </span> </label>
                <br></br>
                <input name="kontakt" type="text" onChange={evt => this.setState({imp_kontakt: evt.target.value})} required id="kontakt"></input>
                <br></br>
                <label htmlFor="epost">E-post til kontaktperson: <span className="req"> * </span> </label>
                <br></br>
                <input name="epost" type="email" onChange={evt => this.setState({imp_mail: evt.target.value})} required id="epost"></input>
                <br></br>
                <label htmlFor="tlf">Telefonnummer til kontaktperson: <span className="req"> * </span> </label>
                <br></br>
                <input name="tlf" type="text" onChange={evt => this.setState({imp_tlf: evt.target.value})} required id="tlf"></input>
            </div>
        );
    }

    renderProductList() {
        var i = 0;
            return (
                <div className='products'>
                    <div className='productsList'>
                    <h3>Produkter</h3>
                    <hr></hr>
                    {
                        this.state.products.map((e) => {
                        return <div key={e}>
                        <h3><b>{(++i)}. vin:</b></h3>
                        {this.renderSingleProduct(i)}                     
                        </div>;
                    })}
                    </div>
                    <div>
                        <button className='newProductBtn' onClick={this.addProduct}>
                            <span> Legg til et produkt </span>
                        </button>
                    </div>
                    <div>
                        <button className='submitBtn' type="submit" name="send">
                           <span> {this.state.submitTxt} </span>
                        </button>
                    </div>
                </div>
            );
    }
        
    renderSingleProduct(num) {
        return (
            <div id={'div'+num}>
                <p><i> bare varenummer-feltet er obligatorisk </i></p>
                <label htmlFor="varenummerVin"> Varenummer Vinmonopolet: 
                    <span className="req"> * </span> 
                </label>
                <br></br>
                <input name="varenummerVin" type="text" required id={"varenummerVin"+num} value={this.state["varenummerVin"+num] || ''} 
                onChange={(e) => { this.setState({[e.target.id]: e.target.value}); console.log(e.target.id)}} ></input>
                <br></br>
                <div id="popupBtn">
                <button className="searchBtn" type="button" 
                                onClick={() => {this.getData(num)}} name="søk etter vin"> 
                                 <span>Søk etter vin</span> 
                            </button>
                </div>
                <div className="vin" id="divVinInfo" style={{display: this.state["displayVin"+num]}}>
                <label htmlFor="produsentVin"> Produsent: <span className="req">  </span> </label>
                <br></br>
                <input name="produsentVin" type="text" id={"produsentVin"+num} value={this.state["produsentVin"+num] || ''}
                onChange={e => this.setState({[e.target.id]: e.target.value})}>
                </input>
                <br></br>
                <label htmlFor="hjemmesideVin"> Produsents hjemmeside: </label> 
                <br></br>
                <input name="hjemmesideVin" type="text" id={"hjemmesideVin"+num} value={this.state["hjemmesideVin"+num] || ''}
                onChange={e => this.setState({[e.target.id]: e.target.value})}>
                </input>
                <br></br>
                <label htmlFor="omradeVin"> Område og land: <span className="req">  </span> </label> 
                <br></br>
                <input name="omradeVin" type="text" id={"omradeVin"+num} value={this.state["omradeVin"+num] || ''}
                onChange={e => this.setState({[e.target.id]: e.target.value})}>
                </input>
                <br></br>
                <label htmlFor="drueVin"> Drue- og drueblanding:
                    <span className="req">  </span> 
                </label> 
                <br></br>
                <input name="drueVin" type="text" id={"drueVin"+num} value={this.state["drueVin"+num] || ''}
                onChange={e => this.setState({[e.target.id]: e.target.value})}>
                </input>
                <br></br>
                <label htmlFor="navnVin"> Vinens navn: <span className="req">  </span> </label> 
                <br></br>
                <input name="navnVin" type="text" id={"navnVin"+num} value={this.state["navnVin"+num] || ''}
                onChange={e => this.setState({[e.target.id]: e.target.value})}>
                </input>
                <br></br>
                <label htmlFor="argangVin"> Årgang: <span className="req">  </span> </label> 
                <br></br>
                <input name="argang" type="text" id={"argangVin"+num} value={this.state["argangVin"+num] || ''}
                onChange={e => this.setState({[e.target.id]: e.target.value})}>
                </input>
                <br></br>
                <label htmlFor="prisVin"> Pris Vinmonopolet: </label> 
                <br></br>
                <input name="prisVin" type="text" id={"prisVin"+num} value={this.state["prisVin"+num] || ''}
                onChange={e => this.setState({[e.target.id]: e.target.value})}>
                </input>
                <br></br>
                <label htmlFor="linkVin"> Link til Vinmonopolets side for vinen: </label> 
                <br></br>
                <input name="linkVin" type="text" id={"linkVin"+num} value={this.state["linkVin"+num] || ''}
                onChange={e => this.setState({[e.target.id]: e.target.value})}>
                </input>
                <br></br>
            </div>                <hr></hr>
            </div>
        );   
    }

   /**
     * Adds a new Product object.
     * It is added to the tail of the relevant array
     * & is given the property 'num' with the length of said array.
     */
    addProduct() {
        console.log("Legger til nytt produkt...");
        this.setState({
            numProducts: (this.state.numProducts+1),
            products: [...this.state.products, this.state.numProducts],

        });
        console.log(this.state.numProducts);
    }

           /**
     * called when the "search"-button is pressed.
     * If necessary, re-renders the object with {display:block}.
     * @param isVisible: is True if neither the "search" or "manual"
     *      buttons has been pressed yet
     */
    getData(refNum) {
        let prodNum = (this.state["varenummerVin"+refNum]);
        console.log(prodNum);
        this.searchForProductInfo(prodNum, refNum);
    }

    /**
     * Initiates an asynchronous api request to "/api/vp".
     * "/api/vp" is used to fetch product information from Vinmonopolet.
     * 
     * Once finished, either alert user of an error or use the
     * data fetched to populate the relevant input fields.
     */
    searchForProductInfo(prodNum, refNum) {
        //const product = this.state.productNumber;
        console.log("Søker opp produkt " + prodNum);
        fetch("/api/vp?product="+prodNum)
        .then((res) =>  res.json())
        .then(data => { 
            //console.log(data);
            if (data.error != "false" || data.data == "")
            alert(`Fant ikke produktinformasjon.\n${data.error}`);
            else {
                const vin = data.data;
                var druer = "";
                for (let i = 0; i < (vin.ingredients.grapes).length; i++)
                {
                    druer += `${vin.ingredients.grapes[i].grapeDesc} ${vin.ingredients.grapes[i].grapePct}%, `
                }
                druer = druer.slice(0, druer.length-2); //End trailing chars
                console.log("ID: "+refNum);
                this.setState({
                    ["productIdVin"+refNum]: vin.basic.productId,
                    ["produsentVin"+refNum]: vin.logistics.manufacturerName,
                    ["omradeVin"+refNum]: `${vin.origins.origin.country}, ${vin.origins.origin.region}`,
                    ["drueVin"+refNum]: druer,
                    ["navnVin"+refNum]: vin.basic.productLongName,
                    ["argangVin"+refNum]: vin.basic.vintage,
                    ["prisVin"+refNum]: vin.prices[0].salesPrice,
                    ["linkVin"+refNum]: `www.vinmonopolet.no/p/${vin.basic.productId}`
                });
                console.log(this.state["prisVin"+refNum]);
            }
        });
    }

    sendProductData(data) {
        console.log("Sender produktdata til server...");
        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        }
        this.awaitPostResponse()
        fetch("/api/google", options)
        .then((res) => res.json())
        .then(data => {
            this.getPostResponse(data);
            //console.log(data)
        })
    }

    awaitPostResponse() {
        const btn = document.getElementsByClassName('submitBtn');
        btn.innerHTML = '<span> Sender skjema avgårde... </span>'
        this.setState({
            submitTxt: 'Sender skjema avgårde...',
        })
    }

    getPostResponse(data) {
        this.setState({
            submitTxt: 'Ferdig!'
         })
         if (data.error) {
             alert(`Noe gikk galt under registrering av produkter.
             Vennligst prøv igjen senere eller ta kontakt via truls.aasterud@aasterud.net.`)
         }
        alert(`Suksess! \n${data.response.updates.updatedRows} viner registrert!`)
    }

    /**
     * Generic function that updates stat values.
     * @param key: the state key
     * @param val: the new value
     * 
     */
    inputChanged(key, val) {
        console.log(key + ": " + val);
        this.setState({
            [key]: val
        });
    }

    /**
     * Triggered when form is submitted.
     * formats the product data
     * After that, calls the function that starts the API request
     * 
     * @param evt: the triggering event, needed to stop site from refreshing
     *
     */
    
    handleSubmit(evt) {
        evt.preventDefault();
        var sdu = [];
        const importerInfo = [
            this.state.imp_name,
            this.state.imp_kontakt,
            this.state.imp_mail,
            this.state.imp_tlf
        ];
        sdu.push(importerInfo);
        for (let i = 1; i <= this.state.numProducts; i++)
        {
            let productData = [ 
                this.state["varenummerVin"+i],
                this.state["produsentVin"+i],
                this.state["hjemmesideVin"+i],
                this.state["omradeVin"+i],
                this.state["drueVin"+i],
                this.state["navnVin"+i],
                this.state["argangVin"+i],
                this.state["prisVin"+i],
                this.state["linkVin"+i]
            ];
            sdu.push(productData);
        }

        const sduJson = JSON.stringify(sdu); 
        console.log(sduJson);
        this.sendProductData(sdu);
    }


}


ReactDOM.render(
<FormRoot />,
document.getElementById('root')
);
