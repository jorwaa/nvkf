import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class FormRoot extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            numProducts: 1,
            importer: <ImporterInfo  />,
            products: <ProductList />
        };
    }
    render() {
        return (
        <div className='form'>
            <div className='info'>
                <h1>Registreringsskjema for vinsmaking</h1>
                <hr></hr>
                <p><b>Merk: </b> Denne nettsiden støttes ikke av Internet Explorer.</p>
                <p>Ved bruk av denne nettleseren, fyll heller inn skjemaet du
                    <a href="https://docs.google.com/forms/d/e/1FAIpQLSccVTMiwCyowU5nPCGWjisLBgpgnaf43VoEg7ULE4FUMOXGJQ/viewform?vc=0&c=0&w=1"> finner her. </a>
                </p>
                <p> Skriv inn info om {this.props.testProp}!</p>
                </div>
            {this.state.importer}
            {this.state.products}
        </div>
        );
    }
}

class ImporterInfo extends React.Component {
    render() {
        return (
            <div id="importerInfo">
                <label htmlFor="navn">Importør: *</label>
                <br></br>
                <input id="navn" name="navn" type="text" required></input>
                <br></br>
                <label htmlFor="kontakt">Kontaktperson hos importør, navn: <span className="req"> * </span> </label>
                <br></br>
                <input name="kontakt" type="text" required id="kontakt"></input>
                <br></br>
                <label htmlFor="epost">E-post til kontaktperson: <span className="req"> * </span> </label>
                <br></br>
                <input name="epost" type="email" required id="epost"></input>
                <br></br>
                <label htmlFor="tlf">Telefonnummer til kontaktperson: <span className="req"> * </span> </label>
                <br></br>
                <input name="tlf" type="text" required id="tlf"></input>
            </div>
        );
    }
}

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
        return (
            <div className='products'>
                <div className='productsList'>
                <h3>Produkter</h3>
                <hr></hr>
                {this.state.products.map((e) => {
                    return <div key={e.props.num}> {e} </div>;
                })}
                </div>
                <div className='newProductBtn'>
                    <button onClick={this.addProduct}>
                        Legg til et produkt
                    </button>
                </div>
            </div>
        );
    }

    renderProducts() {
        // IF total > cur:
        //const cur = this.state.productsRendered;
        const cur = this.state.products.length;
        const total = this.state.numProducts;
        console.log("cur: " + cur + ", tot: " + total)
        for (var n = cur; n < total; n++) {
            console.log("render " + (n)); 
            this.setState({
                products: [...this.state.products, <Product num={n}/>],
            });
        }
    }
/**
 * 
 * @returns the current value of numProducts
 */
    getNumProducts() {
        return this.state.numProducts;
    }
    /**
     * 
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

    addProduct() {
        console.log("Legger til nytt produkt...");
        this.setState({
            numProducts: (this.state.numProducts + 1),
            products: [...this.state.products, <Product num={this.state.numProducts}/>],

        });
    }
}

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
                <h3><b>{(this.props.num+1)}. vin:</b></h3>
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
     * 
     * @param {*} e:  
     */
    updateProductNumber(e) {
        this.setState({
            productNumber: e.target.value
        });
        console.log(this.state.productNumber);
    }
    /**
     * 
     */
    getData(isVisiblie) {
        if (!isVisiblie)
        this.addData();

        this.searchForProductInfo();

        //(this.myRef.current).findProdNum(prodNum);
    }
    /**
     * 
     * @param doSearch: is true if API query is done 
     *        on creation of element
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

    searchForProductInfo() {
        const product = this.state.productNumber;
        console.log("Søker opp produkt " + this.state.productNumber);
        fetch("/api?product="+product)
        .then((res) => res.json())
        .then(data => console.log(data));
    }

}

ReactDOM.render(
<FormRoot />,
document.getElementById('root')
);



