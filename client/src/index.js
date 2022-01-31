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
            products: [0]
        };
        this.inputChanged = this.inputChanged.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addProduct = this.addProduct.bind(this);
        this.getData = this.getData.bind(this);
        this.renderProductList = this.renderProductList.bind(this);
        this.renderSingleProduct = this.renderSingleProduct.bind(this);
    }

    componentDidMount() {
        this.setState({
            importer: <ImporterInfo  name={this.inputChanged}/>,
            //products: <ProductList name={this.inputChanged}/>,
        })
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
                    <p> Skriv inn info om {this.props.testProp}!</p>
                    <p>{this.state.imp_name}</p>
                </div>
                {this.state.importer}
                {this.renderProductList()}
            </form>
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
                        {console.log("AAAAA")}
                        {this.renderSingleProduct(i)}                     
                        </div>;
                    })}
                    </div>
                    <div className='newProductBtn'>
                        <button onClick={this.addProduct}>
                            Legg til et produkt
                        </button>
                    </div>
                    <div className='submitBtn'>
                        <button type="submit" name="send">
                            Send inn
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
                <input name="varenummerVin" type="text" required id={"varenummerVin"+num} value={this.state["productNumberVin"+num]} 
                onChange={(e) => { this.setState({[e.target.id]: e.target.value}); console.log(e.target.id)}} ></input>
                <br></br>
                <div id="popupBtn">
                <button className="searchBtn" type="button" 
                                onClick={() => {this.getData(num)}} name="søk etter vin"> 
                                 Søk etter vin 
                            </button>,
                </div>
                <div className="vin" id="divVinInfo" style={{display: this.state["displayVin"+num]}}>
                <label htmlFor="produsentVin"> Produsent: <span className="req">  </span> </label>
                <br></br>
                <input name="produsentVin" type="text" id={"produsentVin"+num} value={this.state["produsentVin"+num]}
                onChange={e => this.setState({[e.target.id]: e.target.value})}>
                </input>
                <br></br>
                <label htmlFor="hjemmesideVin"> Produsents hjemmeside: </label> 
                <br></br>
                <input name="hjemmesideVin" type="text" id={"'hjemmesideVin"+num} value={this.state["hjemmesideVin"+num]}
                onChange={e => this.setState({[e.target.id]: e.target.value})}>
                </input>
                <br></br>
                <label htmlFor="omradeVin"> Område og land: <span className="req">  </span> </label> 
                <br></br>
                <input name="omradeVin" type="text" id={"'omradeVin"+num} value={this.state["omradeVin"+num]}
                onChange={e => this.setState({[e.target.id]: e.target.value})}>
                </input>
                <br></br>
                <label htmlFor="drueVin"> Drue- og drueblanding:
                    <span className="req">  </span> 
                </label> 
                <br></br>
                <input name="drueVin" type="text" id={"'drueVin"+num} value={this.state["druerVin"+num]}
                onChange={e => this.setState({[e.target.id]: e.target.value})}>
                </input>
                <br></br>
                <label htmlFor="navnVin"> Vinens navn: <span className="req">  </span> </label> 
                <br></br>
                <input name="navnVin" type="text" id={"'navnVin"+num} value={this.state["navnVin"+num]}
                onChange={e => this.setState({[e.target.id]: e.target.value})}>
                </input>
                <br></br>
                <label htmlFor="argangVin"> Årgang: <span className="req">  </span> </label> 
                <br></br>
                <input name="argang" type="text" id={"'argangVin"+num} value={this.state["argangVin"+num]}
                onChange={e => this.setState({[e.target.id]: e.target.value})}>
                </input>
                <br></br>
                <label htmlFor="prisVin"> Pris Vinmonopolet: </label> 
                <br></br>
                <input name="prisVin" type="text" id={"'prisVin"+num} value={this.state["prisVin"+num]}
                onChange={e => this.setState({[e.target.id]: e.target.value})}>
                </input>
                <br></br>
                <label htmlFor="linkVin"> Link til Vinmonopolets side for vinen: </label> 
                <br></br>
                <input name="linkVin" type="text" id={"'linkVin"+num} value={this.state["produktsideVin"+num]}
                onChange={e => this.setState({produktside: e.target.value})}>
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
            console.log(data);
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
                this.setState({
                    ["productIdVin"+refNum]: vin.basic.productId,
                    ["produsentVin"+refNum]: vin.logistics.manufacturerName,
                    ["omradeVin"+refNum]: `${vin.origins.origin.country}, ${vin.origins.origin.region}`,
                    ["druerVin"+refNum]: druer,
                    ["navnVin"+refNum]: vin.basic.productLongName,
                    ["argangVin"+refNum]: vin.basic.vintage,
                    ["prisVin"+refNum]: vin.prices[0].salesPrice,
                    ["produktsideVin"+refNum]: `www.vinmonopolet.no/p/${vin.basic.productId}`
                });
            }
        });
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
     * formats the relevant data and sends it 
     * in a POST request to the API "/api/google".
     * 
     * What happens then? idk...
     */
    handleSubmit(evt) {
        alert("SUBMITTING FORM");
        
        evt.preventDefault();
    }

}

