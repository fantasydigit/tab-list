const React = require("react");
const ReactDOM = require("react-dom");
const { TabList } = require("@adobe/xd-plugin-toolkit-react");
const style = require("./styles.css");
const fs = require('uxp').storage.localFileSystem
const application = require('application')
const clipboard = require('clipboard')

// const { useAlert } = require("react-alert");


// let PopupForm = require("./popup.jsx");
// let popupDialog;
// function getPopupDialog() {
//     console.log("popupdialog called!!!");
//     if (popupDialog == null) {
//         console.log("popupdialog null!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
//         popupDialog = document.createElement("dialog");
//         ReactDOM.render(<PopupForm popupDialog={popupDialog} />, popupDialog);
//     }
//     return popupDialog
// }

module.exports = class MainForm extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            selected: props.selected || 0, 
            type: "",
            error: null,
            isLoaded: false,
            illuJsonData: [],
            alert: "sdfsdfsdfsdfsdfsdf"
          };
        this.onInputChange = (e) => {
            this.setState({ name: e.target.value })
        }
        this.onDoneClick = (e) => {
            this.props.dialog.close();
        }
    }

    
    componentDidMount() {
        console.log("componetDidMout.....>>>>>>>>>>>>>>>>>>")
        fetch("http://178.20.43.186/PeterDesign/data.json")
            .then(response => response.json())
            .then((jsonData) => {
                // jsonData is parsed json object received from url
                this.setState({
                    isLoaded: true,
                    illuJsonData: jsonData
                });
            })
            .catch((error) => {
                // handle your errors here
                this.setState({
                    isLoaded: true,
                    error:error
                })
                console.error(error)
            })
           
    }

    render() {
        
        let index = this.state.selected
        if (this.state.error){
            return <div>Error: {this.state.error.message}</div>;
        }else if(!this.state.isLoaded){
            return <div>Loading...</div>;
        }else{
            return (
                
                    <form id="main-form" style={{ width: 802, height:400 }}>
                        <h1 style={{marginLeft: 6}}>
                            illustrations Puzzle by Haiyao Su
                        </h1>
                        <button style={{marginLeft:700, maxWidth:100}} id="closeButton"  uxp-variant="cta" type="submit">Done</button>
                        <p style={{ marginTop:-20, marginLeft:6 }}>select the illustration you like and click done, after back to your artboard <br/>use the keyboard "control + V" to paste the selected illustration into your artboard</p>
                        <div style={{ marginTop:20 }}>
                            <TabList
                                quiet={this.state.type.includes("quiet")}
                                small={this.state.type.includes("small")}
                                tabs={{
                                    "1": { label: "StartUp Kit", view: CategoryTabContent.bind(null, this.state.illuJsonData, 0) },
                                    "2": { label: "Helena Kit",  view: CategoryTabContent.bind(null, this.state.illuJsonData, 1) },
                                    "3": { label: "Webframe",    view: CategoryTabContent.bind(null, this.state.illuJsonData, 2) },
                                    "4": { label: "Youka Kit",   view: CategoryTabContent.bind(null, this.state.illuJsonData, 3) },
                                    "5": { label: "Daily Kit",   view: CategoryTabContent.bind(null, this.state.illuJsonData, 4) },
                                    "6": { label: "2.5D Kit",    view: CategoryTabContent.bind(null, this.state.illuJsonData, 5) },
                                    // "4": { label: "Section Disabled", disabled: true }
                                }}
                            />
                        </div>
                        <footer>
                            {/* <button id="closeButton" type="submit" uxp-variant="cta" onClick={this.onDoneClick}>Done</button> */}
                            
                            {/* <button id="closeButton"  uxp-variant="cta" type="submit">Done</button> */}
                            {/* <button
                                onClick={() => {
                                    const alert = useAlert();
                                    alert.show("Oh look, an alert!");
                                }}
                                ></button> */}
                        </footer>


                    </form>
                    
                
            );
        }
        
    }

}

async function copySvgCode(text) {
    clipboard.copyText(text);
//    await document.body.appendChild(getPopupDialog()).showModal();
    //ShowAlert();   
 }
 
 function ShowAlert(){
    console.log("SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSsssshohwwwwwwwwwwwwwwwwww");
    // const alert = useAlert();
    // alert.show("illustration copied to clipboard~");
    this.state.alert = "Copied to Clipboard";
 }
 
 function clickMe(e){
     var path = e.currentTarget.getAttribute('data-illustration-path');
     console.log(path);    
     try {
         var request = new XMLHttpRequest();
         request.open("GET", path);
         request.setRequestHeader("Content-Type", "image/svg+xml");
         request.addEventListener("load", function(event) {
             var response = event.target.responseText;
             copySvgCode(response);
             //copyToClipboard(response);
             
         });
         request.send();    
     } catch (error) {
         console.log(error);    
     }
     
 }

