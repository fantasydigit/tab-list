// make sure to import the react plugin toolkit first as it contains compatibility shims
const { TabList } = require("@adobe/xd-plugin-toolkit-react");
const React = require("react");
const ReactDOM = require("react-dom");
const style = require("./styles.css");

function clickMe(e){
    console.log(e.currentTarget.getAttribute('data-illustration-path'));

}
function SampleTabContent(text) {
    
    return <div className="category-view">
        <ul className="flex-container wrap">
            <li className="flex-image-item" id="image-item1" data-illustration-path="../images/humaaans-sitting-3.png"  onClick={(e) => {clickMe(e)}}>
                <a target="_blank" href="img_5terre.jpg" >
                    <img src="../images/humaaans-sitting-3.png" alt="Cinque Terre" width="125" height="160"/>
                </a>
            </li>
            <li className="flex-image-item">
                <a target="_blank" href="img_5terre.jpg">
                    <img src="../images/humaaans-sitting-3.png" alt="Cinque Terre" width="125" height="160"/>
                </a>
            </li>
            <li className="flex-image-item">
                <a target="_blank" href="img_5terre.jpg">
                    <img src="../images/humaaans-sitting-3.png" alt="Cinque Terre" width="125" height="160"/>
                </a>
            </li>
            <li className="flex-image-item">
                <a target="_blank" href="img_5terre.jpg">
                    <img src="../images/humaaans-sitting-3.png" alt="Cinque Terre" width="125" height="160"/>
                </a>
            </li>
            <li className="flex-image-item">
                <a target="_blank" href="img_5terre.jpg">
                    <img src="../images/humaaans-sitting-3.png" alt="Cinque Terre" width="125" height="160"/>
                </a>
            </li>
            <li className="flex-image-item">
                <a target="_blank" href="img_5terre.jpg">
                    <img src="../images/humaaans-sitting-3.png" alt="Cinque Terre" width="125" height="160"/>
                </a>
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
            console.log('onDonClick!!!!!!!!!');
            this.props.dialog.close();
        }
    }

    render() {
        let index = this.state.selected
        return (
            <form style={{ width: 802, height:400 }}>
                <h1>Man illustrations by Peter </h1>
                
                <div style={{ marginTop:20 }}>
                    <TabList
                        quiet={this.state.type.includes("quiet")}
                        small={this.state.type.includes("small")}
                        tabs={{
                            "1": { label: "Category 1", view: SampleTabContent.bind(null, "One Content") },
                            "2": { label: "Category 2", view: SampleTabContent.bind(null, "Two Content") },
                            "3": { label: "Category 3", view: SampleTabContent.bind(null, "Three Content") },
                            // "4": { label: "Section Disabled", disabled: true }
                        }}
                    />
                </div>
                <footer>
                    <button type="submit" uxp-variant="cta" onClick={this.onDoneClick}>Done</button>
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
            document.body.appendChild(getDialog()).showModal();
        }
    }
};