class ImporterInfo extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div id="importerInfo">
                <label htmlFor="navn">Importør: *</label>
                <br></br>
                <input id="navn" name="navn" type="text" onChange={evt => this.props.name("imp_name", evt.target.value)} required></input>
                <br></br>
                <label htmlFor="kontakt">Kontaktperson hos importør, navn: <span className="req"> * </span> </label>
                <br></br>
                <input name="kontakt" type="text" onChange={evt => this.props.name("imp_kontakt", evt.target.value)} required id="kontakt"></input>
                <br></br>
                <label htmlFor="epost">E-post til kontaktperson: <span className="req"> * </span> </label>
                <br></br>
                <input name="epost" type="email" onChange={evt => this.props.name("imp_mail", evt.target.value)} required id="epost"></input>
                <br></br>
                <label htmlFor="tlf">Telefonnummer til kontaktperson: <span className="req"> * </span> </label>
                <br></br>
                <input name="tlf" type="text" onChange={evt => this.props.name("imp_tlf", evt.target.value)} required id="tlf"></input>
            </div>
        );
    }
}

/**
 * Part of the form containing product data.
 * Unsure if this should be a class of its own,
 * will probably rewrite? :->
 */
class ProductList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            numProducts: 1,
            productsRendered: 1,
            products: [<Product num={0}/>]
        };
        console.log("prods: ", this.state.numProducts); 
        this.addProduct = this.addProduct.bind(this);
    }
    render() {
        var i = 0;
        return (
            <div className='products'>
                <div className='productsList'>
                <h3>Produkter</h3>
                <hr></hr>
                {
                    this.state.products.map((e) => {
                    return <div key={e.props.num}>
                    <h3><b>{(++i)}. vin:</b></h3>
                    {console.log("AAAAA")}
                    {this.renderSingleProduct(i)}                     
                    </div>;
                })}
                </div>
                <div className='newProductBtn'>
                    <button onClick={this.addProduct}>
                        Legg til et produkt
                    </button>
                </div>
                <div className='submitBtn'>
                    <button type="submit" name="send">
                        Send inn
                    </button>
                </div>
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
                    return <div key={e.props.num}>
                    <h3><b>{(++i)}. vin:</b></h3>
                    {console.log("AAAAA")}
                    {this.renderSingleProduct(i)}                     
                    </div>;
                })}
                </div>
                <div className='newProductBtn'>
                    <button onClick={this.addProduct}>
                        Legg til et produkt
                    </button>
                </div>
                <div className='submitBtn'>
                    <button type="submit" name="send">
                        Send inn
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
            <input name="varenummerVin" type="text" required id={"varenummerVin"+num} value={this.state.productNumber} 
            onChange={(e) => { this.setState({[e.target.id]: e.target.value}); console.log(e.target.id)}} ></input>
            <br></br>
            <div id="popupBtn">
                {this.state.searchButton}
                {this.state.manualButton}
            </div>
            <div className="vin" id="divVinInfo" style={{display: this.state.display}}>
            <label htmlFor="produsentVin"> Produsent: <span className="req">  </span> </label>
            <br></br>
            <input name="produsentVin" type="text" id={"produsentVin"+num} value={this.state.produsent}
            onChange={e => this.setState({[e.target.id]: e.target.value})}>
            </input>
            <br></br>
            <label htmlFor="hjemmesideVin"> Produsents hjemmeside: </label> 
            <br></br>
            <input name="hjemmesideVin" type="text" id={"'hjemmesideVin"+num} value={this.state.hjemmeside}
            onChange={e => this.setState({[e.target.id]: e.target.value})}>
            </input>
            <br></br>
            <label htmlFor="omradeVin"> Område og land: <span className="req">  </span> </label> 
            <br></br>
            <input name="omradeVin" type="text" id={"'omradeVin"+num} value={this.state.omrade}
            onChange={e => this.setState({[e.target.id]: e.target.value})}>
            </input>
            <br></br>
            <label htmlFor="drueVin"> Drue- og drueblanding:
                <span className="req">  </span> 
            </label> 
            <br></br>
            <input name="drueVin" type="text" id={"'drueVin"+num} value={this.state.druer}
            onChange={e => this.setState({[e.target.id]: e.target.value})}>
            </input>
            <br></br>
            <label htmlFor="navnVin"> Vinens navn: <span className="req">  </span> </label> 
            <br></br>
            <input name="navnVin" type="text" id={"'navnVin"+num} value={this.state.navn}
            onChange={e => this.setState({[e.target.id]: e.target.value})}>
            </input>
            <br></br>
            <label htmlFor="argangVin"> Årgang: <span className="req">  </span> </label> 
            <br></br>
            <input name="argang" type="text" id={"'argangVin"+num} value={this.state.argang}
            onChange={e => this.setState({[e.target.id]: e.target.value})}>
            </input>
            <br></br>
            <label htmlFor="prisVin"> Pris Vinmonopolet: </label> 
            <br></br>
            <input name="prisVin" type="text" id={"'prisVin"+num} value={this.state.pris}
            onChange={e => this.setState({[e.target.id]: e.target.value})}>
            </input>
            <br></br>
            <label htmlFor="linkVin"> Link til Vinmonopolets side for vinen: </label> 
            <br></br>
            <input name="linkVin" type="text" id={"'linkVin"+num} value={this.state.produktside}
            onChange={e => this.setState({produktside: e.target.value})}>
            </input>
            <br></br>
        </div>                <hr></hr>
        </div>
    );   
}