function SampleTabContent() {
    
    return <div className="category-view">
        <ul className="flex-container wrap">
            <li className="flex-image-item" id="image-item1" data-illustration-path="http://178.20.43.186/PeterDesign/StartUpKit/Group%2045.svg"  onClick={(e) => {clickMe(e)}}>
                <img src="http://178.20.43.186/peterDesign/StartUpKit/Group%2045.svg" alt="Cinque Terre" width="125" height="160"/>
            </li>
            <li className="flex-image-item" id="image-item1" data-illustration-path="http://178.20.43.186/peterDesign/StartUpKit/Group%2045.svg"  onClick={(e) => {clickMe(e)}}>
                <img src="http://178.20.43.186/peterDesign/StartUpKit/Group%2045.svg" alt="Cinque Terre" width="125" height="160"/>
            </li>
            <li className="flex-image-item" id="image-item1" data-illustration-path="../images/Group 129.svg"  onClick={(e) => {clickMe(e)}}>
                <img src="../images/Group 129.svg" alt="Cinque Terre" width="125" height="160"/>
            </li>
            <li className="flex-image-item" id="image-item1" data-illustration-path="../images/Group 164.svg"  onClick={(e) => {clickMe(e)}}>
                <img src="../images/Group 164.svg" alt="Cinque Terre" width="125" height="160"/>
            </li>
            <li className="flex-image-item" id="image-item1" data-illustration-path="../images/Group 204.svg"  onClick={(e) => {clickMe(e)}}>
                <img src="../images/Group 204.svg" alt="Cinque Terre" width="125" height="160"/>
            </li>
            <li className="flex-image-item" id="image-item1" data-illustration-path="../images/Group 290.svg"  onClick={(e) => {clickMe(e)}}>
                <img src="../images/Group 290.svg" alt="Cinque Terre" width="125" height="160"/>
            </li>
            <li className="flex-image-item" id="image-item1" data-illustration-path="../images/Group 129.svg"  onClick={(e) => {clickMe(e)}}>
                <img src="../images/Group 129.svg" alt="Cinque Terre" width="125" height="160"/>
            </li>
            <li className="flex-image-item" id="image-item1" data-illustration-path="../images/Group 326.svg"  onClick={(e) => {clickMe(e)}}>
                <img src="../images/Group 326.svg" alt="Cinque Terre" width="125" height="160"/>
            </li>
            <li className="flex-image-item" id="image-item1" data-illustration-path="../images/Group 363.svg"  onClick={(e) => {clickMe(e)}}>
                <img src="../images/Group 363.svg" alt="Cinque Terre" width="125" height="160"/>
            </li>
            <li className="flex-image-item" id="image-item1" data-illustration-path="../images/Group 398.svg"  onClick={(e) => {clickMe(e)}}>
                <img src="../images/Group 398.svg" alt="Cinque Terre" width="125" height="160"/>
            </li>
            <li className="flex-image-item" id="image-item1" data-illustration-path="../images/Group 439.svg"  onClick={(e) => {clickMe(e)}}>
                <img src="../images/Group 439.svg" alt="Cinque Terre" width="125" height="160"/>
            </li>
            <li className="flex-image-item" id="image-item1" data-illustration-path="../images/Group 455.svg"  onClick={(e) => {clickMe(e)}}>
                <img src="../images/Group 455.svg" alt="Cinque Terre" width="125" height="160"/>
            </li>
            <li className="flex-image-item" id="image-item1" data-illustration-path="../images/Group 491.svg"  onClick={(e) => {clickMe(e)}}>
                <img src="../images/Group 491.svg" alt="Cinque Terre" width="125" height="160"/>
            </li>
            <li className="flex-image-item" id="image-item1" data-illustration-path="../images/Group 537.svg"  onClick={(e) => {clickMe(e)}}>
                <img src="../images/Group 537.svg" alt="Cinque Terre" width="125" height="160"/>
            </li>
            <li className="flex-image-item" id="image-item1" data-illustration-path="../images/Group 612.svg"  onClick={(e) => {clickMe(e)}}>
                <img src="../images/Group 612.svg" alt="Cinque Terre" width="125" height="160"/>
            </li>
            <li className="flex-image-item" id="image-item1" data-illustration-path="../images/Group 613.svg"  onClick={(e) => {clickMe(e)}}>
                <img src="../images/Group 613.svg" alt="Cinque Terre" width="125" height="160"/>
            </li>
            <li className="flex-image-item" id="image-item1" data-illustration-path="../images/Group 620.svg"  onClick={(e) => {clickMe(e)}}>
                <img src="../images/Group 620.svg" alt="Cinque Terre" width="125" height="160"/>
            </li>
            <li className="flex-image-item" id="image-item1" data-illustration-path="../images/Group 622.svg"  onClick={(e) => {clickMe(e)}}>
                <img src="../images/Group 622.svg" alt="Cinque Terre" width="125" height="160"/>
            </li>
            <li className="flex-image-item" id="image-item1" data-illustration-path="../images/Group 625.svg"  onClick={(e) => {clickMe(e)}}>
                <img src="../images/Group 625.svg" alt="Cinque Terre" width="125" height="160"/>
            </li>
            <li className="flex-image-item" id="image-item1" data-illustration-path="../images/Group 634.svg"  onClick={(e) => {clickMe(e)}}>
                <img src="../images/Group 634.svg" alt="Cinque Terre" width="125" height="160"/>
            </li>
            <li className="flex-image-item" id="image-item1" data-illustration-path="../images/Group 635.svg"  onClick={(e) => {clickMe(e)}}>
                <img src="../images/Group 635.svg" alt="Cinque Terre" width="125" height="160"/>
            </li>
            
        </ul>  
          
    </div>
    
}


function CategoryTabContent(jsonDat, index) {
    
    var category_dat = jsonDat.category_data[index]
    var illustrations = category_dat.illustrations
    console.log("--------------------------------;)\n")
    console.log(illustrations)
    
    const Image = ({path, thumbnail}) => (
        <li className="flex-image-item tooltip" data-illustration-path={path}  onClick={(e) => {clickMe(e)}}>
            <span class="tooltiptext"></span>
            <img src={thumbnail} alt="Cinque Terre" width="125" height="160"/>
        </li>
    );
    return <div className="category-view">
        <ul className="flex-container wrap">
            {illustrations.map((object) => (
                <Image
                    path={object.src}
                    thumbnail={object.src}
                />
            ))}
        </ul>  
    </div>
    
}

