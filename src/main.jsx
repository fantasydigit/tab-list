// make sure to import the react plugin toolkit first as it contains compatibility shims
const { TabList } = require("@adobe/xd-plugin-toolkit-react");
const React = require("react");
const ReactDOM = require("react-dom");
const style = require("./styles.css");

const fs = require('uxp').storage.localFileSystem
const application = require('application')
const clipboard = require('clipboard')
const commands = require('commands')


async function copySvgCode(text) {
   clipboard.copyText(text);
}


function clickMe(e){
    var path = e.currentTarget.getAttribute('data-illustration-path');
    
    var request = new XMLHttpRequest();
    request.open("GET", path);
    request.setRequestHeader("Content-Type", "image/svg+xml");
    request.addEventListener("load", function(event) {
        var response = event.target.responseText;
        copySvgCode(response);
        //copyToClipboard(response);

        

    });
    request.send();
}

function SampleTabContent(text) {
    
    return <div className="category-view">
        <ul className="flex-container wrap">
            <li className="flex-image-item" id="image-item1" data-illustration-path="../images/Group 164.svg"  onClick={(e) => {clickMe(e)}}>
                <img src="../images/Group 164.svg" alt="Cinque Terre" width="125" height="160"/>
            </li>
            <li className="flex-image-item" id="image-item1" data-illustration-path="../images/Group 204.svg"  onClick={(e) => {clickMe(e)}}>
                <img src="../images/Group 204.svg" alt="Cinque Terre" width="125" height="160"/>
            </li>
            <li className="flex-image-item" id="image-item1" data-illustration-path="../images/Group 129.svg"  onClick={(e) => {clickMe(e)}}>
                <img src="../images/Group 129.svg" alt="Cinque Terre" width="125" height="160"/>
            </li>
            <li className="flex-image-item" id="image-item1" data-illustration-path="../images/Group 98.svg"  onClick={(e) => {clickMe(e)}}>
                <img src="../images/Group 98.svg" alt="Cinque Terre" width="125" height="160"/>
            </li>
            <li className="flex-image-item" id="image-item1" data-illustration-path="../images/Group 45.svg"  onClick={(e) => {clickMe(e)}}>
                <img src="../images/Group 45.svg" alt="Cinque Terre" width="125" height="160"/>
            </li>
            
           
        </ul>  
          
    </div>
    
}



class HelloForm extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = { selected: props.selected || 0, type: "" };
        this.onInputChange = (e) => {
            this.setState({ name: e.target.value })
        }
        this.onDoneClick = (e) => {
            this.props.dialog.close();
        }
    }

    render() {
        let index = this.state.selected
        return (
            <form id="main-form" style={{ width: 802, height:400 }}>
                <h1>Man illustrations by Peter </h1>
                
                <div style={{ marginTop:20 }}>
                    <TabList
                        quiet={this.state.type.includes("quiet")}
                        small={this.state.type.includes("small")}
                        tabs={{
                            "1": { label: "Category 1", view: SampleTabContent.bind(null, "One Content") },
                            // "2": { label: "Category 2", view: SampleTabContent.bind(null, "Two Content") },
                            // "3": { label: "Category 3", view: SampleTabContent.bind(null, "Three Content") },
                            // "4": { label: "Section Disabled", disabled: true }
                        }}
                    />
                </div>
                <footer>
                    {/* <button id="closeButton" type="submit" uxp-variant="cta" onClick={this.onDoneClick}>Done</button> */}
                    <button id="closeButton"  uxp-variant="cta" >Done</button>
                </footer>
            </form>
        );
    }
}

let dialog;
function getDialog() {
    if (dialog == null) {
        dialog = document.createElement("dialog");
        ReactDOM.render(<HelloForm dialog={dialog} />, dialog);
    }
    return dialog
}


module.exports = {
    commands: {
        menuCommand: function () {
            return new Promise((resolve, reject) => {
                let aDialog = document.body.appendChild(getDialog()); 
                aDialog.showModal();
                let closeButton = document.getElementById("closeButton");
                console.log(closeButton);
                closeButton.onclick = function() {
                    console.log("CCCCCCCCCCClicked~!!!");
                    aDialog.close();
                    resolve();
                  }

            });
            
            
        }

        // menuCommand: async (selection, documentRoot) => {
        //     await getDialog(selection, documentRoot).showModal(); // async await very important
        // }

        //menuCommand: copySvgCode
    }
};