/**
 * 
 * @returns the current value of numProducts
 */
    getNumProducts() {
        return this.state.numProducts;
    }
    /**
     * soon(tm)
     * @param {int} n: value to add to numProducts.
     *             Can be both positive & negative. 
     * @returns the new value of numProducts.
     */
    changeNumProducts(n) {
        this.setState({
            numProducts: (this.state.numProducts + n)
        });
        console.log(this.state.numProducts)
        return this.state.numProducts;
    }

    /**
     * Adds a new Product object.
     * It is added to the tail of the relevant array
     * & is given the property 'num' with the length of said array.
     */
    addProduct() {
        console.log("Legger til nytt produkt...");
        this.setState({
            numProducts: (this.state.numProducts + 1),
            products: [...this.state.products, <Product num={this.state.numProducts}/>],

        });
    }

}
/**
 * Represents the data related to a single product.
 * Can interact with the /api/vp API
 */
class Product extends React.Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.state = {
            data: null,
            display: "none",
            productNumber: "",
            produsent: "produsento",
            hjemmeside: "",
            omrade: "",
            druer: "",
            navn: "",
            argang: "",
            pris: "",
            produktside: "",

            searchButton:  <button className="searchBtn" type="button" 
                                onClick={() => {this.state.display = "block"; this.getData()}} name="søk etter vin"> 
                                 Søk etter vin 
                            </button>,
            
            manualButton: <button className="manualBtn" type="button"
                                onClick={() => {this.state.display = "block"; this.addData(false) }} name="avbryt">
                                Manuell innføring
                            </button> 
        }

        this.getData = this.getData.bind(this);
        this.addData = this.addData.bind(this);
        this.updateProductNumber = this.updateProductNumber.bind(this);
        this.searchForProductInfo = this.searchForProductInfo.bind(this);



    }

    render() {
        return (
            <div id={'div'+this.props.num}>
                <p><i> bare varenummer-feltet er obligatorisk </i></p>
                <label htmlFor="varenummerVin"> Varenummer Vinmonopolet: 
                    <span className="req"> * </span> 
                </label>
                <br></br>
                <input name="varenummerVin" type="text" required id="varenummerVin" value={this.state.productNumber} 
                onChange={e => this.setState({productNumber: e.target.value})} ></input>
                <br></br>
                <div id="popupBtn">
                    {this.state.searchButton}
                    {this.state.manualButton}
                </div>
                <div className="vin" id="divVinInfo" style={{display: this.state.display}}>
                <label htmlFor="produsentVin"> Produsent: <span className="req">  </span> </label>
                <br></br>
                <input name="produsentVin" type="text" id="produsentVin" value={this.state.produsent}
                onChange={e => this.setState({produsent: e.target.value})}>
                </input>
                <br></br>
                <label htmlFor="hjemmesideVin"> Produsents hjemmeside: </label> 
                <br></br>
                <input name="hjemmesideVin" type="text" id="hjemmesideVin" value={this.state.hjemmeside}
                onChange={e => this.setState({hjemmeside: e.target.value})}>
                </input>
                <br></br>
                <label htmlFor="omradeVin"> Område og land: <span className="req">  </span> </label> 
                <br></br>
                <input name="omradeVin" type="text" id="omradeVin" value={this.state.omrade}
                onChange={e => this.setState({omrade: e.target.value})}>
                </input>
                <br></br>
                <label htmlFor="drueVin"> Drue- og drueblanding:
                    <span className="req">  </span> 
                </label> 
                <br></br>
                <input name="drueVin" type="text" id="drueVin" value={this.state.druer}
                onChange={e => this.setState({druer: e.target.value})}>
                </input>
                <br></br>
                <label htmlFor="navnVin"> Vinens navn: <span className="req">  </span> </label> 
                <br></br>
                <input name="navnVin" type="text" id="navnVin" value={this.state.navn}
                onChange={e => this.setState({navn: e.target.value})}>
                </input>
                <br></br>
                <label htmlFor="argangVin"> Årgang: <span className="req">  </span> </label> 
                <br></br>
                <input name="argang" type="text" id="argangVin" value={this.state.argang}
                onChange={e => this.setState({argang: e.target.value})}>
                </input>
                <br></br>
                <label htmlFor="prisVin"> Pris Vinmonopolet: </label> 
                <br></br>
                <input name="prisVin" type="text" id="prisVin" value={this.state.pris}
                onChange={e => this.setState({pris: e.target.value})}>
                </input>
                <br></br>
                <label htmlFor="linkVin"> Link til Vinmonopolets side for vinen: </label> 
                <br></br>
                <input name="linkVin" type="text" id="linkVin" value={this.state.produktside}
                onChange={e => this.setState({produktside: e.target.value})}>
                </input>
                <br></br>
            </div>                <hr></hr>
            </div>
        );
    }

    /**
     * DEPRECATED(?) - DELETE LATER
     * @param {*} e:  
     */
    updateProductNumber(e) {
        this.setState({
            productNumber: e.target.value
        });
        console.log(this.state.productNumber);
    }
    /**
     * called when the "search"-button is pressed.
     * If necessary, re-renders the object with {display:block}.
     * @param isVisible: is True if neither the "search" or "manual"
     *      buttons has been pressed yet
     */
    getData(isVisiblie) {
        if (!isVisiblie)
        this.addData();

        this.searchForProductInfo();
    }
    /**
     * addData re-renders the object with {display:inline} 
     * & removes the manualBtn button.
     * addData is called the first time a button of this object is pressed 
     */
    addData() {
        this.setState({
            manualButton: <button className="manualBtn" type="button" style={{display: "none"}} name="avbryt">
                    Manuell innføring
                </button>,

            searchButton: <button className="searchBtn" type="button" 
                            onClick={() => this.searchForProductInfo()} name="søk etter vin"> 
                            Søk etter vin 
                         </button>
        })
    }

    /**
     * Initiates an asynchronous api request to "/api/vp".
     * "/api/vp" is used to fetch product information from Vinmonopolet.
     * 
     * Once finished, either alert user of an error or use the
     * data fetched to populate the relevant input fields.
     */
    searchForProductInfo() {
        const product = this.state.productNumber;
        console.log("Søker opp produkt " + this.state.productNumber);
        fetch("/api/vp?product="+product)
        .then((res) =>  res.json())
        .then(data => { 
            console.log(data);
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
                this.setState({
                    productId: vin.basic.productId,
                    produsent: vin.logistics.manufacturerName,
                    omrade: `${vin.origins.origin.country}, ${vin.origins.origin.region}`,
                    druer: druer,
                    navn: vin.basic.productLongName,
                    argang: vin.basic.vintage,
                    pris: vin.prices[0].salesPrice,
                    produktside: `www.vinmonopolet.no/p/${vin.basic.productId}`
                });
            }
        });
    }

}

ReactDOM.render(
<FormRoot />,
document.getElementById('root')
);
